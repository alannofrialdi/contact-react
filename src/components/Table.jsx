import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import "../index.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TABLE_HEAD = ["seq", "Name", "Email", "Phone", "Age", "Action", "Detail"];

export default function Table({ filter }) {
  const [data, setData] = useState([]);

  // search data
  const [search, setSearch] = useState("");

  // fetch data
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(filter);

  if (filter === "age") {
    data.sort((a, b) => a.age - b.age);
  } else if (filter === "asc") {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filter === "desc") {
    data.sort((a, b) => b.name.localeCompare(a.name));
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);

        setData((prevData) => prevData.filter((user) => user.id !== id));

        const user = data.find((user) => user.id === id);
        toast.success(`User with name ${user.name} has been deleted`);
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };
  return (
    <>
      <Card
        className="max-w-full max-h-full mb-4 overflow-auto bg-transparent shadow-xl"
        id="card"
      >
        <TableContainer>
          <TableHead />
          <TableBody data={data} search={search} handleDelete={handleDelete} />
          <Caption />
        </TableContainer>
      </Card>
      <Search setSearch={setSearch} />
    </>
  );
}

const TableContainer = ({ children }) => {
  return (
    <table className="w-full min-w-max table-auto text-center border-collapse bg-white bg-opacity-70">
      {children}
    </table>
  );
};

const Search = ({ setSearch }) => {
  return (
    <div className="max-w-md mx-auto mb-2 flex gap-4">
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
          className="peer h-full w-full outline-none text-sm text-gray-900 pr-2 animate-pulse"
          type="text"
          id="search"
          placeholder="Search Contact.."
        />
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead className="bg-gradient-to-r from-indigo-700 to-blue-500 text-white">
      <tr>
        {/* mapping table head */}
        {TABLE_HEAD.map((head) => (
          <th key={head} className="border-b p-4 font-semibold uppercase">
            <Typography variant="small">{head}</Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = ({ data, search, handleDelete }) => {
  // Filter data based on the search input
  const filteredData = data.filter(({ name }) => {
    return search.toLowerCase() === ""
      ? name
      : name.toLowerCase().includes(search);
  });

  return (
    <tbody>
      {/* If no data matches the search query, show a message */}
      {filteredData.length === 0 ? (
        <tr>
          <td
            colSpan={TABLE_HEAD.length}
            className="p-4 text-center text-gray-500"
          >
            Tidak ada nama yang dicari
          </td>
        </tr>
      ) : (
        // Otherwise, map through the filtered data and display the rows
        filteredData.map(({ name, email, phone, age, id }, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
            } hover:bg-blue-50 transition-all`}
          >
            <td>{index + 1}</td>
            <td className="p-4 capitalize">{name || "N/A"}</td>
            <td className="p-4 lowercase">{email || "N/A"}</td>
            <td className="p-4">{phone || "N/A"}</td>
            <td className="p-4">{age || "N/A"}</td>
            <td className="p-4">
              <div className="flex space-x-2">
                <button className="text-green-500 hover:text-green-700">
                  <Link to={`/update/${name}`}>Edit</Link>
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </div>
            </td>
            <td className="p-4">
              <button className="text-indigo-500 hover:text-indigo-700">
                <Link to={`/read/${name}`}>
                  <FaInfoCircle />
                </Link>
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

const Caption = () => {
  return (
    <caption className="caption-bottom font-normal mt-2 text-gray-500 bg-transparent">
      id-ID
    </caption>
  );
};

TableContainer.propTypes;
TableBody.propTypes;
Search.propTypes;
