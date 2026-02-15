import type { Room } from "./Room.ts";
import type { User } from "./User.ts";

export interface Chanel {
    _id:string
    name:string
    users:User[]
    rooms:Room[]
    isPrivate:boolean
    inviteCode:string
    admin:User
    chanelFoto:string
}