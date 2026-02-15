import { type FormEvent, useState } from "react";
import Loader from "../../components/Loader.tsx";
import { useUserRegisterMutation } from "../../redux/api/user.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store.ts";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice.tsx";
import { useNavigate } from "react-router-dom";
//import {useLocation, useNavigate} from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [register, { isLoading }] = useUserRegisterMutation();
    console.log(isLoading)
    console.log(userInfo)
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Şifreler uyuşmuyor.");
        } else {
            register({ username, email, password }).unwrap()
                .then((res) => {
                    toast.success("Kayıt işlemi başarılı.")
                    navigate("/login")
                })
                .catch((e: { data?: { message?: string } }) => {
                    console.log(e)
                    toast.error(e.data?.message ?? "Kayıt işlemi başarısız.")
                })
        }
    }

    return (
        <div className="mt-18 sm:mt-32">
            <form onSubmit={submitHandler} className="w-full max-w-md mx-auto p-5 flex flex-col gap-3 bg-gray-100 rounded-md shadow-md">
                <header className="underline text-[22px] self-center tracking-widest font-semibold text-blue-700">Register Form</header>
                <hr />
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-600" htmlFor="text">Username</label>
                    <input className="px-3 py-1 border-0 border-b-2  border-gray-400 font-light tracking-tight placeholder:opacity-40 placeholder:font-extralight focus:outline-none focus:border-blue-500 transition" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-600" htmlFor="email">Email address</label>
                    <input className="px-3 py-1 border-0 border-b-2  border-gray-400 font-light tracking-tight placeholder:opacity-40 placeholder:font-extralight focus:outline-none focus:border-blue-500 transition" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-600" htmlFor="text">Password</label>
                    <input className="px-3 py-1 border-0 border-b-2  border-gray-400 font-light tracking-tight placeholder:opacity-40 placeholder:font-extralight focus:outline-none focus:border-blue-500 transition" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-600" htmlFor="password">Confirm password</label>
                    <input className="px-3 py-1 border-0 border-b-2  border-gray-400 font-light tracking-tight placeholder:opacity-40 placeholder:font-extralight focus:outline-none focus:border-blue-500 transition" type="text" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Enter confirm password" />
                </div>
                <button className=" flex flex-row justify-center items-center w-full py-1 rounded-md cursor-pointer font-semibold text-white bg-blue-500 hover:bg-blue-600 transition" type="submit" disabled={isLoading} >Register {isLoading ? <Loader /> : null}</button>
            </form>
        </div>
    )
}

export default Register