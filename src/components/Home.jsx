import { Link } from "react-router-dom";
import Table from "./Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    });
  }, []); // empty dependency array means it runs once after the initial render

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Body data={data} />
        </>
      )}
    </>
  );
}

function Body({ data }) {
  return (
    <div className="mt-8 flex flex-col justify-center min-h-full min-w-full items-center gap-8">
      <AddContact />
      {data.length === 0 ? <EmptyMessage /> : <Table />}
    </div>
  );
}

function AddContact() {
  return (
    <button className="overflow-hidden relative w-32 p-2 h-12 bg-gradient-to-r from-indigo-700 to-blue-500 text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">
      <Link to="/create">Add</Link>
      <span className="absolute w-36 h-32 -top-8 -left-1 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
      <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-5 z-10">
        <Link to="/create">Contact</Link>
      </span>
    </button>
  );
}

function EmptyMessage() {
  return (
    <div className="text-red-500 animate-pulse">
      The contact is empty, please add a contact first
    </div>
  );
}

function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0">
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div
          className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"
          style={{ animationDelay: "-0.3s" }}
        ></div>
        <div
          className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"
          style={{ animationDelay: "-0.5s" }}
        ></div>
      </div>
    </div>
  );
}

Body.propTypes = {
  data: PropTypes.array.isRequired,
};
