const About = () => {
    return (
        <div className="h-[85vh] flex flex-col items-center bg-[#16161a] text-[#fffffe] p-8 mt-3">
            <div className="max-w-2xl text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-50">Hakkımızda</h1>
                <p className=" leading-relaxed mb-6 ">
                    Bu uygulama, kullanıcıların daha hızlı ve kolay bir şekilde iletişim kurabilmeleri için geliştirilmiştir.
                    Amacımız, modern teknolojileri kullanarak güvenilir ve kullanıcı dostu bir deneyim sunmaktır.
                </p>
                <p className=" leading-relaxed">
                    Ekibimiz sürekli olarak sistemi geliştirmeye devam ediyor. Siz değerli kullanıcılarımızın geri
                    bildirimleriyle daha iyi bir hale geliyoruz.
                </p>
            </div>
        </div>
    );
};

export default About;
