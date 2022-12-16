import { invalid, redirect} from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { User } from "$lib/models/index";
import bcrypt from 'bcrypt'

export const actions : Actions = {
    register : async ({request}) => {
        const formData = Object.fromEntries(await request.formData())
        const { username, password, email } = (formData as {username : string, password : string, email : string})

        if(!(username && password && email)) return invalid(401, {msg : "Username, Password & Email are Required..."})

        const duplicate = await User.findOne({where : {username}})
        console.log(duplicate)

        if(duplicate) return invalid(400, {username, msg : "Another user already user this username.."})

        const hashPassword = await bcrypt.hash(password , 10)

        await User.create({username, password : hashPassword, email, userId : crypto.randomUUID()})

        throw redirect(307, "/auth/login")
    }
}