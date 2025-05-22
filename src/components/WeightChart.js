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
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div
      className="bg-white p-3 rounded shadow mb-5"
      style={{ width: "100%", maxWidth: "600px" }}
    >
      <h5 className="text-center mb-3">📊 Weight Trend</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sorted}>
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
