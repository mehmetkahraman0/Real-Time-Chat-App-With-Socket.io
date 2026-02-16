import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store.ts";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";
import { LuMessageSquareMore } from "react-icons/lu";
import { setSelectedChanel, setSelectedNavbar, setSelectedRoom } from "../../redux/app/selectedSlice.tsx";
import { IoLogOutOutline } from "react-icons/io5";
import { Button, Modal } from "antd";
import { useCurrentUserLogoutMutation } from "../../redux/api/user.ts";
import { logout } from "../../redux/features/auth/authSlice.tsx";
import { toast } from "react-toastify";
import { useWindowSize } from "../../functions/WindowSize.ts";


const Navbar = () => {
    const navigate = useNavigate()
    let size = useWindowSize()
    const dispatch = useDispatch<AppDispatch>()
    const [isMenu, setIsMenu] = useState(false);
    const [isLogoutModal, setIsLogoutModal] = useState(false)
    const userInfo = useSelector((state: RootState) => state.auth.userInfo)
    const selectedNavbar = useSelector((state: RootState) => state.selected.selectedNavbar);
    const [logoutCurrentUser, { isLoading: logoutLoading }] = useCurrentUserLogoutMutation()

    const handleSelectedNavber = (name: string) => {
        dispatch(setSelectedNavbar(name))
        if (size.width < 640) {
            setIsMenu(false)
        }
    }

    const userLogout = () => {
        logoutCurrentUser(undefined).unwrap()
            .then(res => {
                console.log(res)
                toast.success("Hesaptan çıkış yapıldı.")
            })
            .catch(e => {
                console.log(e)
            })
        setIsLogoutModal(false)
        dispatch(logout())
        dispatch(setSelectedChanel(null))
        dispatch(setSelectedRoom(null))
        navigate("/")
    }

    return (
        <div className="relative flex flex-row justify-between items-center max-w-303.75 xl:mx-auto mt-5 mx-1 sm:mx-2 md:mx-6 lg:mx-8 px-1 sm:px-2 md:px-6 lg:px-8 h-15 bg-[#16161a] rounded-md">
            <div>
                {/*<img src={} alt="logo"/>*/}
                <hr className="text-blue-300" />
                <p className="font-semibold tracking-widest sm:text-[22px] text-blue-600">Chatting.com</p>
                <hr className="text-blue-300" />
            </div>
            <div className="flex flex-row justify-between gap-3 sm:gap-8">
                <div className="sm:flex flex-row justify-between items-center gap-10 hidden">
                    <Link className={`text-[#fffffe] font-medium hover:text-[#94a1b2] transition tracking-tight ${selectedNavbar === "Ana Sayfa" ? "text-[#94a1b2]" : ""}`} to="/" onClick={() => handleSelectedNavber("Ana Sayfa")}>Ana Sayfa</Link>
                    <Link className={`text-[#fffffe] font-medium hover:text-[#94a1b2] transition tracking-tight ${selectedNavbar === "Sohbet" ? "text-[#94a1b2]" : ""}`} to="/chanel" onClick={() => handleSelectedNavber("Sohbet")}>Sohbet</Link>
                    <Link className={`text-[#fffffe] font-medium hover:text-[#94a1b2] transition tracking-tight ${selectedNavbar === "Hakkımızda" ? "text-[#94a1b2]" : ""}`} to="/hakkımızda" onClick={() => handleSelectedNavber("Hakkımızda")}>Hakkımızda</Link>
                </div>
                <div className="bg-[#94a1b2] w-px hidden sm:flex"></div>
                {userInfo == null
                    ? (
                        <div className="flex gap-2 text-white ">
                            <Link className="flex flex-row items-center gap-2 text-blue-600 rounded-lg tracking-tight hover:text-[#fffffe] transition text-[14px] md:text-[16px]" to="/login"><IoPersonCircleOutline className="text-[20px] hidden md:flex" />Signin</Link>
                            <Link className="bg-blue-500 text-white px-2 py-1 rounded-lg tracking-tight hover:bg-transparent hover:text-blue-600 transition text-[14px] md:text-[16px]" to="/register">Signup</Link>
                        </div>
                    )
                    : (
                        <div className="flex flex-row items-center">
                            <Button title="logout" loading={logoutLoading} className="border-0! flex! flex-row! items-center! gap-2! bg-red-500! px-1! py-1! text-white! rounded-lg! tracking-tight! hover:text-red-600! hover:bg-white! transition! " onClick={() => setIsLogoutModal(true)}><IoLogOutOutline className="text-[20px]" /><span className="text-[12px] font-extralight">Çıkış yap</span></Button>
                            <button className="flex sm:hidden"></button>
                        </div>
                    )}
                <div className="bg-black w-px sm:hidden"></div>
                <div className="flex sm:hidden">
                    {isMenu
                        ? <button onClick={() => setIsMenu(false)} className="  px-1 py-1 text-red-700 rounded-lg tracking-tight hover:text-white hover:bg-red-600 transition text-[20px] cursor-pointer"><MdOutlineCancel /></button>
                        : <button onClick={() => setIsMenu(true)} className=" gap-2 bg-transparent px-1 py-1 text-blue-500 rounded-lg tracking-tight hover:bg-blue-500 hover:text-white transition text-[20px] cursor-pointer"><RiMenuLine /></button>
                    }
                </div>
            </div>
            <div
                className={`flex flex-col items-baseline gap-4 md:left-50 absolute top-20 left-0 w-54 h-[90vh] bg-gray-200 -mt-5px p-6 z-20 transition-all duration-300 ease-in-out ${isMenu ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}`}>
                <Link className={`flex flex-row items-center justify-between w-full font-medium hover:text-blue-700 transition tracking-tight ${selectedNavbar === "Ana Sayfa" ? "text-blue-700 " : ""}`} to="/" onClick={() => handleSelectedNavber("Ana Sayfa")}>Ana Sayfa <AiOutlineHome className="text-[18px]" /></Link>
                <hr className="w-full" />
                <Link className={`flex flex-row items-center justify-between w-full font-medium hover:text-blue-700 transition tracking-tight ${selectedNavbar === "Sohbet" ? "text-blue-700 " : ""}`} onClick={() => handleSelectedNavber("Sohbet")} to="/chanel">Sohbet  <LuMessageSquareMore className="text-[18px]" /></Link>
                <hr className="w-full" />
                <Link className={`flex flex-row items-center justify-between w-full font-medium hover:text-blue-700 transition tracking-tight ${selectedNavbar === "Hakkımızda" ? "text-blue-700 " : ""}`} to="/" onClick={() => handleSelectedNavber("Hakkımızda")}>Hakkımızda <MdOutlineContactSupport className="text-[18px]" /></Link>
            </div>
            <Modal centered width={400} confirmLoading={logoutLoading} footer={null} open={isLogoutModal} onCancel={() => setIsLogoutModal(false)}>
                <div className="shadow-md p-3 mt-8">
                    <p className="text-center mb-10">Çıkış yapmak istediğinizden emin misiniz ?</p>
                    <div className="flex flex-row justify-center gap-2">
                        <button onClick={() => setIsLogoutModal(false)} className="w-full cursor-pointer border rounded-md hover:text-blue-600">İptal</button>
                        <Button title="logout" loading={logoutLoading} className="w-full! border-0! flex! flex-row! items-center! gap-2! bg-red-500! px-1! py-1! text-white! rounded-lg! tracking-tight! hover:text-red-600! hover:bg-white! transition! " onClick={() => userLogout()}>Evet</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Navbar

