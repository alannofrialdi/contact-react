import { Link } from "react-router-dom";
import Table from "./Table";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Home() {
  const [data, setData] = useState([]);

  // fetch data
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <Body data={data} />
    </>
  );
}

function Body({ data }) {
  return (
    <div className="mt-8 flex flex-col justify-center min-h-full min-w-full items-center gap-8">
      <div className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer">
        <Link to="/create">add contact</Link>
      </div>
      {data.length === 0 ? (
        <div className="text-red-500">
          The contact is empty, please add a contact first
        </div>
      ) : (
        <Table />
      )}
    </div>
  );
}

Body.propTypes;
