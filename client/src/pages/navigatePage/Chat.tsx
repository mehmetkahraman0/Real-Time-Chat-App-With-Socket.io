
import { Link, useNavigate } from "react-router-dom";
import { IoLockClosedOutline, IoLockOpenOutline, IoPersonOutline } from "react-icons/io5";
import type { AppDispatch, RootState } from "../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import {
    useCreateChanelMutation,
    useGetChanelByUserQuery,
    useJoinChanelWithInviteCodeMutation
} from "../../redux/api/chanel.ts";
import { Button, Modal } from "antd";
import { type FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { setSelectedChanel, setSelectedRoom } from "../../redux/app/selectedSlice.tsx";
import LoaderWithTimeout from "../../components/Loader.tsx";
import type { Chanel } from "../../Model/Chanel.ts";
import defaultChanelFoto from "../../assets/undraw_relaunch-day_k3qo.svg";
import { useLazyGetRoomByIdQuery } from "../../redux/api/room.ts";

const Chat = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { data: chanels, isLoading: getChanelByUserLoading } = useGetChanelByUserQuery(undefined)
    const userInfo = useSelector((state:RootState) => state.auth.userInfo)
    const [createChanel, { isLoading: createChanelLoading }] = useCreateChanelMutation()
    const [getRoomById] = useLazyGetRoomByIdQuery()
    const [joinChanelWithInviteCode] = useJoinChanelWithInviteCodeMutation()
    const selectedRoom = useSelector((state: RootState) => state.selected.selectedRoom)
    const [isOpenCreateModel, setIsOpenCreateModel] = useState(false);
    const [isOpenInviteModel, setIsOpenInviteModel] = useState(false);
    const [name, setName] = useState("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [inviteCode, setInviteCode] = useState("");

    const submitCreateChanel = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("isPrivate", isPrivate ? "1" : "0");
        if (file) formData.append("chanelFoto", file);
        createChanel(formData)
            .unwrap()
            .then(res => {
                console.log("Oluşturulan kanal : ", res);
                toast.success(res.name + " adlı kanal oluşturuldu.");
                setIsOpenCreateModel(false)

            })
            .catch(err => {
                toast.error(err.data.message)
                console.log(err);
            })
    }

    const handleJoinChanelWithInviteCode = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinChanelWithInviteCode({ inviteCode }).unwrap()
            .then(res => {
                toast.success(`Davet koduyla ",${res.name}," adlı kanala katınıldı.`)
                console.log(res)
                setIsOpenInviteModel(false)
                navigate(`/chanel/${res.invitedChanel._id}`)
                getRoomById(res.codeObj.selectedRoom).unwrap()
                    .then((res) => {
                        dispatch(setSelectedRoom(res))
                    })
                console.log("bak bak buraya bak eşşek", selectedRoom)
            })
            .catch(err => {
                console.log(err)
                toast.error(err.data.message)
            })
    }

    const handleSelectedChanel = (e: Chanel) => {
        dispatch(setSelectedChanel(e))
    }

    if (getChanelByUserLoading)
        return <LoaderWithTimeout />

    if(!userInfo)
        return(<p className="text-center w-full mx-auto text-[#fffffe] text-[22px] font-semibold mt-70">Kullanıcı Giriş yapınız yada kayıt olunuz</p>)
    return (
        <div className="flex flex-col gap-1 h-[85vh] mt-5 rounded-lg">
            <div className="w-full flex flex-col gap-5">
                <header className="text-[#fffffe] text-[24px] tracking-tighter font-medium text-center border-b border-[#94a1b2] pb-3">Kanallar</header>
                <div className=" grid md:grid-cols-2 lg:grid-cols-3 justify-center md:justify-center items-center gap-3 mb-16">
                        { chanels?.map((chanel: Chanel, index: number) => (
                            <Link key={index} className="text-[#fffffe] md:max-w-100 justify-around flex flex-row items-center gap-10 bg-[#16161a] hover:bg-[#242629] hover:shadow-xl  transition px-2 py-2 rounded-md last:mb-16 last:sm:mb-0" to={`/chanel/${chanel._id}`} onClick={() => handleSelectedChanel(chanel)}>
                                <img className="h-20 w-20 object-cover rounded-[50%]" src={`http://localhost:3000/uploads/chanel/${chanel.chanelFoto}`} alt="chanel-foto" onError={(e) => { e.currentTarget.src = defaultChanelFoto; e.currentTarget.className = "h-20 w-20 object-cover rounded-[50%]" }} />
                                <div className="w-full">
                                    <p className="w-full text-[12px] sm:text-[14px] font-medium overflow-hidden size-min ">{chanel.name}</p>
                                    <p className="w-full text-[12px] md:font-light overflow-hidden flex items-center"><IoPersonOutline /> : {chanel.users.length}</p>
                                </div>
                                {chanel.isPrivate
                                    ? (
                                        <IoLockClosedOutline title="Private" className="text-[32px] sm:text-[22px] md:text-[32px]" />
                                    ) : (
                                        <IoLockOpenOutline title="Public" className="text-[32px] sm:text-[22px] md:text-[32px]" />
                                    )}
                            </Link>
                        ))}
                        {chanels.length == 0 && <p className="mt-10 font-semibold text-[20px] text-[#fffffe]"># Kayıtlı Kanal Yok</p>}
                </div>
                <div className="flex flex-row gap-5 fixed bottom-[-15px] left-1/2 transition -translate-x-1/2 -translate-y-1/2 size-max">
                    <button className=" px-4 py-1 rounded-md bg-gray-400/40 backdrop-blur-2xs  sm:text-white shadow-sm hover:bg-transparent hover:scale-105 transition text-[14px]" onClick={() => setIsOpenCreateModel((true))}> Kanal Oluştur</button>
                    <Modal title="Kanal Oluştur" closable={true} onCancel={() => setIsOpenCreateModel(!isOpenCreateModel)} open={isOpenCreateModel} footer={null} confirmLoading={createChanelLoading}>
                        <form onSubmit={submitCreateChanel} className="flex flex-col gap-4 p-4 bg-gray-50 rounded-md shadow-sm">
                            <div className="flex flex-col">
                                <label className="font-medium text-gray-700">İsim</label>
                                <input onChange={(e) => setName(e.target.value)} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Kanal adını giriniz" />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium text-gray-700">Gizlilik</label>
                                <select onChange={(e) => setIsPrivate(e.target.value === "true")} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                                    <option value="false">Herkese Açık</option>
                                    <option value="true">Gizli</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="cursor-pointer text-gray-700 hover:text-blue-500 transition-colors flex flex-row gap-2 items-center">
                                    <span className="font-medium">Kanal Fotoğrafı:</span> {file ? file.name : "Dosya seç"}
                                    <input type="file" className="hidden" onChange={(e) => setFile(e.target.files && e.target.files[0])} />
                                </label>
                            </div>
                            <Button htmlType="submit" className="!px-4 !py-2 !bg-blue-600 !text-white rounded hover:!bg-blue-500 !transition-colors !flex-row flex !justify-center !items-center" loading={createChanelLoading}>Oluştur</Button>
                        </form>
                    </Modal>
                    <button className=" px-5 py-3 rounded-md bg-gray-400/40 backdrop-blur-2xs sm:text-white shadow-sm hover:bg-transparent hover:scale-105 transition text-[14px] " onClick={() => setIsOpenInviteModel(true)}>Kanala Katıl</button>
                    <Modal width={600} centered footer={false} open={isOpenInviteModel} onCancel={() => setIsOpenInviteModel(false)}  >
                        <form onSubmit={handleJoinChanelWithInviteCode} className="flex flex-col gap-4 p-4">
                            <div className="flex flex-col">
                                <label className="w-full font-medium text-gray-700">Davet Kodu</label>
                                <input onChange={(e) => setInviteCode(e.target.value)} className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Davet kodunu giriniz" />
                            </div>
                            <Button htmlType="submit" className="!px-4 !py-2 !bg-blue-600 !text-white rounded hover:!bg-blue-500 !transition-colors !flex-row flex !justify-center !items-center" loading={createChanelLoading}>Oluştur</Button>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Chat