import { useCreateInviteCodeInChanelMutation, useGetChanelQuery } from "../../redux/api/chanel.ts";
import { Link, useLocation, useParams } from "react-router-dom";
import RoomComponent from "../../components/RoomComponent.tsx";
import MessageArea from "../../components/MessageArea.tsx";
import Loader from "../../components/Loader.tsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store.ts";
import { setSelectedChanel, setSelectedRoom } from "../../redux/app/selectedSlice.tsx";
import { MdOutlineAddBox } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { GrChannel } from "react-icons/gr";
import { Button, Modal } from "antd";
import { useCreateRoomMutation } from "../../redux/api/room.ts";
import { toast } from "react-toastify";
import svg from "../../assets/undraw_chat_qmyo.svg"
import { MdOutlineLocalPostOffice } from "react-icons/md";

//import UserComponent from "../../components/UserComponent.tsx";

const Chanel = () => {
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams();
    const { data: chanel, isLoading: chanelLoading } = useGetChanelQuery(id)
    console.log(chanel)
    const [createRoom, { isLoading: createRoomLoading }] = useCreateRoomMutation()
    const [createInviteCode, { isLoading: createInviteCodeLoading }] = useCreateInviteCodeInChanelMutation()
    const selectedRoom = useSelector((state: RootState) => state.selected.selectedRoom)
    const userInfo = useSelector((state: RootState) => state.auth.userInfo)
    const [isAddRoomModel, setIsAddModel] = useState(false)
    const [type, setType] = useState("text")
    const [roomName, setRoomName] = useState("")
    const [createdInviteCode, setCreatedInviteCode] = useState("")
    const [isCreateCodeModel, setIsCreateCodeModel] = useState(false)
    const [selectedEndTime, setSelectedEndTime] = useState("1h")

    const handleCreateRoomButton = () => {
        createRoom({ name: roomName, type, chanelId: chanel?.[0]._id }).unwrap()
            .then((res) => {
                console.log(res);
                toast.success(`${roomName} adlı oda başarıyla oluşturuldu.`);
            })
            .catch((e) => {
                console.log(e);
            })
        setIsAddModel(false)
    }

    const handleCreateInviteCodeButton = () => {
        createInviteCode({ chanelId: chanel[0]._id, endTimeKey: selectedEndTime, selectedRoom }).unwrap()
            .then((res) => {
                console.log(res);
                toast.success("Davet kodu başarıyla oluşturuldu.");
                setCreatedInviteCode(res.inviteCode)
            })
            .catch((e) => {
                console.log(e);
            })
    }

    // useEffect(() => {
    //     dispatch(setSelectedRoom(null))
    // }, [location.key])

    // TODO: add room için modal yazılıcak ve bu modal kanal ayarları kısmında da kullanılıcak.
    return (
        <div>
            {chanelLoading
                ? <Loader />
                : (
                    <div className="mt-3 flex flex-col w-full h-full bg-[#16161a] rounded-md pt-3">
                        <div className="flex flex-row items-center justify-between bg-[#242629] mx-5 rounded-md px-1 text-[#fffffe]">
                            <p className="text-[15px] px-1 py-2 flex flex-row items-start gap-1"><GrChannel className="text-[20px]" />{chanel?.[0].name}</p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsCreateCodeModel(true)}><MdOutlineLocalPostOffice className="text-[24px]" /></button>
                                {userInfo?._id == chanel[0].admin && (
                                    <div className="flex flex-row items-center gap-2">
                                        <button onClick={() => setIsAddModel(true)}><MdOutlineAddBox className="text-[24px] hover:text-[#94a1b2]" /></button>
                                        <Link title="Settings" to={`/chanel/${id}/settings`}> <FiSettings className="text-[20px] hover:text-[#94a1b2]" /></Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <RoomComponent rooms={chanel?.[0]?.rooms} />
                            {selectedRoom
                                ? <MessageArea />
                                : (
                                    <div className="flex justify-center items-center w-full h-[70vh] md:h-[75vh] bg-[#242629] my-5 md:mx-5 rounded-md p-1 ml-15 mt-5 mr-5">
                                        <img className="w-50" src={svg} alt="" />
                                    </div>
                                )}
                        </div>
                        <Modal footer={null} centered open={isAddRoomModel} confirmLoading={createRoomLoading} onCancel={() => setIsAddModel(false)}>
                            <div className="flex flex-col gap-2">
                                <p className="mb-5 font-semibold text-[20px]">Oda Ayarları</p>
                                <input onChange={(e) => setRoomName(e.target.value)} className="px-1 py-1 mb-1 border border-black rounded-md" placeholder="Odanın ismini giriniz." type="text" />
                                <select className="p-1 border rounded-md" value={type} onChange={(e) => setType(e.target.value)} name="Type" id="">
                                    <option value="text">Metin</option>
                                    <option value="voice">Sesli</option>
                                </select>
                                <Button loading={createRoomLoading} onClick={() => handleCreateRoomButton()}>Onayla</Button>
                            </div>
                        </Modal>
                        <Modal footer={null} centered open={isCreateCodeModel} onCancel={() => setIsCreateCodeModel(false)}>
                            <p className="text-center font-semibold text-[18px] my-5">Davet kodunun süresini belirleyiniz.</p>
                            <select onChange={(e) => setSelectedEndTime(e.target.value)}>
                                <option value="1h">1 Saat</option>
                                <option value="2h">2 Saat</option>
                                <option value="4h">4 Saat</option>
                                <option value="1d">1 Gün</option>
                            </select>
                            <Button loading={createRoomLoading} onClick={() => handleCreateInviteCodeButton()}>Onayla</Button>
                            <p>Davet Kodun : <span className="bg-gray-100 rounded-md px-2 py-1"> {createdInviteCode}</span></p>
                        </Modal>
                    </div>
                )
            }
        </div >
    )
}
export default Chanel;