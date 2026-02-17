
const Loader = () => {
  return (
    <div className="flex flex-row gap-2 mx-auto items-center justify-center fixed transition left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-4 h-4 rounded-full bg-[#94a1b2] animate-bounce"></div>
      <div
        className="w-4 h-4 rounded-full bg-[#94a1b2] animate-bounce"
        style={{ animationDelay: '-0.3s' }}
      ></div>
      <div
        className="w-4 h-4 rounded-full bg-[#94a1b2] animate-bounce"
        style={{ animationDelay: '-0.5s' }}
      ></div>
    </div>
  );
};

export default Loader;
