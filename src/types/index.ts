// Type definitions for the portfolio application

export interface NavItem {
  name: string;
  path: string;
}

export interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}