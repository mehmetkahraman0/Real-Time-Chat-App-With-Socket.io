import svg1 from "../../assets/undraw_respond_o54z.svg"
import svg2 from "../../assets/undraw_chatting_5u5z.svg"

const Home = () => {
    return (
        <div className=" flex flex-col items-center justify-center rounded-md gap-1">
            <div className="bg-[#16161a] w-full flex flex-row justify-center items-center md:items-end gap-8 flex-wrap border-b-2 m-2 px-1 py-5 rounded-md shadow-lg">
                <img className="sm:w-120 lg:w-160 xl:w-170" src={svg1} alt="svg" />
                <div className="text-[#94a1b2] flex flex-col items-end justify-end md:ml-[-270px]">
                    <p className=" text-center mb-[-10px] text-[36px] font-medium size-fit self-center md:self-end text-shadow-sm text-shadow-white">Eglenceli Grup Sohbetlerine</p>
                    <p className=" text-[50px] font-semibold self-center md:self-end text-shadow-sm text-shadow-white">Hoşgeldiniz</p>
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-center  gap-8 bg-[#16161a] w-full py-5 px-1 rounded-md border-b-2 shadow-lg">
                <img className="sm:w-100 lg:w-130 xl:w-150" src={svg2} alt="svg" />
                <div className="flex flex-row flex-wrap justify-center items-center">
                    <p className="text-[#94a1b2] max-w-70 text-[18px] tracking-wider font-light">Topluluğunu kanallara ayır, her konu için ayrı alan, her ekip için özel oda, konu bazlı kanallar ile akış düzenli kalsın, özel odalarda derinleş. Sessiz kalmak, sadece okumak ya da sözü devralmak - kontrol sende.</p>
                </div>
            </div>
            <footer className="bg-[#16161a] w-full py-6 my-6 rounded-md shadow-inner">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-[#94a1b2]">
                    <p className="text-sm">© {new Date().getFullYear()} Chatting.com Tüm hakları saklıdır.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="/" className="hover:text-white">Ana Sayfa</a>
                        <a href="/hakkımızda" className="hover:text-white">Hakkında</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home