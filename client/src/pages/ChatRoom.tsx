import { useEffect, useRef, useState } from "react"
import socket from "../socket/connectSocket"

type ChatRoomProps = {
    userName: string
    roomId: string
}

const ChatRoom = ({ userName, roomId }: ChatRoomProps) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<{ sender: string, message: string }[]>([])

    useEffect(() => {
        socket.emit("room", roomId)

        socket.on("messageReturn", (data) => {
            setMessages((prev) => [...prev, { sender: data.userName, message: data.message }])
        })

        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });

    }, [roomId, messages])

    const handleSendMessage = () => {

        if(message == "") return

        const data = {
            room: roomId,
            message,
            userName
        };

        setMessages((prev) => [...prev, { sender: userName, message }])

        socket.emit("message", data)

        setMessage("")
    }
    console.log(messages)

    return (
        <div className="w-100 relative shadow-md p-4 flex flex-col justify-between m-auto rounded-md mt-15">
            <div ref={scrollRef} className="flex flex-col gap-2 h-[60vh] w-full bg-amber-50 rounded-md overflow-scroll scroll-0.1">
                {messages.map((msg, i) => (
                    <p className={`${msg.sender === userName ? "border w-fit bg-green-800 text-white text-[12px] p-1 rounded-lg rounded-br-none self-end m-1" : "border w-fit bg-gray-800 text-white text-[12px] p-1 rounded-lg rounded-bl-none m-1"}`} key={i}>{msg.message}</p>
                ))}
            </div>

            <div className="w-full flex flex-row justify-between mt-7 h-10">
                <input placeholder="Enter message ..." value={message} onChange={(e) => setMessage(e.target.value)} className="border w-full mr-1 placeholder:text-[12px] px-1 h-fit rounded-md" type="text" />
                <button className="bg-green-500 hover:bg-green-600 text-xs text-white rounded-md px-1 py-1 h-fit" onClick={handleSendMessage}>Gönder</button>
            </div>
        </div>
    )
}

export default ChatRoom
