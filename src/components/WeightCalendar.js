import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarCustom.css"; // 캘린더 스타일 커스터마이징용

function WeightCalendar({ data }) {
  // 날짜별 몸무게를 객체로 저장
  const weightMap = {};
  data.forEach((item) => {
    weightMap[item.date] = item.weight;
  });

  // 캘린더 각 날짜 칸에 몸무게 표시
  const tileContent = ({ date }) => {
    const dateStr = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
    return weightMap[dateStr] ? (
      <p className="text-center text-sm fw-bold">{weightMap[dateStr]} kg</p>
    ) : null;
  };

  return (
    <div className="mb-5">
      <h4 className="text-center mb-3">📅 Calendar View</h4>
      <Calendar
        tileContent={tileContent}
        locale="en-US" // 캘린더 언어는 영어로 유지
      />
    </div>
  );
}

export default WeightCalendar;
