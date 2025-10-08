"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Home", path: "/#home" },
  { name: "About", path: "/#about" },
  { name: "Work", path: "/#work" },
  { name: "Play", path: "/#play" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("/#home")

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id")
            if (id) {
              setActiveSection(`/#${id}`)
            }
          }
        })
      },
      {
        rootMargin: "0px 0px -40% 0px", // adjust when to trigger
        threshold: 0.15,
      }
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[var(--background)]/80 backdrop-blur-md shadow-sm border-b border-[var(--foreground)]/20"
          : "bg-transparent"
      )}
    >
      <div className="w-full px-6 lg:px-8 pt-2 pb-2">
        <div className="flex h-20 items-center">
          {/* Logo positioned more to the left corner */}
          <Link href="/#home" className="hover:opacity-80 transition-opacity mr-16">
            <Image
              src="/earn.svg"
              alt="Earn Logo"
              width={120}
              height={30}
              className={theme === "light" ? "invert" : ""}
              priority
            />
          </Link>

          {/* Navigation menu positioned to the left */}
          <div className="hidden md:flex items-center space-x-12 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-[var(--foreground)] font-body uppercase tracking-wider",
                  activeSection === item.path
                    ? "text-[var(--foreground)] font-bold"
                    : "text-[var(--foreground)]/70"
                )}
              >
                {item.name}
                {activeSection === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme toggle and mobile menu positioned to the right */}
          <div className="flex items-center space-x-4 ml-auto">
            <button
              aria-label="Toggle theme"
              className="relative p-2 rounded-md text-[var(--foreground)] hover:bg-[var(--foreground)]/10 transition-all duration-300"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <div className="relative w-6 h-6">
                {/* Moon Icon (Night Mode) */}
                <svg 
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                    theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
                  }`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 50 50"
                  fill="currentColor"
                >
                  <path d="M41.18,25.7c-.61-.27-1.32-.11-1.75.4-1.41,1.65-3.27,2.74-5.38,3.15-5.15,1.01-10.15-2.35-11.16-7.49-.89-4.52,1.58-9.01,5.88-10.68.62-.24,1.01-.86.95-1.52-.06-.66-.54-1.21-1.19-1.34-2.23-.46-4.5-.47-6.75-.03-9.27,1.82-15.34,10.85-13.51,20.12.88,4.49,3.46,8.37,7.26,10.92,2.86,1.92,6.15,2.92,9.52,2.92,1.11,0,2.23-.11,3.34-.33,7.21-1.41,12.7-7.26,13.67-14.55.09-.66-.27-1.3-.87-1.57Z" />
                </svg>
                
                {/* Sun Icon (Light Mode) */}
                <svg 
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                    theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                  }`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 50 50"
                  fill="currentColor"
                >
                  <path d="M25,10.61c-7.93,0-14.39,6.45-14.39,14.39s6.45,14.39,14.39,14.39,14.39-6.45,14.39-14.39-6.46-14.39-14.39-14.39Z" />
                  <path d="M25,7.07c1.1,0,2-.9,2-2v-2.77c0-1.1-.9-2-2-2s-2,.9-2,2v2.77c0,1.1.9,2,2,2Z" />
                  <path d="M9.49,12.32c.39.39.9.59,1.41.59s1.02-.2,1.41-.59c.78-.78.78-2.05,0-2.83l-1.96-1.96c-.78-.78-2.05-.78-2.83,0-.78.78-.78,2.05,0,2.83l1.96,1.96Z" />
                  <path d="M5.07,23h-2.77c-1.1,0-2,.9-2,2s.9,2,2,2h2.77c1.1,0,2-.9,2-2s-.9-2-2-2Z" />
                  <path d="M9.49,37.68l-1.96,1.96c-.78.78-.78,2.05,0,2.83.39.39.9.59,1.41.59s1.02-.2,1.41-.59l1.96-1.96c.78-.78.78-2.05,0-2.83-.78-.78-2.05-.78-2.83,0Z" />
                  <path d="M25,42.93c-1.1,0-2,.9-2,2v2.77c0,1.1.9,2,2,2s2-.9,2-2v-2.77c0-1.1-.9-2-2-2Z" />
                  <path d="M40.51,37.68c-.78-.78-2.05-.78-2.83,0-.78.78-.78,2.05,0,2.83l1.96,1.96c.39.39.9.59,1.41.59s1.02-.2,1.41-.59c.78-.78.78-2.05,0-2.83l-1.96-1.96Z" />
                  <path d="M47.7,23h-2.77c-1.1,0-2,.9-2,2s.9,2,2,2h2.77c1.1,0,2-.9,2-2s-.9-2-2-2Z" />
                  <path d="M39.09,12.91c.51,0,1.02-.2,1.41-.59l1.96-1.96c.78-.78.78-2.05,0-2.83-.78-.78-2.05-.78-2.83,0l-1.96,1.96c-.78.78-.78,2.05,0,2.83.39.39.9.59,1.41.59Z" />
                </svg>
              </div>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[var(--foreground)] hover:bg-[var(--foreground)]/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
        }}
        className={cn(
          "absolute top-24 left-0 right-0 bg-[var(--background)]/95 backdrop-blur-md shadow-lg md:hidden border-b border-[var(--foreground)]/20",
          !isMobileMenuOpen && "hidden"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "block py-2 text-sm font-medium transition-colors hover:text-[var(--foreground)] font-body",
                activeSection === item.path
                  ? "text-[var(--foreground)] font-bold"
                  : "text-[var(--foreground)]/70"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}