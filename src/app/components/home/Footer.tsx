import Link from "next/link";
import Image from "next/image";
import logo from '../../../../public/karierly_logo.png'


export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          {/* Logo + Brand */}
          <div className="flex items-center">
            <Image
              src={logo}
              width={50}
              height={50}
              alt="Karierly logo"
            />
            <span className="text-lg font-bold text-gray-900">
              Karierly
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6 text-sm text-gray-600">
            <Link
              href="/terms-and-conditions"
              className="hover:text-gray-900 transition"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy-policy"
              className="hover:text-gray-900 transition"
            >
              Privacy Policy
            </Link>

              <Link
                href="/payment"
                className="hover:text-gray-900 transition"
              >
                Pricing
              </Link>

            <a
              href="mailto:wilsonnn948@gmail.com"
              className="hover:text-gray-900 transition"
            >
              Contact Us
            </a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-xs text-gray-400">
          © {new Date().getFullYear()} Karierly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
