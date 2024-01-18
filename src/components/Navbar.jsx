import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoIosSunny } from "react-icons/io";
import Heading from "./Heading";

export default function Navbar({ setSearch }) {
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
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Tittle />
        <Search setSearch={setSearch} />
        <Mode>
          <Button handleThemeSwitch={handleThemeSwitch} theme={theme} />
        </Mode>
      </div>
    </div>
  );
}

const Search = ({ setSearch }) => {
  return (
    <div className="w-full md:max-w-md mx-4 md:mx-0 my-2 md:my-0 md:mr-14">
      <div className="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
          className="peer h-full w-full outline-none text-sm text-gray-900 pr-2 animate-pulse focus:animate-none"
          type="text"
          id="search"
          placeholder="Search Contact.."
        />
      </div>
    </div>
  );
};

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
      className="bg-white text-blue-500 font-bold py-2 px-4 border rounded-lg w-full md:w-auto my-2 md:my-0"
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

Navbar.propTypes;
Button.propTypes;
Search.propTypes;
