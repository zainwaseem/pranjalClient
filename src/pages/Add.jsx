import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [post, setPost] = useState({
    TokenId: "",
    Text: "",
    URL: "",
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/data", post);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Record</h1>
      <input
        type="text"
        placeholder="TokenId"
        name="TokenId"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Text"
        name="Text"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="URL"
        name="URL"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        See all Records
      </Link>
    </div>
  );
};

export default Add;
