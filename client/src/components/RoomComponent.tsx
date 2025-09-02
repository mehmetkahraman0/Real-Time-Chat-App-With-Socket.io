import { MdKeyboardDoubleArrowRight, MdOutlineTag } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLazyGetRoomByIdQuery } from "../redux/api/room.ts";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store.ts";
import { setSelectedRoom } from "../redux/app/selectedSlice.tsx";
import socket from "../socket/connectSocket.ts";
import type { Room } from "../Model/Room.ts";
import { useWindowSize } from "../functions/WindowSize.ts";
import Loader from "./Loader.tsx";

const RoomComponent = ({ rooms }) => {
    const dispatch = useDispatch<AppDispatch>()
    const selectedChanel = useSelector((state: RootState) => state.selected.selectedChanel)
    const selectedRoom = useSelector((state: RootState) => state.selected.selectedRoom)
    const [isOpen, setIsOpen] = useState(true);
    let size = useWindowSize()
    const [getRoomById, { isFetching }] = useLazyGetRoomByIdQuery()
    const [roomList, setRoomList] = useState<Room[]>([])

    const toggle = (item: Room | null = selectedRoom) => {
        dispatch(setSelectedRoom(item))
        socket.emit("joinRoom", item!._id);
        if (item == selectedRoom) {
            setIsOpen(true)
        }
        if (size.width <= 767) {
            setIsOpen(!isOpen)
            dispatch(setSelectedRoom(item))
        } else {
            dispatch(setSelectedRoom(item))
            setIsOpen(true)
        }
    }

    useEffect(() => {
        if (!rooms || rooms.length === 0) {
            return;
        }
        (async () => {
            try {
                const results: Room[] = await Promise.all(
                    rooms.map((id: string) => getRoomById(id).unwrap())
                );
                setRoomList(results);
            } catch (err) {
                console.error("Room fetch hatası:", err);
            }
        })();
    }, [rooms, getRoomById]);

    return (
        <div className={`flex flex-col bg-[#242629] text-[#fffffe] h-[70vh] md:h-[75vh] transition-all duration-500 rounded-md ${isOpen ? "w-50" : "w-7"} z-10 absolute md:static ml-5 mt-5 mb-5 overflow-scroll`}>
            <header className="flex flex-row items-center justify-between font-semibold text-white tracking-tight  bg-gray-700  overflow-hidden w-full rounded-md ">
                <div className="flex flex-row justify-end gap-3 w-full items-center md:py-0" >
                    <MdKeyboardDoubleArrowRight onClick={() => setIsOpen(!isOpen)} className={`transition-transform duration-500 my-2 mr-1  ${isOpen ? "rotate-180" : "rotate-0"} text-[20px]  md:hidden cursor-pointer`} />
                </div>
            </header>
            <div className="md-hidden" >
                {isFetching
                    ? (<Loader />)
                    : (<div className="flex flex-col mt-2 gap-2 overflow-scroll" >
                        {roomList.length == 0 && !isFetching && isOpen && (<p className="text-center mt-65">Oda Yok</p>)}
                        {roomList.map((room, index) => (
                            <div key={index} className={`flex flex-row items-center gap-1 p-1 hover:bg-[#16161a] rounded-md `} onClick={() => toggle(room)}>
                                <MdOutlineTag className={`text-[16px] `} />
                                <p className={`${isOpen ? "block" : "hidden"} text-[14px]`}> {room.name}</p>
                            </div>
                        ))}
                    </div>)}
            </div>
        </div>
    )
}
export default RoomComponent