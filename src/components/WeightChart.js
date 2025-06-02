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
  const latestByDate = {};

  // 🔸 날짜 기준 정렬
  const sorted = [...data].sort((a, b) => {
    const dateA = a.date?.seconds
      ? new Date(a.date.seconds * 1000)
      : new Date(a.date);
    const dateB = b.date?.seconds
      ? new Date(b.date.seconds * 1000)
      : new Date(b.date);
    return dateA - dateB;
  });

  // 🔸 날짜별 최신값만 저장
  sorted.forEach((item) => {
    let dateStr = "";

    if (item.date?.seconds) {
      // Firebase Timestamp
      dateStr = new Date(item.date.seconds * 1000).toISOString().split("T")[0];
    } else if (typeof item.date === "string") {
      // 문자열 형식
      dateStr = item.date.slice(0, 10);
    }

    if (dateStr) {
      latestByDate[dateStr] = item;
    }
  });

  // 🔸 차트에 쓸 데이터 변환
  const chartData = Object.entries(latestByDate)
    .map(([dateStr, item]) => ({
      ...item,
      date: dateStr,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

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
