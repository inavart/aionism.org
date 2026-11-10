"use client";

import * as React from "react";

type Theme = "day" | "void";

const ThemeContext = React.createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({
    theme: "day",
    toggleTheme: () => { },
});

export const useTheme = () => React.useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = React.useState<Theme>("day");

    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "day" ? "void" : "day";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
