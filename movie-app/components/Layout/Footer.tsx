// footer containing the copyright information
// footer should always be at the bottom of the page
import React from 'react';
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas", // Optional CSS variable
});


export default function Footer() {
  return (
    <footer className={`bg-gray-800 scale-120 text-white py-4 text-center w-full sticky ${bebas.className}`}>
      <p>&copy; {new Date().getFullYear()} Movie App. All rights reserved.</p>
    </footer>
  );
}