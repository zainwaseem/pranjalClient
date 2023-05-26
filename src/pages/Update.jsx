import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [records, setRecords] = useState({
    TokenId: "",
    Text: "",
    URL: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  console.log(id);

  const handleChange = (e) => {
    setRecords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/data/${id}`, records);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  useEffect(() => {
    const getsingleuser = async () => {
      const res = await axios.get(`http://localhost:8800/api/data/${id}`);
    };
    getsingleuser();
  }, [id]);

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="TokenId"
        name="TokenId"
        value={records.TokenId}
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
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
