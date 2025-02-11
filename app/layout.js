
import { Baloo_Bhai_2 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata= {
  title: "Popcorn Picks | Discover Movies with Next-Gen Search",
  description: "Discover your next favorite movie with Popcorn Picks. A modern movie search app built with Next.js and Tailwind CSS. Search films, view ratings, and explore detailed information powered by real-time TMDB data. Responsive, fast, and user-friendly.",
};

const balooBhai = Baloo_Bhai_2({
  subsets: ["latin"],
  display: "swap",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${balooBhai.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

