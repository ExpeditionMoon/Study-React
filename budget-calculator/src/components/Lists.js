import React from "react";
import List from "./List";

const Lists = ({
  budget,
  setBudget,
  setInputList,
  setInputCost,
  setEditId,
}) => {
  // 수정 버튼 누를 경우, 내용 수정
  const handleEdit = (id) => {
    const findId = budget.find((data) => data.id === id);
    if (findId) {
      setInputList(findId.inputList);
      setInputCost(findId.inputCost);
      setEditId(id);
      setBudget(
        budget.map((data) =>
          data.id === id ? { ...data, isEditing: true } : data
        )
      );
    }
  };

  // 리스트 삭제
  const handleDelete = (id) => {
    setBudget(budget.filter((data) => data.id !== id));
    setInputList("");
    setInputCost("");
  };

  return (
    <div className="list">
      {budget.map((data) => (
        <List
          key={data.id}
          data={data}
          onEditList={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Lists;