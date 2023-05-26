import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [records, setRecords] = useState([]);
  const [TokenId, setTokenId] = useState("");

  // const fetchAllRecords = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:8800/api/data/${TokenId}`);
  //     // console.log(res.data);
  //     setRecords(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/data/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  function handleQueryChange(e) {
    console.log(e.target.value);
    setTokenId(e.target.value);
  }
  async function handlesubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/api/data/${TokenId}`);
      setRecords(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Data Records</h1>
      <form action="" onSubmit={handlesubmit}>
        <input type="text" value={TokenId} onChange={handleQueryChange} />
        <input type="submit" value="Get Record" className="GetRecord" />
      </form>
      {records.length !== 0 ? (
        <div className="books">
          <div className="book">
            <h3>Token: {records.TokenId}</h3>
            <h4>Text: {records.Text}</h4>
            <img src={records.URL} alt="url img here" className="imgURL" />

            <button
              className="delete"
              onClick={() => handleDelete(records._id)}
            >
              Delete
            </button>
            <Link
              to={`/update/${records._id}`}
              className="linkk"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Update
            </Link>
          </div>
        </div>
      ) : (
        <p>{records}</p>
      )}
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new record
        </Link>
      </button>
    </div>
  );
};

export default Posts;
