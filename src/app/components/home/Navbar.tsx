"use client";

import Image from "next/image";
import logo from "../../../../public/karierly_logo.png"
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Pages where navbar buttons should be hidden
  const hideButton = pathname === "/login" || pathname === "/signup";
  const hideNavbar = pathname.startsWith("/resume");

  if (hideNavbar) return null;

  return (
    <nav className="w-full absolute top-0 left-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={logo}
            alt="Karierly logo"
            width={55}
            height={55}
            priority
          />

          <h1 className="text-xl font-bold">
            Karierly
          </h1>
        </div>

        {/* Hide buttons on login/signup routes */}
        {!hideButton && (
          <>
            <button
              onClick={() => router.push("/login")}
              className="text-sm text-white bg-cyan-400 rounded-full px-6 py-3"
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
