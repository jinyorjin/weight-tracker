import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarCustom.css"; // 캘린더 커스터마이징용 CSS

function WeightCalendar({ data }) {
  // 🔸 날짜별 몸무게를 저장할 객체 생성
  const weightMap = {};

  data.forEach((item) => {
    if (item.date?.seconds) {
      const localDate = new Date(item.date.seconds * 1000);
      const dateStr = localDate.toLocaleDateString("sv-SE"); // 로컬 시간 기준 YYYY-MM-DD
      weightMap[dateStr] = item.weight;
    }
  });

  // 🔸 각 날짜 칸(tile)에 표시할 내용 정의
  const tileContent = ({ date }) => {
    const dateStr = date.toLocaleDateString("sv-SE"); // 로컬 시간 기준 YYYY-MM-DD
    return weightMap[dateStr] ? (
      <p className="text-center text-sm fw-bold">{weightMap[dateStr]} kg</p>
    ) : null;
  };

  return (
    <div className="mb-5">
      <h4 className="text-center mb-3">📅 Calendar View</h4>
      <Calendar tileContent={tileContent} locale="en-US" />
    </div>
  );
}

export default WeightCalendar;
