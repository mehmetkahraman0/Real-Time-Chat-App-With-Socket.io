export interface Room {
    _id:string
    name: string
    chanelId: string
    type: "text" | "voice"
}