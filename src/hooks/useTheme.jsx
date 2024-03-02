import { useEffect,useState } from 'react';

const useTheme = () => {
 const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
 );

 useEffect(() => {
    localStorage.setItem('theme', theme);
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
 }, [theme]);

 const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
 };

 return { theme, toggleTheme };
};

export default useTheme;
