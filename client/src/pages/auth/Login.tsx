import { type FormEvent, useEffect, useState } from "react";
import Loader from "../../components/Loader.tsx";
import {useUserLoginMutation} from "../../redux/api/user.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../redux/store.ts";
import {toast} from "react-toastify";
import {setCredentials} from "../../redux/features/auth/authSlice.tsx";
import {useLocation, useNavigate} from "react-router-dom";
//import {useLocation, useNavigate} from "react-router-dom";
// absolute path

const Login = ( ) => {
    const dispatch = useDispatch<AppDispatch>()
    const {userInfo} = useSelector((state:RootState) => state.auth)
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [login, {isLoading}] = useUserLoginMutation();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login({ username, password })
            .unwrap()
            .then((res) => {
                dispatch(setCredentials({ ...res }));
                toast.success("Giriş işlemi başarılı.");
            })
            .catch((e: { data?: { message?: string } }) => {
                toast.error(e.data?.message ?? "Giriş başarısız.");
            });
    }

     //logout işlemide eklendikten sonra kullanıcak.
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
      if (userInfo) {
    navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return(
        <div className="mt-35">
            <form onSubmit={submitHandler} className="w-full max-w-md mx-auto p-5 flex flex-col gap-3 bg-gray-100 rounded-md shadow-md">
                <header className="underline text-[22px] self-center tracking-widest font-semibold text-blue-700">Login Form</header>
                <hr />
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-600" htmlFor="text">Username</label>
                    <input className="px-3 py-1 border-0 border-b-2  border-gray-400 font-light tracking-tight placeholder:opacity-40 placeholder:font-extralight focus:outline-none focus:border-blue-500 transition" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-600" htmlFor="text">Password</label>
                    <input className="px-3 py-1 border-0 border-b-2  border-gray-400 font-light tracking-tight placeholder:opacity-40 placeholder:font-extralight focus:outline-none focus:border-blue-500 transition" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                </div>
                <button className=" flex flex-row justify-center items-center w-full py-1 rounded-md cursor-pointer font-semibold text-white bg-blue-500 hover:bg-blue-600 transition" type="submit" disabled={isLoading} >Register {isLoading ? <Loader/> : null}</button>
            </form>
        </div>
    )
}

export default Login