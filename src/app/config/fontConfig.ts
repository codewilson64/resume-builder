import {
  Poppins,
  Roboto,
  Inter,
  Lora,
  Merriweather,
  Montserrat,
  Open_Sans,
  Source_Sans_3,
  Nunito,
  Playfair_Display,
  Lato,
  Oswald,
  Raleway,
  Ubuntu,
  Work_Sans,
} from "next/font/google";

// Load Google Fonts
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });
const lora = Lora({ subsets: ["latin"], weight: ["400", "600", "700"] });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "500", "700"] });
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600", "700"] });
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"] });
const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

// Map of font classes
export const fontMap = {
  Poppins: poppins.className,
  Roboto: roboto.className,
  Inter: inter.className,
  Lora: lora.className,
  Merriweather: merriweather.className,
  Montserrat: montserrat.className,
  "Open Sans": openSans.className,
  "Source Sans": sourceSans.className,
  Nunito: nunito.className,
  "Playfair Display": playfair.className,
  Lato: lato.className,
  Oswald: oswald.className,
  Raleway: raleway.className,
  Ubuntu: ubuntu.className,
  "Work Sans": workSans.className,
} as const;

// Export type for font names
export type FontName = keyof typeof fontMap;