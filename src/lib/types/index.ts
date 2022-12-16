export interface UserProps {
    username : string,
    id : string,
    email : string,
    image : string | null,
    socketId : string,
    userId? : string
}

export interface msgProps {
    senderName : string,
    senderImg : string | null,
    senderMsg : string,
    receiverId? : string,
    date : string
}

export interface ClientProps {
    username : string,
    id : string,
    socketId : string,
}