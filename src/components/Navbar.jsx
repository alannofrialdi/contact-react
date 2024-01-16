import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoIosSunny } from "react-icons/io";

function Navbar() {
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
      className={`bg-blue-500 p-4 rounded shadow-slate-400 shadow-lg ${
        theme === "dark" ? "dark:shadow-none" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Contact App</div>

        <button
          className="bg-white text-blue-500 font-bold py-2 px-4 border rounded-lg"
          onClick={handleThemeSwitch}
        >
          {theme === "dark" ? (
            <>
              <IoIosSunny className="inline-block mr-2" />
              Light
            </>
          ) : (
            <>
              <BsFillMoonStarsFill className="inline-block mr-2" />
              Dark
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
