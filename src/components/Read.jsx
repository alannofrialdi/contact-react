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
        setData(response.data[0]); // Assuming the API returns an array, and you want the first result
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md mt-10 sm:mt-20 md:mt-40">
      <div className="p-6">
        {data ? (
          <>
            <h3 className="text-xl font-bold mb-2 text-slate-900">
              {data.name}
            </h3>
            <p className="text-gray-600 mb-2 sm:mb-4">Email: {data.email}</p>
            <p className="text-gray-600 mb-2 sm:mb-4">Phone: {data.phone}</p>
            <p className="text-gray-600 mb-2 sm:mb-4">Age: {data.age}</p>
            <p className="text-gray-600 mb-2 sm:mb-4">ID: {data.id}</p>
          </>
        ) : (
          <p className="text-gray-600">
            No data available for the provided name.
          </p>
        )}
        <span className="block sm:inline-block mt-4">
          <Link
            to={"/"}
            className="font-light text-blue-700 hover:text-blue-400"
          >
            &lArr; back to contact
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Read;
