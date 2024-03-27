import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="w-[1440px] h-20 flex items-center justify-center md:justify-between px-14 ">
      <div className=" items-center gap-3 hidden md:flex">
        <span className="h-12 w-12 bg-purple-500 rounded-full "></span>
        <h3 className="font-mono font-bold text-lg ">Pratham</h3>
      </div>
      <nav className="flex items-center gap-x-10">
        <Link href={"/add-blog"} className="font-medium text-base">
          Create
        </Link>
        <Link href={"/blog"} className="font-medium text-base">
          Blog
        </Link>
        <Link
          href={"https://pratham-port.vercel.app/"}
          className="font-medium text-base"
          target="_blank"
        >
          Portfolio
        </Link>
        <Link
          href={"https://pratham-port.vercel.app/#service"}
          className="font-medium text-base"
          target="_blank"
        >
          about
        </Link>
      </nav>
    </header>
  );
};

export default Header;
