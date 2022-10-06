import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CourseCreate = () => {
  // inisialisasi nilai awal apa saja kolom-kolom pada tabel courses
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const createCourse = async (event) => {
    event.preventDefault(); // menghindari reload
    await axios.post("http://localhost:8001/courses", {
      name: name,
      duration: duration,
      price: price,
      description: description,
    });
    history.push("/"); // redirect ke CourseList
  };

  return (
    <div className="container">
      <h3 className="notification is-info title is-3">Create New Course</h3>
      <form onSubmit={createCourse}>
        <div className="field">
          <label className="label">Course Name</label>
          <input
            type="text"
            className="input"
            placeholder="Enter course name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Course Duration</label>
          <input
            type="number"
            className="input"
            placeholder="Enter course duration"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Course Price</label>
          <input
            type="number"
            className="input"
            placeholder="Enter course price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Description</label>
          <input
            type="text"
            className="input"
            placeholder="Enter course description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="field">
          <button className="button is-primary">Create Course</button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreate;
