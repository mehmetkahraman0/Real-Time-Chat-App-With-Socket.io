import type { Room } from "./Room"
import type { User } from "./User"

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