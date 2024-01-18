import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Lists from "./components/Lists";

function App() {
  const initialBudget = () => {
    const storedBudget = localStorage.getItem("budget");
    return storedBudget ? JSON.parse(storedBudget) : [];
  };
  const [budget, setBudget] = useState(initialBudget);
  const [inputList, setInputList] = useState("");
  const [inputCost, setInputCost] = useState("");
  const [editId, setEditId] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // 총비용 계산
    const total = budget.reduce(
      (sum, data) => sum + parseInt(data.inputCost || 0),
      0
    );
    setTotalCost(total);
    // 상태 변경 시 로컬 저장소에 저장
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  return (
    <div className="app container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">💰 Budget Calculator</h1>
      <div className="p-4 border-solid border border-white-500 rounded">
        <Form
          budget={budget}
          setBudget={setBudget}
          inputList={inputList}
          setInputList={setInputList}
          inputCost={inputCost}
          setInputCost={setInputCost}
          editId={editId}
          setEditId={setEditId}
        />
        <Lists
          budget={budget}
          setBudget={setBudget}
          setInputList={setInputList}
          setInputCost={setInputCost}
          setEditId={setEditId}
        />
      </div>
      <div className="total my-2 float-right">
        <h3 className="text-lg font-semibold">총비용: {totalCost} 원</h3>
      </div>
    </div>
  );
}

export default App;
