"use client";
import { Mail, Phone, MapPin } from "lucide-react";

export default function BudapestTemplate() {
  return (
      <div
        className="bg-white shadow-xl grid grid-cols-[220px_1fr]"
        style={{
          width: "794px",
          minHeight: "1123px",
        }}
      >
        {/* ---------- LEFT SIDEBAR ---------- */}
        <aside className="bg-[#3e3e3e] text-white p-6 space-y-8">

          {/* ABOUT */}
          <section className="border-b border-white/30 pb-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-3">
              About Me
            </h2>
            <p className="text-xs leading-relaxed text-gray-200">
              Arigatou gozaimashita!!! Passionate software engineer with strong
              management and leadership experience.
            </p>
          </section>

          {/* LINKS */}
          <section className="border-b border-white/30 pb-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-3">
              Social Links
            </h2>
            <p className="text-xs text-gray-200">
              <span className="font-semibold block">Instagram</span>
              <span className="text-gray-300">instagram.com/manda</span>
            </p>
          </section>

          {/* LANGUAGES */}
          <section className="border-b border-white/30 pb-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-3">
              Languages
            </h2>
            <ul className="text-xs text-gray-200 space-y-2">
              <li>English</li>
              <li>Mandarin</li>
              <li>Russian</li>
            </ul>
          </section>


          {/* PERSONAL DETAILS */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-3">
              Personal Details
            </h2>
            <div className="text-xs text-gray-200 space-y-2">
              <p>
                <span className="font-semibold block">Date of Birth</span> 
                <span>21/21/2003</span>
              </p>
              <p>
                <span className="font-semibold block">Nationality</span> 
                <span>Japan</span>
              </p>
              <p>
                <span className="font-semibold block">Marital Status</span> 
                <span>Single</span>
              </p>
            </div>
          </section>
        </aside>

        {/* ---------- RIGHT MAIN CONTENT ---------- */}
        <main className="bg-[#c2c1c1] py-8 px-5 space-y-10">

          {/* NAME + TITLE */}
          <header className="flex flex-row items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 uppercase leading-tight">
                <span className="block">Manda</span>
                <span className="block">Kinari</span>
              </h1>

              <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">
                Software Engineer
              </p>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col gap-1 text-gray-600 text-xs">  
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                  <MapPin size={13} />
                </div>
                <span className="leading-snug">
                  Jalan Bunga Kinari No.7, Medan, 12345, Japan
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                  <Phone size={13} />
                </div>
                <span>122233344455</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                  <Mail size={13} />
                </div>
                <span>wilsongambit13@gmail.com</span>
              </div>

            </div>
          </header>


          {/* WORK EXPERIENCE */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-700 border-b pb-2">
              Work Experience
            </h2>

            <div className="mt-6 space-y-2">

              {/* ITEM 1 */}
              <div className="grid grid-cols-[140px_20px_1fr] gap-4">

                {/* LEFT: COMPANY */}
                <div>
                  <p className="font-semibold text-sm uppercase">PT Himalaya</p>
                  <p className="text-xs text-gray-500">California</p>
                  <p className="text-[11px] text-gray-400">
                    Jan 2025 - Feb 2025
                  </p>
                </div>

                {/* MIDDLE: DOT + LINE */}
                <div className="relative flex justify-center">
                  {/* DOT */}
                  <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute top-1" />
                  {/* LINE */}
                  <span className="w-[1px] bg-gray-300 h-full mt-2" />
                </div>

                {/* RIGHT: POSITION */}
                <div>
                  <p className="font-semibold text-sm">Software Engineer</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Developed scalable applications and improved backend API
                    performance.
                  </p>
                </div>

              </div>

              {/* ITEM 2 */}
              <div className="grid grid-cols-[140px_20px_1fr] gap-4">

                {/* LEFT: COMPANY */}
                <div>
                  <p className="font-semibold text-sm uppercase">Facebook</p>
                  <p className="text-xs text-gray-500">Tokyo</p>
                  <p className="text-[11px] text-gray-400">
                    Jan 2025 - May 2025
                  </p>
                </div>

                {/* MIDDLE: DOT + LINE */}
                <div className="relative flex justify-center">
                  {/* DOT */}
                  <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute top-1" />
                  {/* LINE */}
                  <span className="w-[1px] bg-gray-300 h-full" />
                </div>

                {/* RIGHT: POSITION */}
                <div>
                  <p className="font-semibold text-sm">Manager</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Managed engineering teams and delivered successful digital
                    campaigns.
                  </p>
                </div>

              </div>

            </div>
          </section>


          {/* EDUCATION */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-700 border-b pb-2">
              Education
            </h2>

            <div className="mt-6 space-y-2">

              {/* ITEM 1 */}
              <div className="grid grid-cols-[140px_20px_1fr] gap-4">

                {/* LEFT: COMPANY */}
                <div>
                  <p className="font-semibold text-sm uppercase">Kawaii University</p>
                  <p className="text-xs text-gray-500">California</p>
                  <p className="text-[11px] text-gray-400">
                    Jan 2025 - Feb 2025
                  </p>
                </div>

                {/* MIDDLE: DOT + LINE */}
                <div className="relative flex justify-center">
                  {/* DOT */}
                  <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute top-1" />
                  {/* LINE */}
                  <span className="w-[1px] bg-gray-300 h-full mt-2" />
                </div>

                {/* RIGHT: POSITION */}
                <div>
                  <p className="font-semibold text-sm">Bachelor of Art</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Developed scalable applications and improved backend API
                    performance.
                  </p>
                </div>

              </div>

              {/* ITEM 2 */}
              <div className="grid grid-cols-[140px_20px_1fr] gap-4">

                {/* LEFT: COMPANY */}
                <div>
                  <p className="font-semibold text-sm uppercase">Kawaii University</p>
                  <p className="text-xs text-gray-500">Tokyo</p>
                  <p className="text-[11px] text-gray-400">
                    Jan 2025 - May 2025
                  </p>
                </div>

                {/* MIDDLE: DOT + LINE */}
                <div className="relative flex justify-center">
                  {/* DOT */}
                  <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute top-1" />
                  {/* LINE */}
                  <span className="w-[1px] bg-gray-300 h-full" />
                </div>

                {/* RIGHT: POSITION */}
                <div>
                  <p className="font-semibold text-sm">Computer science</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Managed engineering teams and delivered successful digital
                    campaigns.
                  </p>
                </div>

              </div>

            </div>
          </section>


          {/* SKILLS */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-700 border-b pb-2">
              Skills
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5 text-xs uppercase text-gray-700">

              {/* LEFT COLUMN */}
              <div>
                <span className="block mb-1">Art</span>
                <div className="w-full h-1.5 bg-gray-200">
                  <div className="h-1.5 bg-gray-700" style={{ width: "80%" }} />
                </div>
              </div>

              <div>
                <span className="block mb-1">Creativity</span>
                <div className="w-full h-1.5 bg-gray-200">
                  <div className="h-1.5 bg-gray-700" style={{ width: "85%" }} />
                </div>
              </div>

              <div>
                <span className="block mb-1">Swimming</span>
                <div className="w-full h-1.5 bg-gray-200">
                  <div className="h-1.5 bg-gray-700" style={{ width: "70%" }} />
                </div>
              </div>

              <div>
                <span className="block mb-1">Teamwork</span>
                <div className="w-full h-1.5 bg-gray-200">
                  <div className="h-1.5 bg-gray-700" style={{ width: "90%" }} />
                </div>
              </div>

              <div>
                <span className="block mb-1">Running</span>
                <div className="w-full h-1.5 bg-gray-200">
                  <div className="h-1.5 bg-gray-700" style={{ width: "95%" }} />
                </div>
              </div>

              <div>
                <span className="block mb-1">Leadership</span>
                <div className="w-full h-1.5 bg-gray-200">
                  <div className="h-1.5 bg-gray-700" style={{ width: "75%" }} />
                </div>
              </div>

            </div>
          </section>

          {/* HOBBIES */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-700 border-b pb-2">
              Hobbies
            </h2>

            <div className="flex items-center gap-3 mt-4 text-xs uppercase text-gray-600">
              <span>Art</span>

              <span className="w-1.5 h-1.5 bg-gray-700 rounded-full" />

              <span>Swimming</span>

              <span className="w-1.5 h-1.5 bg-gray-700 rounded-full" />

              <span>Running</span>
            </div>
          </section>

        </main>
      </div>
  );
}
