import { useParams } from "react-router-dom";
import { useDeleteRoomInChanelMutation, useDeleteUserInChanelMutation, useGetChanelQuery } from "../../redux/api/chanel.ts";
import { useEffect, useState } from "react";
import { useLazyGetUserByIdQuery } from "../../redux/api/user.ts";
import { useCreateRoomMutation, useLazyGetRoomByIdQuery, useUpdateRoomMutation } from "../../redux/api/room.ts";
import { FiSettings, FiUsers, FiLayers, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Button, Modal, Table } from "antd";
import { FaRegEdit } from "react-icons/fa";
import type { Room } from "../../Model/Room.ts";
import type { User } from "../../Model/User.ts";
import { useWindowSize } from "../../functions/WindowSize.ts";


const Settings = () => {
    const { id } = useParams()
    const [users, setUsers] = useState<User[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isOpen, setIsOpen] = useState(true)
    console.log(id)
    const { data: chanel} = useGetChanelQuery(id)
    console.log(chanel)
    const [getUser] = useLazyGetUserByIdQuery()
    const [getRoom] = useLazyGetRoomByIdQuery()
    const [deleteUserInChanel, { isLoading: deleteUserLoading }] = useDeleteUserInChanelMutation()
    const [deleteRoomInChanel] = useDeleteRoomInChanelMutation()
    const [createRoom, { isLoading: createRoomLoading }] = useCreateRoomMutation()
    const [deleteUserConfirm, setDeleteUserConfirm] = useState("")
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [deleteRoomConfirm, setDeleteRoomConfirm] = useState("")
    const [isDeleteUserModel, setIsDeleteUserModel] = useState(false)
    const [isDeleteRoomModel, setIsDeleteRoomModel] = useState(false)
    const [isEditRoomModel, setIsEditRoomModel] = useState(false)
    const [editRoom, { isLoading: editRoomLoading }] = useUpdateRoomMutation()
    const [newRoomName, setNewRoomName] = useState("")
    const [selectedSideBar, setSelectedSideBar] = useState("General")
    const [newType, setNewType] = useState("")
    const [isAddRoomModel, setIsAddRoomModel] = useState(false)
    const [roomName, setRoomName] = useState("")
    const [type, setType] = useState("")
    let size = useWindowSize()
    console.log("size", size)

    const toggleDeleteUserButton = (user: User) => {
        setIsDeleteUserModel(true)
        setDeleteUserConfirm(user.username)
        setSelectedUser(user);

    }

    const handleDeleteUser = (userId: string, username: string) => {
        console.log("username", username)
        console.log("confirm", deleteUserConfirm)
        if (username === deleteUserConfirm) {
            deleteUserInChanel({ id, userId }).unwrap()
                .then(res => {
                    toast.success("Kullanıcı silindi")
                    console.log(res)
                })
                .catch(e => {
                    console.log(e)
                    toast.error("Silme işlemi tamamlanamadı.")
                })
                .finally(() => {
                    setDeleteUserConfirm("");
                    setSelectedUser(null);
                })
        } else {
            toast.warning("girdiniz ad silmek istediginiz kullanıcı adıyla ile aynı degil.")
        }
    }

    const toggleDeleteRoomButton = (room: Room) => {
        setIsDeleteRoomModel(true)
        setDeleteRoomConfirm(room.name)
    }

    const toggleEditRoomButton = (room: Room) => {
        setIsEditRoomModel(true)
        setSelectedRoom(room);
    }

    const handleDeleteRoom = (roomId: string, name: string) => {
        console.log("room", name)
        console.log("confirm", deleteRoomConfirm)
        if (name === deleteRoomConfirm) {
            deleteRoomInChanel({ id, roomId }).unwrap()
                .then(res => {
                    toast.success("Oda silindi")
                    console.log(res)
                })
                .catch(e => {
                    console.log(e)
                    toast.error("Silme işlemi tamamlanamadı.")
                })
                .finally(() => {
                    setDeleteRoomConfirm("");
                    setSelectedRoom(null);
                })
        } else {
            toast.warning("girdiniz ad silmek istediginiz oda adıyla ile aynı degil.")
        }
        setDeleteUserConfirm("")
    }

    const handleEditButton = (roomId: string) => {
        editRoom({ id: roomId, data: { isPrivate: false, name: newRoomName } }).unwrap()
            .then(res => {
                toast.success("Düzenleme kayıt edildi.")
                console.log(res)
            })
            .catch(e => {
                console.log(e)
                toast.error("Düzenleme tamamlanamadı.")
            })
    }

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

    const userColumns = [
        {
            title: <span className="font-semibold text-[12px] md:text-[14px]">Fotograf</span>,
            dataIndex: "userFoto",
            key: "userFoto",
            render: () => (
                <img
                    src={`http://localhost:3000/uploads/chanel/${chanel.chanelFoto}` || ""}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border"
                />
            ),
        },
        {
            title: <span className="font-semibold text-[12px] md:text-[14px]">Kullanıcı Adı</span>,
            dataIndex: "username",
            key: "username",
            render: (text: string) => <span className="font-medium text-[12px] md:text-[14px]">{text}</span>,
        },
        {
            title: <span className="font-semibold text-[12px] md:text-[14px]">İşlemler</span>,
            key: "actions",
            render: (_: unknown, record: User) => (
                <Button
                    type="text"
                    danger
                    icon={<MdOutlineDelete size={20} />}
                    onClick={() => toggleDeleteUserButton(record)}
                />
            ),
        },
    ];

    const roomColumns = [
        {
            title: <span className="font-semibold text-[12px] md:text-[14px]">Oda Adı</span>,
            dataIndex: "name",
            key: "name",
            render: (text: string) => <span className="font-medium text-[12px] md:text-[14px]">{text}</span>,
        },
        {
            title: <span className="font-semibold text-[12px] md:text-[14px]">Oda Tipi</span>,
            dataIndex: "type",
            key: "type",
            render: (text: string) => <span className="font-medium text-[12px] md:text-[14px]">{text}</span>,
        },
        {
            title: <span className="font-semibold text-[12px] md:text-[14px]">İşlemler</span>,
            key: "actions",
            render: (_: unknown, record: Room) => (
                <>
                    <Button
                        type="text"
                        danger
                        icon={<MdOutlineDelete size={20} />}
                        onClick={() => toggleDeleteRoomButton(record)}
                    />
                    <Button
                        type="text"
                        icon={<FaRegEdit size={20} />}
                        onClick={() => toggleEditRoomButton(record)}
                    />
                </>
            ),
        },
    ];

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

    useEffect(() => {
        chanel?.[0].users.forEach(async (userId: string) => {
            getUser(userId).unwrap()
                .then((res) => {
                    setUsers((prev) => [...prev, res])
                })
                .catch((e) => {
                    console.log(e)
                })
        });
        chanel?.[0].rooms.forEach(async (userId: string) => {
            getRoom(userId).unwrap()
                .then((res) => {
                    setRooms((prev) => [...prev, res])
                })
                .catch((e) => {
                    console.log(e)
                })
        });
    }, [chanel])

    console.log(users)
    console.log(rooms)
    return (
        <div className="flex flex-row mt-5 relative text-white bg-[#16161a] rounded-md">
            <div className={`flex flex-col h-[75vh] bg-[#242629]  items-center  px-1 sm:px-3   text-white transition-all duration-500 rounded-sm ${isOpen ? "w-52" : "w-9"} z-10 absolute sm:static`}>
                <button className={`${isOpen ? "  ml-45 transition" : "ml-1"} mt-5 rounded-full bg-transparent sm:hidden`} onClick={() => toggle()}> {isOpen ? <FiChevronLeft /> : <FiChevronRight />}</button>
                {isOpen && (<h2 className="font-extrabold text-[20px] tracking-widest w-full text-center py-10 border-b border-gray-400">AYARLAR</h2>)}
                <button className={`flex items-center gap-2 pl-1 py-2 w-full text-sm transition ${isOpen ? "mt-0" : "mt-28"} ${selectedSideBar === "General" ? "font-semibold bg-gray-200 text-black rounded-md" : ""}`} onClick={() => toggle("General")}><FiSettings className="text-[20px]" /> {isOpen && "Genel Ayarlar"}</button>
                <button className={`flex items-center gap-2 pl-1 py-2 w-full text-sm transition  ${selectedSideBar === "Rooms" ? "font-semibold bg-gray-200 text-black rounded-md" : ""}`} onClick={() => toggle("Rooms")}> <FiLayers className="text-[20px]" />{isOpen && "Odaları Yönet"}</button>
                <button className={`flex items-center gap-2 pl-1 py-2 w-full text-sm transition  ${selectedSideBar === "Users" ? "font-semibold bg-gray-200 text-black rounded-md" : ""}`} onClick={() => toggle("Users")}><FiUsers className="text-[20px]" />{isOpen && "Kullanıcıları Yönet"}</button>
            </div>
            <div className="h-[75vh] w-[2px] bg-gray-300"></div>
            {selectedSideBar == "Users" && (
                <div className="my-3 mr-3 ml-9 sm:ml-3  w-full bg-white rounded-md shadow-lg p-6 space-y-4">
                    <Table<User> style={{ width: "100%" }} columns={userColumns} dataSource={users} rowKey="_id" pagination={{ pageSize: 5 }} />
                    <Modal footer={null} centered open={isDeleteUserModel} confirmLoading={deleteUserLoading} onCancel={() => setIsDeleteUserModel(false)}>
                        <div className="flex flex-col gap-2">
                            <p className="mb-5">Silmek istediginiz kullanıcının adını girerek onaylayınız.</p>
                            <input onChange={(e) => setDeleteUserConfirm(e.target.value)} className="px-1 py-1" type="text" />
                            <Button onClick={() => handleDeleteUser(selectedUser!._id, selectedUser!.username)}>Onayla</Button>
                        </div>
                    </Modal>
                </div >
            )}
            {selectedSideBar == "Rooms" && (
                <div className="flex flex-col items-end justify-between my-3 mr-3 ml-9 sm:ml-3  w-full bg-white rounded-md shadow-lg p-6 space-y-4  ">
                    <Table<Room> size="small" style={{ width: "100%" }} columns={roomColumns} dataSource={rooms} rowKey="_id" pagination={{ pageSize: 5 }} />
                    <button className="w-fit bg-[#242629] px-2 py-1 text-[#fffffe] flex flex-row gap-1 text-[12px] items-center hover:text-[#94a1b2] rounded-md transition" onClick={() => setIsAddRoomModel(true)}>Oda Oluştur<MdOutlineAddBox className="text-[24px]" /></button>
                    <Modal footer={null} centered open={isEditRoomModel} confirmLoading={editRoomLoading} onCancel={() => setIsEditRoomModel(false)}>
                        <div className="flex flex-col gap-2">
                            <p className="mb-5 font-semibold text-[20px]">Oda Ayarları</p>
                            <input onChange={(e) => setNewRoomName(e.target.value)} className="px-1 py-1 mb-1 border border-black rounded-md" placeholder="Odanın yeni ismini giriniz." type="text" />
                            <select className="p-1 border rounded-md" value={newType} onChange={(e) => setNewType(e.target.value)} name="Type" id="">
                                <option value="text">Metin</option>
                                <option value="voice">Sesli</option>
                            </select>
                            <Button onClick={() => handleEditButton(selectedRoom!._id)}>Onayla</Button>
                        </div>
                    </Modal>
                    <Modal footer={null} centered open={isDeleteRoomModel} confirmLoading={deleteUserLoading} onCancel={() => setIsDeleteRoomModel(false)}>
                        <div className="flex flex-col gap-2">
                            <p className="mb-5">Silmek istediginiz kullanıcının adını girerek onaylayınız.</p>
                            <input onChange={(e) => setDeleteRoomConfirm(e.target.value)} className="px-1 py-1 border border-black rounded-md" type="text" />
                            <Button onClick={() => handleDeleteRoom(selectedRoom!._id, selectedRoom!.name)}>Onayla</Button>
                        </div>
                    </Modal>
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
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Genel Ayarlar</h2>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p><span className="font-medium text-gray-900">Kanal Adı:</span> {chanel[0].name}</p>
                        <p><span className="font-medium text-gray-900">Oda Sayısı:</span> {chanel[0].rooms.length}</p>
                        <p><span className="font-medium text-gray-900">Kullanıcı Sayısı:</span> {chanel[0].users.length}</p>
                        <p>
                            <span className="font-medium text-gray-900">Gizlilik Durumu:</span>{" "}
                            <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${chanel[0].isPrivate ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}> {chanel[0].isPrivate ? "Gizli" : "Herkese Açık"}</span>
                        </p>
                        <p>
                            <span className="font-medium text-gray-900">Davet Kodu:</span>{" "}
                            <span className="px-2 py-0.5 bg-gray-100 rounded-md font-mono text-gray-600">{chanel[0].inviteCode}</span>
                        </p>
                    </div>
                </div>

            )}
        </div >
    )
}
export default Settings
