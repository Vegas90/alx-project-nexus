// movie-app/components/Layout.tsx

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas", // Optional CSS variable
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar/>
      <main className={bebas.className}>
        {children}
        </main>
      <Footer />
    </>
  );
}