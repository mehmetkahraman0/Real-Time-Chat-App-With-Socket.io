import { useParams } from "react-router-dom"
import { useGetChanelQuery } from "../../redux/api/chanel"
import {  useState } from "react";
import { useCreateRoomMutation} from "../../redux/api/room";
import { FiSettings, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { useWindowSize } from "../../functions/WindowSize";


const Settings = () => {
    const { id } = useParams()
    const [isOpen, setIsOpen] = useState(true)
    console.log(id)
    const { data: chanel } = useGetChanelQuery(id)
    console.log(chanel)
    const [createRoom, { isLoading: createRoomLoading }] = useCreateRoomMutation()
    const [selectedSideBar, setSelectedSideBar] = useState("General")
    const [isAddRoomModel, setIsAddRoomModel] = useState(false)
    const [roomName, setRoomName] = useState("")
    const [type, setType] = useState("")
    let size = useWindowSize()
    console.log("size", size)

    const handleCreateRoomButton = () => {
        createRoom({ name: roomName, type, chanelId: chanel?.[0]._id }).unwrap()
            .then((res) => {
                console.log(res);
                toast.success(`${roomName} adlı oda başarıyla oluşturuldu.`);
            })
            .catch((e) => {
                console.log(e);
            })
        setIsAddRoomModel(false)
    }

    const toggle = (item: string = selectedSideBar) => {
        if (item == selectedSideBar) {
            setIsOpen(true)
        }
        if ((item == "General" || "Room" || "User") && isOpen == false) {
            setSelectedSideBar(item)
            return
        }
        if (size.width <= 640) {
            setIsOpen(!isOpen)
            setSelectedSideBar(item)
        } else {
            setSelectedSideBar(item)
            setIsOpen(true)
        }
    }

    return (
        <div className="flex flex-row mt-5 relative text-white bg-[#16161a] rounded-md">
            <div className={`flex flex-col h-[75vh] bg-[#242629]  items-center  px-1 sm:px-3   text-white transition-all duration-500 rounded-sm ${isOpen ? "w-52" : "w-9"} z-10 absolute sm:static`}>
                <button className={`${isOpen ? "  ml-45 transition" : "ml-1"} mt-5 rounded-full bg-transparent sm:hidden`} onClick={() => toggle()}> {isOpen ? <FiChevronLeft /> : <FiChevronRight />}</button>
                {isOpen && (<h2 className="font-extrabold text-[20px] tracking-widest w-full text-center py-10 border-b border-gray-400">AYARLAR</h2>)}
                <button className={`flex items-center gap-2 pl-1 py-2 w-full text-sm transition ${isOpen ? "mt-0" : "mt-28"} ${selectedSideBar === "General" ? "font-semibold bg-gray-200 text-black rounded-md" : ""}`} onClick={() => toggle("General")}><FiSettings className="text-[20px]" /> {isOpen && "Genel Bilgiler"}</button>
            </div>
            <div className="h-[75vh] w-0.5 bg-gray-300"></div>
            {selectedSideBar == "Rooms" && (
                <div className="flex flex-col items-end justify-between my-3 mr-3 ml-9 sm:ml-3  w-full bg-white rounded-md shadow-lg p-6 space-y-4  ">
                    <Modal footer={null} centered open={isAddRoomModel} confirmLoading={createRoomLoading} onCancel={() => setIsAddRoomModel(false)}>
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
                </div>
            )}
            {selectedSideBar == "General" && chanel && (
                <div className="ml-9 sm:ml-3  w-full bg-white rounded-md shadow-lg p-6 m-3 space-y-4 ">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Genel Bilgiler</h2>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p><span className="font-medium text-gray-900">Kanal Adı:</span> {chanel[0]?.name}</p>
                        <p><span className="font-medium text-gray-900">Oda Sayısı:</span> {chanel[0]?.rooms.length}</p>
                        <p><span className="font-medium text-gray-900">Kullanıcı Sayısı:</span> {chanel[0]?.users.length}</p>
                        <p>
                            <span className="font-medium text-gray-900">Gizlilik Durumu:</span>{" "}
                            <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${chanel[0]?.isPrivate ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}> {chanel[0]?.isPrivate ? "Gizli" : "Herkese Açık"}</span>
                        </p>
                        <p>
                            <span className="font-medium text-gray-900">Davet Kodları:</span>{"Boş"}
                            {chanel[0]?.inviteCode.map((item: any) => (
                                <span
                                    key={item._id.$oid}
                                    className="px-2 py-0.5 bg-gray-100 rounded-md font-mono text-gray-600 mr-2"
                                >
                                    {item.code}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>

            )}
        </div >
    )
}
export default Settings
