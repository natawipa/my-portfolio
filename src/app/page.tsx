"use client";

import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { WordsPullUp } from "@/components/WordsPullUp";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center">
        {/* Main Content */}
        <main className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 xl:px-16 py-12 lg:py-24 w-full max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pl-12 order-2 lg:order-1 text-center lg:text-left">
            <div className="font-bold mb-8 leading-tight font-heading">
              <WordsPullUp 
                text="WELCOME TO THE" 
                className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl mb-2 whitespace-nowrap"
                align="responsive"
              />
              <WordsPullUp 
                text="PORTFOLIO" 
                className="text-7xl sm:text-8xl md:text-8xl lg:text-8xl xl:text-[8rem] 2xl:text-[10rem] whitespace-nowrap"
                align="responsive"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-[var(--foreground)]/80 max-w-md mx-auto lg:mx-0 leading-relaxed font-body">
              Hi there! I&apos;m Earn, a third-year Software and Knowledge Engineering student at Kasetsart University. Pleased to meet you!
            </p>
          </div>

          {/* Computer Illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0 order-1 lg:order-2">
            <Image
              src={theme === "dark" ? "/com_dm.svg" : "/com_lm.svg"}
              alt="Computer workstation illustration showing modern development setup"
              width={500}
              height={400}
              className="w-full max-w-lg h-auto mt-16 lg:mt-20 transition-opacity duration-300"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </main>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 lg:px-12 xl:px-16 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <WordsPullUp 
            text="ABOUT ME" 
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold mb-8 font-heading whitespace-nowrap"
          />
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="min-h-screen flex items-center justify-center px-6 lg:px-12 xl:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <WordsPullUp 
            text="MY WORK" 
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold mb-16 text-center font-heading whitespace-nowrap"
          />
        </div>
      </section>

      {/* Play Section */}
      <section id="play" className="min-h-screen flex items-center justify-center px-6 lg:px-12 xl:px-16 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <WordsPullUp 
            text="LET'S PLAY" 
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold mb-16 font-heading whitespace-nowrap"
          />
        </div>
      </section>
    </div>
  );
}
