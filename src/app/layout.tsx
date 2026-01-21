import "./globals.css";
import "./styles/print.css"
import { Poppins } from "next/font/google";
import { ResumeProvider } from "./context/ResumeContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins", // optional but recommended
  display: "swap",
});

export const metadata = {
  title: "ConfidenCV",
  description: "Resume Builder",
  icons: {
    icon: "/confidencv_favicon.svg"
  }
};

export default function RootLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
