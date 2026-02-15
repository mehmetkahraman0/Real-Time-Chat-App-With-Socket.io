import {useEffect, useState} from "react";
import {useLazyGetUserByIdQuery} from "../redux/api/user.ts";
import {MdKeyboardDoubleArrowRight} from "react-icons/md";
import {TbUsersGroup} from "react-icons/tb";
import {GoPerson} from "react-icons/go";
import type { User } from "../Model/User.ts";

const UserComponent = ({ users }: { users: string[] }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [userList, setUserList] = useState<User[]>([]);
    const [getUserById] = useLazyGetUserByIdQuery();

    useEffect(()=>{
        if (!users || users.length === 0) return;
        users.forEach( async (id:string) => {
            try{
                console.log(id);
                const {data, error} = await getUserById(id);
                console.log(error)
                console.log(data)
                if(data)
                    setUserList((prev: User[]) => [...prev, data])
            }catch (e) {
                console.log(e)
            }
        })
    },[users, getUserById])

    return(
            <div className={`flex flex-col bg-gray-600 text-white h-[85vh] rounded-md transition-all duration-500  ${isOpen ? "w-52" : "w-11"}  mt-5 absolute right-0 z-10`}>
                <header className="flex flex-row items-center justify-between font-semibold text-white tracking-tight p-2 bg-gray-700 rounded-tl-md rounded-tr-md border-b" >
                    <p className={`${isOpen ? "block" : "hidden"} text-[15px]`}>Kullanıcılar</p>
                    <div className="flex flex-row gap-2 items-center justify-center" >
                        <TbUsersGroup className={`${isOpen ? "" : "hidden"}`}/>
                        <MdKeyboardDoubleArrowRight onClick={() => setIsOpen(!isOpen)} className={`transition-transform duration-500 ml-1 ${isOpen ? "rotate-360" : "rotate-180"} text-[22px] flex md:hidden cursor-pointer`} />
                    </div>
                </header>
                <div className="flex flex-col mt-2 gap-2 overflow-scroll">
                    {userList.map((user: User, index: number) => (
                        <div key={index}  className="flex flex-row items-center gap-1 pl-1 py-2 hover:bg-gray-500 rounded-md">
                            {user.userFoto == null
                                    ? (<GoPerson className="w-10 h-10 rounded-[50%] border p-1 bg-gray-400 text-gray-600"/>)
                                    : (<img className="w-10 h-10 border border-gray-500 rounded-[50%] object-center" src={`http://localhost:3000/uploads/user/${user.userFoto}`} alt="foto"/>)
                            }
                            <p className={`${isOpen ? "block" : "hidden"} text-[14px]`}> {user.username}</p>
                        </div>
                        
                    ))}
                </div>
            </div>
    )
}

export default UserComponent;