import { Link } from "react-router-dom";
import Table from "./Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }, 1500);
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
    <div className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer aspect-auto">
      <Link to="/create">add contact</Link>
    </div>
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
    <div className="flex flex-row gap-2 justify-center items-center absolute top-2/4 left-2/4">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}

Body.propTypes = {
  data: PropTypes.array.isRequired,
};
