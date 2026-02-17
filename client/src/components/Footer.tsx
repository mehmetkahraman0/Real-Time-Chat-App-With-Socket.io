const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo */}
        <h2 className="text-lg font-semibold">MyApp</h2>

        {/* Linkler */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/" className="hover:text-white">Ana Sayfa</a>
          <a href="/about" className="hover:text-white">Hakkında</a>
          <a href="/contact" className="hover:text-white">İletişim</a>
        </div>

        {/* Telif */}
        <p className="text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} MyApp. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
