import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function WeightForm() {
  const [weight, setWeight] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // 기본: 오늘

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight) return;

    // 🔸 날짜를 Firebase Timestamp로 저장
    const timestamp = Timestamp.fromDate(selectedDate);

    await addDoc(collection(db, "weights"), {
      date: timestamp,
      weight: parseFloat(weight),
    });

    setWeight("");
    setSelectedDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group mb-2">
        <input
          type="number"
          className="form-control"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button type="submit" className="btn btn-light">
          Log 🐥
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          maxDate={new Date()}
          className="form-control"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </form>
  );
}

export default WeightForm;
