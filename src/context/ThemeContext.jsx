import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        const saveTheme =localStorage.getItem("theme");
        if (saveTheme) {
            return saveTheme;
        }
        const userMedia = window.matchMedia("(prefers-color-scheme: dark)").matches;

        return userMedia ? "dark" : "light";
    }
    const [theme, setTheme] = useState(getInitialTheme);
    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};