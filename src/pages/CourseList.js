import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchParam] = useState(["name"]);

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) > -1
        );
      });
    });
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    const response = await axios.get("http://localhost:8001/courses");
    setCourses(response.data); // nilai yg berisi data courses
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:8001/courses/${id}`);
    getAllCourses();
  };

  return (
    <div className="container">
      <h3 className="notification is-info title is-3">Course List</h3>
      {/* membuka form tambah data course baru */}
      <Link to="/create" className="button is-primary block">
        Add New Course
      </Link>{" "}
      <Link to="/users" className="button is-primary block">
        Open User List
      </Link>{" "}
      <Link to="/chart" className="button is-primary block">
        Open Course Chart
      </Link>
      {/* form pencarian data course berdasarkan name */}
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="search-form">
              <input
                type="search"
                className="input"
                autoComplete="off"
                id="search-form"
                name="search-form"
                placeholder="Search by course name"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="table-container box">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>NO</th>
              <th>COURSE NAME</th>
              <th>COURSE DURATION</th>
              <th>COURSE PRICE</th>
              <th>DESCRIPTION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {search(courses).map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>{course.duration}</td>
                <td>{course.price}</td>
                <td>{course.description}</td>
                <td>
                  <Link
                    to={`/edit/${course.id}`}
                    className="button is-small is-warning"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
