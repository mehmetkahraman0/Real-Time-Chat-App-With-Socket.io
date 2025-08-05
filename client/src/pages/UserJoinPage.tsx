import { useState, type FormEvent } from "react"
import ChatRoom from "./ChatRoom";

const UserJoinPage = () => {

    const [userName, setUserName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [joined, setJoined] = useState(false)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log("tıklandı")
        setJoined(true)
    }

    if (joined) {
        return <ChatRoom userName={userName} roomId={roomId} />
    }
    return (
        <div className='flex flex-col max-w-100 m-auto mt-45 bg-amber-50 p-3 rounded-md shadow-md '>
            <header className="text-[18px] tracking-wider font-semibold">Giriş Sayfası</header>
            <hr className="mb-5" />
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
                <label className="flex flex-col justify-between text-[14px]" htmlFor="" >
                    Kullanıcı Adı
                    <input className="border rounded-md mt-1 px-1 text-[14px]" onChange={(e) => setUserName(e.target.value)} value={userName} type="text" />
                </label>
                <label className="flex flex-col justify-between text-[14px]" htmlFor="">
                    Room Id
                    <input className="border rounded-md mt-1 px-1 text-[14px]" onChange={(e) => setRoomId(e.target.value)} value={roomId} type="text" />
                </label>
                <button className="w-full self-end rounded-md py-1 text-[14px] bg-blue-500 text-white hover:bg-blue-600 cursor-pointer font-light mt-2" type="submit">Giriş</button>
            </form>
        </div>
    )
}

export default UserJoinPage
