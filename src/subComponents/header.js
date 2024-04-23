import react from "react";

function Header() {
  return (
    <div className="flex no-scrollbar justify-between py-4 px-16 border box-border">
      <div>logo</div>
      <div className="flex  gap-x-7 items-center">
        <div className="h-10 w-10 ">
          <img src="\half-moon.png"></img>
        </div>
        <div className="h-10 w-10">
          <img src="\hamburger.png"></img>
        </div>
      </div>
    </div>
  );
}

export default Header;
