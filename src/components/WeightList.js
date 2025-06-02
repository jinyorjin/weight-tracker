import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

function WeightList() {
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "weights"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setWeights(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {weights.map((item, index) => {
        const previous = weights[index + 1]?.weight;
        const gain = previous !== undefined && item.weight > previous;

        // 날짜 문자열 변환
        const dateStr = item.date?.seconds
          ? new Date(item.date.seconds * 1000).toLocaleDateString("sv-SE")
          : "No date";

        return (
          <div key={item.id} className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-1">{dateStr}</h5>
                <p className="card-text mb-0">{item.weight} kg</p>
              </div>
              <div>
                {gain ? (
                  <span className="angry-chick">😡</span>
                ) : (
                  <span className="happy-chick">😊</span>
                )}
                <button
                  className="btn btn-outline-danger btn-sm ms-3"
                  onClick={() => deleteDoc(doc(db, "weights", item.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeightList;
