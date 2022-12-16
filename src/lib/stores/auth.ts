import { writable type Writable } from "svelte/store";

export interface UserProps {
    username : string,
    password : string
    email : string,
    image : string, 
    token : string
}

export const isAuthenticated : Writable<boolean> = writable(false)
export const user = writable({} as UserProps)
