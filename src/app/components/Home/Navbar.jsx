"use client";

import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Pages where login button should be hidden
  const hideButton = pathname === "/login" || pathname === "/signup";

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

        {/* Login Button (Hidden on login/signup pages) */}
        {!hideButton && (
          <button
            onClick={() => router.push("/login")}
            className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
