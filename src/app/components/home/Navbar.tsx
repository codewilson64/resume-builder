"use client";

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
        <h1 
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          ResumeBuilder
        </h1>

        {/* Hide buttons on login/signup routes */}
        {!hideButton && (
          <>
            <button
              onClick={() => router.push("/login")}
              className="text-sm text-white bg-orange-500 rounded-full px-6 py-3"
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
