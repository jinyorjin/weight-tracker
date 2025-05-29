// src/components/WeightChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeightChart({ data }) {
  const sorted = [...data].sort((a, b) => {
    const dateA = a.date?.seconds ? new Date(a.date.seconds * 1000) : null;
    const dateB = b.date?.seconds ? new Date(b.date.seconds * 1000) : null;
    return dateA && dateB ? dateA.getTime() - dateB.getTime() : 0;
  });

  const chartData = sorted
    .filter((item) => item.date?.seconds) // 유효한 날짜만 통과
    .map((item) => ({
      ...item,
      date: new Date(item.date.seconds * 1000).toISOString().split("T")[0], // "YYYY-MM-DD"
    }));

  return (
    <div
      className="bg-white p-3 rounded shadow mb-5"
      style={{ width: "100%", maxWidth: "600px" }}
    >
      <h5 className="text-center mb-3">📊 Weight Trend</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} unit="kg" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#ff6f00"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeightChart;
