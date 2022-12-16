import JWT from 'jsonwebtoken'
import { ACCESS_TOKEN } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

export const JWTCheck = (cookies : any) => {
    const token = cookies.get('token') || ""

    if(!token) throw redirect(307, '/auth/register')

    let user : any ;

    JWT.verify(token , ACCESS_TOKEN, (err : any, decoded : any) => {
        if(err) throw redirect(301, '/auth/register')

        if(decoded) return user = decoded
    })
    if(user) throw redirect(307, '/')
}