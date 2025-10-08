import Image from "next/image";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center">
        {/* Main Content */}
        <main className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-8 py-12 lg:py-24 w-full">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pl-12 order-2 lg:order-1">
            <h1 className="font-bold mb-8 leading-tight font-heading">
              <span className="block text-5xl lg:text-6xl mb-3">WELCOME TO THE</span>
              <span className="block text-7xl lg:text-9xl">PORTFOLIO</span>
            </h1>
            <p className="text-lg lg:text-xl text-[var(--foreground)]/80 max-w-md leading-relaxed font-body ml-2">
              Hi there! I&apos;m Earn, a third-year Software and Knowledge Engineering student at Kasetsart University. Pleased to meet you!
            </p>
          </div>

          {/* Computer Illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0 order-1 lg:order-2">
            <Image
              src="/computer.svg"
              alt="Computer Illustration"
              width={500}
              height={400}
              className="w-full max-w-lg h-auto mt-16 lg:mt-20"
              priority
            />
          </div>
        </main>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-heading">
            ABOUT ME
          </h2>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="min-h-screen flex items-center justify-center px-6 lg:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-16 text-center font-heading">
            MY WORK
          </h2>
        </div>
      </section>

      {/* Play Section */}
      <section id="play" className="min-h-screen flex items-center justify-center px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-16 font-heading">
            LET&apos;S PLAY
          </h2>
        </div>
      </section>
    </div>
  );
}
