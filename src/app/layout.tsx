import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { PokemonCountProvider } from "@/contexts/pokemon-count-context";
import BackgroundHeading from "@/components/background-heading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poké - Your Ultimate Online Pokémon Database",
  description: "Third assignment from zing7"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative flex flex-col justify-center items-center h-screen bg-accent overflow-hidden`}
      >
        <BackgroundHeading />
        <PokemonCountProvider>{children}</PokemonCountProvider>
      </body>
    </html>
  );
}
