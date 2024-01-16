import { useEffect } from "react";
import Heading from "./Heading";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { users } from "../assets/data/db.json";

const useFormData = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    prevName: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "hidden") {
      setData({
        ...data,
        prevName: e.target.value,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  return { data, handleChange, setData };
};

const useValidation = (data) => {
  const validateForm = () => {
    const errors = [];

    const isDuplicate = users.find(
      (u) => u.name === data.name && u.id !== data.id
    );

    if (isDuplicate) {
      errors.push(`${isDuplicate.name} already taken`);
    }

    if (!validator.isEmail(data.email)) {
      errors.push("Please enter a correct email format");
    }

    if (!validator.isMobilePhone(data.phone, "id-ID")) {
      errors.push("Please enter a correct phone format");
    }

    return errors;
  };

  return { validateForm };
};

function Update() {
  const { data, handleChange, setData } = useFormData();
  const { validateForm } = useValidation(data);
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?name=${name}`
        );
        setData(response.data[0] || {}); // Set data to an empty object if there's no data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name, setData]);

  function handleUpdate(e) {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

    // Assuming your data object includes an 'id' property
    const putData = async () => {
      try {
        console.log("Submitting data:", {
          ...data,
          prevName: data.prevName,
        });

        const response = await axios.put(
          `http://localhost:3000/users/${data.id}`,
          {
            ...data,
            prevName: data.prevName,
          }
        );

        console.log("Response:", response);
        toast.success(`${data.name} successfully updated!`);
        navigate("/");
      } catch (error) {
        console.error(error);
        toast.error("Error updating contact.");
      }
    };
    putData();
  }

  return (
    <div className="min-h-screen flex items-center justify-center container">
      <div className="max-w-md w-full p-6 bg-slate-100 shadow-white rounded-md shadow-md">
        <div className="text-3xl font-semibold text-center text-gray-800 mb-6">
          <Heading head="Update Contact" />
        </div>
        <form className="space-y-4" onSubmit={handleUpdate}>
          <input
            type="hidden"
            name="prevName"
            id="prevName"
            value={data.prevName || data.name}
            onChange={handleChange}
          />
          {["name", "email", "phone", "age"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                id={field}
                name={field}
                value={data[field] || ""} // Ensure value is not undefined
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-sm"
                required
              />
            </div>
          ))}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none"
            >
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
