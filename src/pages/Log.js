import React from "react";
import WeightList from "../components/WeightList";
import { Link } from "react-router-dom";

function Log() {
  return (
    <div className="container py-4">
      <h2 className="text-center mb-3">📋 Weight Log</h2>

      {/* 🔙 홈으로 돌아가기 링크 */}
      <div className="text-center mb-3">
        <Link to="/" className="btn btn-outline-primary">
          🏠 Back to Home
        </Link>
      </div>

      <WeightList />
    </div>
  );
}

export default Log;
