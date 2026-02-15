import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { SiGoogleclassroom } from "react-icons/si";
import { BsSend } from "react-icons/bs";
import socket from "../socket/connectSocket";
import { useEffect, useRef, useState } from "react";
import {useLazyGetMessageQuery } from "../redux/api/message";
import type { Message } from "../Model/Message";
import type { Room } from "../Model/Room";
import Loader from "./Loader";
import noMessage from "../assets/undraw_moonlight_ctir.svg"

const MessageArea = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRoom: Room | null = useSelector((state: RootState) => state.selected.selectedRoom);
  const selectedChanel = useSelector((state: RootState) => state.selected.selectedChanel) // api den fetch ederek alın alınabilir
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [getOldMessaga, { isFetching: isLoading }] = useLazyGetMessageQuery() // get istegi atılamıyor
  console.log(isLoading)
  console.log(selectedChanel)
  console.log("seçilen oda",selectedRoom)

  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = (e: any) => {
    e.preventDefault()
    if (message == "") return
    socket.emit("sendMessage", { userId: userInfo!._id, roomId: selectedRoom!._id, message, username: userInfo?.username });
    console.log("mesaj gönderildi")
    setMessage("")
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString); 
    if (isNaN(date.getTime())) return ""; 

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (!selectedRoom?._id) return;
    getOldMessaga(selectedRoom._id).unwrap()
      .then((res) => {
        setMessages(res);
      })
      .catch(e => {
        console.log(e)
        return
      })
    socket.emit("joinRoom", selectedRoom._id);

    const handleNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);

    // Cleanup: aynı event'i yeniden eklememek için => bakılacak
    return () => {
      socket.off("newMessage", handleNewMessage);
      setMessages([])
    };
  }, [selectedRoom]);

  console.log(userInfo)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-[70vh] md:h-[75vh] bg-[#242629] my-5 md:mx-5 rounded-md p-1 ml-15 mt-5  mr-5">
      <header className="flex flex-row items-center justify-between font-semibold text-[#94a1b2] tracking-tight border-b border-amber-50 overflow-hidden w-full ">
        <p className=" px-1 py-2 flex flex-row gap-2 items-center text-[14px] text-[#94a1b2]"><SiGoogleclassroom className="text-[24px]" />{`${selectedRoom ? selectedRoom.name: ""}`}</p>
      </header>
      <div ref={containerRef} className="flex flex-col h-full gap-3 overflow-scroll mb-2 mt-2">
        {isLoading && (<div className="flex w-full h-[100vh] justify-center items-center"> <Loader/> </div>)}
        {!(messages.length || messages.length) && !isLoading && (<div className="flex flex-col justify-center items-center mt-[10%]"><img className="w-50" src={noMessage} alt="" /> <p className="font-semibold text-[22px] tracking-tighter text-[#94a1b2]">İlk Mesajı Sen At</p></div>)}
        {messages.map((message: Message, index) => (
          <div key={index} className={`flex flex-col py-1 px-2 rounded-lg max-w-[70%] min-w-[20%] break-words shadow-md ${userInfo?._id == message.userId ? "ml-auto bg-white text-black rounded-br-none justify-end " : "bg-gray-300 text-gray-800 rounded-bl-none"}`}>
            {userInfo?._id == message.userId ? "" : <p className="text-[14px] font-medium">-{message.username}</p>}
            <p className="text-[14px]">{message.message}</p>
            <p className="text-end font-extralight text-[10px]">{formatTime(message.createdAt)}</p>
          </div>
        ))}
      </div>
      <div className="self-end justify-self-end w-full">
        <form className="w-full flex flex-row relative" action="" onSubmit={sendMessage}>
          <input value={message} type="text" className="border-amber-50 border text-amber-50 outline-0 placeholder:text-amber-50 w-full rounded-sm p-1 text-[14px]" onChange={(e) => setMessage(e.target.value)} placeholder="Mesajını gönder" />
          <button className="!absolute right-2 top-[50%] -translate-y-1/2 !p-0 cursor-pointer text-amber-50" type="submit"><BsSend /></button>
        </form>
      </div>
    </div>
  )
}

export default MessageArea
