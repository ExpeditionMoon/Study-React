import React from "react";
import { FaRegSave } from "react-icons/fa";

const Form = ({
  budget,
  setBudget,
  editId,
  setEditId,
  inputList,
  setInputList,
  inputCost,
  setInputCost,
}) => {
  const handleInputList = (e) => {
    e.preventDefault();
    if (inputList !== "" && inputCost > 0) {
      if (editId !== null) {
        setBudget(
          budget.map((data) =>
            data.id === editId
              ? { ...data, inputList, inputCost, isEditing: false }
              : data
          )
        );
        setEditId(null);
      } else {
        const newList = {
          id: new Date().getTime(),
          inputList: inputList,
          inputCost: parseInt(inputCost),
          isEditing: false,
        };
        setBudget([...budget, newList]);
      }
      setInputList("");
      setInputCost("");
    }
  };

  return (
    <form onSubmit={handleInputList}>
      <div className="item flex justify-between my-2">
        <div>
          <h5 className="font-bold">지출 항목</h5>
          <input
            type="text"
            className="border rounded p-2"
            placeholder="예) 렌트비"
            value={inputList}
            onChange={(e) => setInputList(e.target.value)}
          />
        </div>
        <div>
          <h5 className="font-bold">비용</h5>
          <input
            type="number"
            className="border rounded p-2"
            placeholder="0"
            value={inputCost}
            onChange={(e) => setInputCost(e.target.value)}
          />
        </div>
      </div>
      <button className="createBtn bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 justify-center rounded">
        {editId !== null ? (
          <div>
            수정 <FaRegSave />
          </div>
        ) : (
          <div>
            저장 <FaRegSave />
          </div>
        )}
      </button>
    </form>
  );
};

export default Form;
