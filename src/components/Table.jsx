import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import "../index.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Name", "Email", "Phone", "Age", "Action", "Detail"];

export default function Table({ data, setData, search }) {
  // fetch data

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        // delete by id
        await axios.delete(`http://localhost:3000/users/${id}`);

        // update state by filtering out the deleted user
        setData((prevData) => prevData.filter((user) => user.id !== id));

        toast.success(`User with ID ${id} has been deleted`);
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
  return (
    <tbody>
      {/* mapping through the array of index to display data to the table */}
      {data
        .filter(({ name }) => {
          return search.toLowerCase() === ""
            ? name
            : name.toLowerCase().includes(search);
        })
        .map(({ name, email, phone, age, id }, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
            } hover:bg-gray-200 transition-all`}
          >
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
        ))}
    </tbody>
  );
};

const Caption = () => {
  return (
    <caption className="italic caption-bottom font-normal mt-2 text-gray-500 bg-transparent dark:bg-gradient-to-r from-indigo-700 to-blue-500 dark:text-white">
      id-ID
    </caption>
  );
};

Table.propTypes;
TableContainer.propTypes;
TableBody.propTypes;
