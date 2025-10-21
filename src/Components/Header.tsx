export default function Header() {
  return (
    <div className="fixed top-[15px] left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center bg-white rounded-full md:px-4 px-2 py-2 shadow-md">
        <img
          src="/logo.png"
          alt="Logo"
          className="md:h-[30px] h-[20px] w-auto rounded-full md:mr-3 mr-1"
        />
        <span className="text-[12px] md:text-base text-[#C78E2D] font-semibold whitespace-nowrap uppercase">
          ASC UI/UX Portfolio
        </span>
      </div>
    </div>
  );
}
