import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const List = ({ data, onEditList, onDelete }) => {
  return (
    <div className="item flex justify-between items-center bg-gray-100 p-2 my-2 rounded">
      <div>
        <p className="font-bold">{data.inputList}</p>
      </div>
      <div className="flex">
        <p className="font-bold px-1">{data.inputCost}</p>
        <div className="actions">
          <button
            className="bg-green-500 hover:bg-green-300 text-white font-bold py-1 px-2 rounded mx-1"
            onClick={() => onEditList(data.id)}
          >
            <FaEdit />
          </button>
          <button
            className="bg-red-500 hover:bg-red-300 text-white font-bold py-1 px-2 rounded mx-1"
            onClick={() => onDelete(data.id)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
