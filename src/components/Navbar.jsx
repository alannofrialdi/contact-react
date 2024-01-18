import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoIosSunny } from "react-icons/io";
import Heading from "./Heading";

export default function Navbar() {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "light");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`p-4 rounded shadow-slate-400 bg-gradient-to-r from-indigo-700 to-blue-500 ${
        theme === "dark" ? "dark:shadow-none" : "shadow-lg"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Tittle />
        <Mode>
          <Button handleThemeSwitch={handleThemeSwitch} theme={theme} />
        </Mode>
      </div>
    </div>
  );
}

const Mode = ({ children }) => {
  return children;
};

const Tittle = () => {
  return (
    <div className="text-white font-bold text-xl">
      <Heading />
    </div>
  );
};

const Button = ({ handleThemeSwitch, theme }) => {
  return (
    <button
      className="bg-white text-blue-500 font-bold py-2 px-4 border rounded-lg"
      onClick={handleThemeSwitch}
    >
      {theme === "dark" ? <Light /> : <Dark />}
    </button>
  );
};

const Light = () => {
  return (
    <>
      <IoIosSunny className="inline-block mr-2" />
      Light
    </>
  );
};

const Dark = () => {
  return (
    <>
      <BsFillMoonStarsFill className="inline-block mr-2" />
      Dark
    </>
  );
};

Button.propTypes;
