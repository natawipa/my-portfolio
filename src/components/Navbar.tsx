"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/#home" },
  { name: "About", path: "/#about" },
  { name: "Work", path: "/#work" },
  { name: "Play", path: "/#play" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("/#home");

  const { theme, setTheme } = useTheme();

  // Initialize component and setup scroll listener
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Setup intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setActiveSection(`/#${id}`);
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -40% 0px",
        threshold: 0.15,
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Handle keyboard events for theme toggle
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

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
          {/* Logo */}
          <Link href="/#home" className="hover:opacity-80 transition-opacity mr-16">
            <Image
              src={theme === "dark" ? "/logo_dm.svg" : "/logo_lm.svg"}
              alt="Earn Logo"
              width={120}
              height={30}
              className="transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12 flex-1">
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
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Theme Toggle */}
            <div
              role="button"
              tabIndex={0}
              aria-label="Toggle theme"
              className="relative p-2 rounded-md text-[var(--foreground)] hover:bg-[var(--background)] cursor-pointer"
              style={{ transition: "none" }}
              onClick={toggleTheme}
              onKeyDown={handleKeyDown}
            >
              <div className="relative w-6 h-6 overflow-hidden">
                {theme === "dark" ? (
                  <div className="absolute inset-0 animate-in slide-in-from-left duration-300">
                    <Image 
                      src="/sun.svg" 
                      alt="Sun" 
                      width={24} 
                      height={24} 
                      className="w-6 h-6" 
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 animate-in slide-in-from-right duration-300">
                    <Image 
                      src="/moon.svg" 
                      alt="Moon" 
                      width={24} 
                      height={24} 
                      className="w-6 h-6" 
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[var(--foreground)] hover:bg-[var(--foreground)]/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
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
  );
}