import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CourseChart = () => {
  const [graph, setGraph] = useState([]);
  const [getdata, setGetData] = useState([]);

  const courseChart = async () => {
    await axios.get("http://localhost:8001/courses").then((response) => {
      setGetData(response.data);
    });
  };

  const createChart = async (event) => {
    await axios.get("http://localhost:8001/courses").then((result) => {
      const courseData = result.data;
      let courseName = [];
      let coursePrice = [];
      courseData.forEach((course) => {
        courseName.push(course.name);
        coursePrice.push(course.price);
      });

      setGraph({
        labels: courseName,
        datasets: [
          {
            label: "Dollar",
            backgroundColor: ["red", "green", "blue", "yellow", "orange"],
            borderWidth: 3,
            borderColor: "red",
            data: coursePrice,
          },
        ],
      });
    });
  };

  useEffect(() => {
    courseChart();
    createChart();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center text-primary mt-2 mb-3">React Chart</h2>
      <h3 className="text-center text-primary mt-2 mb-3">Course by Price</h3>
      <div className="row mt-3">
        <div className="col-sm-3">
          <div>
            <table className="table table-bordered graphTable">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {getdata.map((course) => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>{course.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-9">
          <Bar
            data={graph}
            options={{
              title: {
                display: true,
                text: "Price per Course",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "top",
              },
            }}
          />
          <Line
            data={graph}
            options={{
              title: {
                display: true,
                text: "Price per Course",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "top",
              },
              interaction: {
                mode: "index",
                intersect: false,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseChart;
