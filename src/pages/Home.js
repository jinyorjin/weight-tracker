import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import WeightForm from "../components/WeightForm";
import WeightCalendar from "../components/WeightCalendar";
import WeightChart from "../components/WeightChart";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "weights"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setWeights(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-warning text-dark px-3 py-4">
      <h1 className="display-4 text-center mb-3">🐥 Weight Tracker</h1>
      {/* 📝 입력 */}
      <div className="w-100 mb-4" style={{ maxWidth: "500px" }}>
        <WeightForm />
      </div>
      {/* 📅 캘린더 */}
      <WeightCalendar data={weights} />
      {/* 📈 그래프 */}
      <WeightChart data={weights} />
      {/* 👉 로그 보기 링크 */}
      <Link to="/log" className="btn btn-outline-dark mb-4">
        📋 View Log
      </Link>
      <Footer />
    </div>
  );
}

export default Home;
