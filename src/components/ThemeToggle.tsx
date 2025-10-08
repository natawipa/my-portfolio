"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none"
      style={{ 
        backgroundColor: isDark ? "#171616" : "#fff9f9",
        border: `2px solid ${isDark ? "#fff9f9" : "#171616"}`,
        boxShadow: 'none'
      }}
      onFocus={(e) => {
        e.target.style.boxShadow = `0 0 0 1px ${isDark ? "#fff9f9" : "#171616"}20`;
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = 'none';
      }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.95 }}
    >
      {/* Sliding toggle */}
      <motion.div
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full"
        style={{ 
          backgroundColor: isDark ? "#fff9f9" : "#171616" 
        }}
        animate={{
          x: isDark ? 32 : 4
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        {/* Icon */}
        <div className="w-3 h-3">
          {isDark ? (
            <Moon 
              size={12}
              className="w-3 h-3" 
              color={isDark ? "#171616" : "#fff9f9"}
              fill={isDark ? "#171616" : "#fff9f9"}
            />
          ) : (
            <Sun 
              size={12}
              className="w-3 h-3" 
              color={isDark ? "#171616" : "#fff9f9"}
              fill={isDark ? "#171616" : "#fff9f9"}
            />
          )}
        </div>
      </motion.div>

      {/* Static background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <div className="w-3 h-3 opacity-30">
          <Sun 
            size={12}
            className="w-3 h-3" 
            color={isDark ? "#fff9f9" : "#171616"}
            fill={isDark ? "#fff9f9" : "#171616"}
          />
        </div>
        <div className="w-3 h-3 opacity-30">
          <Moon 
            size={12}
            className="w-3 h-3" 
            color={isDark ? "#fff9f9" : "#171616"}
            fill={isDark ? "#fff9f9" : "#171616"}
          />
        </div>
      </div>
    </motion.button>
  );
}