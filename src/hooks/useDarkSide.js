import { useEffect, useState } from "react";

export default function useDarkSide() {
    let [theme, setTheme] = useState(localStorage.theme)
    let colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        let root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        /// save theme to local storage
        localStorage.setItem('theme', theme);    
    },
    [theme, colorTheme]);
    return [colorTheme, setTheme];
}