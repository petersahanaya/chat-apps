import type { UserProps } from "$lib/types";
import type { Socket } from "socket.io";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import { writable, type Writable } from "svelte/store";

export const clients : Writable<Array<UserProps>> = writable([])
export const sockets: Writable<Socket<DefaultEventsMap, DefaultEventsMap> | any> = writable([])
export const room : Writable<string> = writable('')