import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Read() {
  const [data, setData] = useState({});
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?name=${name}`
        );
        setData(response.data[0]); // first result [0]
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  return (
    <>
      <div className="mt-40 w-72 h-80 mx-auto bg-gray-100 rounded-xl shadow-2xl">
        <div className="flex items-center p-3">
          <div className="px-1">
            <span className="w-4 h-4 rounded-full inline-block bg-red-500 cursor-pointer"></span>
          </div>
          <div className="px-1">
            <span className="w-4 h-4 rounded-full inline-block bg-yellow-400 cursor-pointer"></span>
          </div>
          <div className="px-1">
            <span className="w-4 h-4 rounded-full inline-block bg-green-500 cursor-pointer"></span>
          </div>
        </div>
        <div className="pl-4 mt-2">
          {data ? <UserInfo data={data} /> : <EmptyMessage />}
          <span className="block sm:inline-block">
            <Link
              to={"/"}
              className="font-light text-blue-700 hover:text-blue-900"
            >
              &lArr; back to contact
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

function UserInfo({ data }) {
  return (
    <>
      <h3 className="text-xl font-bold mb-2 text-slate-900">{data.name}</h3>
      <p className="text-gray-600 mb-2 sm:mb-4">Email: {data.email}</p>
      <p className="text-gray-600 mb-2 sm:mb-4">Phone: {data.phone}</p>
      <p className="text-gray-600 mb-2 sm:mb-4">Age: {data.age}</p>
      <p className="text-gray-600 mb-2 sm:mb-4">ID: {data.id}</p>
    </>
  );
}

function EmptyMessage() {
  return (
    <p className="text-gray-600">No data available for the provided name.</p>
  );
}

UserInfo.propTypes;
export default Read;
