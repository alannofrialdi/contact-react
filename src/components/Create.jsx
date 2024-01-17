import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import Heading from "./Heading";
import { users } from "../assets/data/db.json";
import { toast } from "react-toastify";

// build hooks
const useFormData = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  // handle when the input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // value to lower case
    const updatedValue =
      name === "name" ? value : name === "email" ? value.toLowerCase() : value;

    // duplicate data array, then update new array
    setData({
      ...data,
      [name]: updatedValue,
    });
  };

  return { data, handleChange };
};

// validasi
const useValidation = (data) => {
  const validateForm = () => {
    const errors = [];

    const isDuplicate = users.find((u) => u.name === data.name);
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

const ContactForm = () => {
  // custom hooks
  const { data, handleChange } = useFormData();
  const { validateForm } = useValidation(data);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

    const postData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/users", data);
        console.log(response);
        toast.success(`Successfully added ${data.name}`);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };

    console.log("Form submitted:", data);

    postData();
  };

  return (
    <div className="min-h-screen flex items-center justify-center container">
      <div className="max-w-md w-full p-6 bg-slate-100 shadow-white rounded-md shadow-md">
        <div className="text-3xl font-semibold text-center text-gray-800 mb-6">
          <Heading head="Add Contact" />
        </div>
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          data={data}
        />
      </div>
    </div>
  );
};

function Form({ handleChange, handleSubmit, data }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* mapping through the array of fields to display form inputs */}
      {["name", "email", "phone", "age"].map((field) => (
        <div key={field}>
          <label
            htmlFor={field}
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            {/* using labels based on the field name */}
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          {/* form input with dynamic type and using the handleChange function */}
          <input
            type={
              field === "email" ? "email" : field === "phone" ? "tel" : "text"
            }
            id={field}
            name={field}
            value={data[field]}
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
          Add Contact
        </button>
      </div>
    </form>
  );
}

Form.propTypes;

export default ContactForm;
