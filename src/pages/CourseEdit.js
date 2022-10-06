import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const CourseEdit = () => {
  // inisialisasi nilai awal apa saja kolom-kolom pada tabel courses
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const updateCourse = async (event) => {
    event.preventDefault();
    await axios.patch(`http://localhost:8001/courses/${id}`, {
      name: name,
      duration: duration,
      price: price,
      description: description,
    });
    history.push("/");
  };

  // mengambil satu data course berdasarkan id
  const getCourseById = async () => {
    const response = await axios.get(`http://localhost:8001/courses/${id}`);
    setName(response.data.name);
    setDuration(response.data.duration);
    setPrice(response.data.price);
    setDescription(response.data.description);
  };

  useEffect(() => {
    getCourseById();
  }, []);

  return (
    <div className="container">
      <h3 className="notification is-info title is-3">Edit Course</h3>
      <form onSubmit={updateCourse}>
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
          <button className="button is-primary">Update Course</button>
        </div>
      </form>
    </div>
  );
};

export default CourseEdit;
