import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ReviewChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ratings/getRatings`)
      .then((res) => {
        // Build average rating per course
        const byCourse = res.data.ratings.reduce((acc, r) => {
          const name = r.course.name;
          if (!acc[name]) acc[name] = { sum: 0, count: 0 };
          acc[name].sum += Number(r.rating);
          acc[name].count += 1;
          return acc;
        }, {});

        const labels = Object.keys(byCourse);
        const data = labels.map(
          (name) => +(byCourse[name].sum / byCourse[name].count).toFixed(2)
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Average Rating",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.error("Error fetching ratings:", err);
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // fill parent height
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Course Ratings" },
    },
    scales: {
      y: { min: 0, max: 5, ticks: { stepSize: 1 } },
      x: { ticks: { autoSkip: false } }, // keep labels visible; use scroll below if many
    },
  };

  return (
    <div className="w-full">
      {/* Horizontal scroll if many courses so nothing overlaps */}
      <div className="max-w-5xl mx-auto bg-white p-4 shadow rounded-lg overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Course Ratings</h2>
        <div className="h-[420px] min-w-[700px]">
          {chartData ? (
            <Bar data={chartData} options={options} />
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
