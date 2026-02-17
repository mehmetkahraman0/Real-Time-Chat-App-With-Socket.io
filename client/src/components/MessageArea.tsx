import { useSelector, useDispatch } from "react-redux" // useDispatch eklendi
import type { AppDispatch, RootState } from "../redux/store"
import { SiGoogleclassroom } from "react-icons/si";
import { BsSend } from "react-icons/bs";
import socket from "../socket/connectSocket";
import { useEffect, useRef, useState } from "react";
import { useLazyGetMessageQuery } from "../redux/api/message";
import type { Message } from "../Model/Message";
import type { Room } from "../Model/Room";
import { setSelectedRoom } from "../redux/app/selectedSlice"; // Action import edildi
import Loader from "./Loader";
import noMessage from "../assets/undraw_moonlight_ctir.svg"

const MessageArea = () => {
  const dispatch = useDispatch<AppDispatch>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedRoom: Room | null = useSelector((state: RootState) => state.selected.selectedRoom);
  const selectedChanel = useSelector((state: RootState) => state.selected.selectedChanel);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [getOldMessaga, { isFetching: isLoading }] = useLazyGetMessageQuery();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // --- KRİTİK EKLEME: KANAL VE ODA UYUMSUZLUĞUNU DENETLEYEN BEKÇİ ---
useEffect(() => {
    if (selectedChanel && selectedRoom) {
      // includes yerine some kullanarak ID karşılaştırması yapıyoruz
      const isRoomInChanel = selectedChanel.rooms.some((room: any) => 
        (typeof room === 'string' ? room : room._id) === selectedRoom._id
      );
      
      if (!isRoomInChanel) {
        dispatch(setSelectedRoom(null));
        setMessages([]);
      }
    }
  }, [selectedChanel, selectedRoom, dispatch]);
  // -------------------------------------------------------------

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message.trim() === "" || !selectedRoom) return;
    
    socket.emit("sendMessage", { 
      userId: userInfo!._id, 
      roomId: selectedRoom!._id, 
      message, 
      username: userInfo?.username 
    });
    setMessage("");
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString); 
    if (isNaN(date.getTime())) return ""; 
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    // Oda yoksa mesajları temizle ve dinleyiciyi kapat
    if (!selectedRoom?._id) {
      setMessages([]);
      return;
    }

    getOldMessaga(selectedRoom._id).unwrap()
      .then((res) => {
        setMessages(res);
      })
      .catch(e => console.log(e));

    socket.emit("joinRoom", selectedRoom._id);

    const handleNewMessage = (message: Message) => {
      // Sadece şu an açık olan odaya ait mesajları ekrana bas (Güvenlik önlemi)
      if (message.roomId === selectedRoom._id) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.emit("leaveRoom", selectedRoom._id); // Odadan ayrılma eventi (Backend'de varsa)
    };
  }, [selectedRoom, getOldMessaga]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // EĞER ODA SEÇİLİ DEĞİLSE BOŞ EKRAN GÖSTER (Eski verinin kalmasını engeller)
  if (!selectedRoom) {
    return (
      <div className="flex flex-col w-full h-[70vh] md:h-[75vh] bg-[#242629] my-5 md:mx-5 rounded-md p-1 ml-15 mt-5 mr-5 items-center justify-center">
        <img className="w-40 opacity-50" src={noMessage} alt="no-selection" />
        <p className="text-[#94a1b2] font-medium mt-4">Mesajlaşmak için bir oda seçin</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-[70vh] md:h-[75vh] bg-[#242629] my-5 md:mx-5 rounded-md p-1 ml-15 mt-5 mr-5">
      <header className="flex flex-row items-center justify-between font-semibold text-[#94a1b2] tracking-tight border-b border-amber-50 overflow-hidden w-full ">
        <p className=" px-1 py-2 flex flex-row gap-2 items-center text-[14px] text-[#94a1b2]"><SiGoogleclassroom className="text-[24px]" />{selectedRoom.name}</p>
      </header>
      
      <div ref={containerRef} className="flex flex-col h-full gap-3 overflow-y-auto mb-2 mt-2 px-2">
        {isLoading && (<div className="flex w-full h-full justify-center items-center"> <Loader/> </div>)}
        
        {!messages.length && !isLoading && (
          <div className="flex flex-col justify-center items-center mt-[10%]">
            <img className="w-50" src={noMessage} alt="" /> 
            <p className="font-semibold text-[22px] tracking-tighter text-[#94a1b2]">İlk Mesajı Sen At</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col py-1 px-2 rounded-lg max-w-[70%] min-w-[20%] wrap-break-words shadow-md ${userInfo?._id === msg.userId ? "ml-auto bg-white text-black rounded-br-none" : "bg-gray-300 text-gray-800 rounded-bl-none"}`}>
            {userInfo?._id !== msg.userId && <p className="text-[12px] font-bold text-blue-600">@{msg.username}</p>}
            <p className="text-[14px]">{msg.message}</p>
            <p className="text-end font-extralight text-[10px] opacity-70">{formatTime(msg.createdAt)}</p>
          </div>
        ))}
      </div>

      <div className="w-full p-2">
        <form className="w-full flex flex-row relative" onSubmit={sendMessage}>
          <input 
            value={message} 
            type="text" 
            className="border-amber-50 border text-amber-50 outline-0 placeholder:text-gray-500 w-full rounded-sm p-2 bg-transparent text-[14px]" 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Mesajını yaz..." 
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-amber-50 hover:text-white transition-colors" type="submit">
            <BsSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageArea;