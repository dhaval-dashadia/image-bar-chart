"use client";

import Image from "next/image";
import Graph from "./graph";

import { useState } from "react";
import dynamic from "next/dynamic";

const DataGrid = dynamic(
  () => import("react-data-grid").then((mod) => mod.DataGrid),
  { ssr: false }
);

const textEditor = dynamic(
  () => import("react-data-grid").then((mod) => mod.textEditor),
  { ssr: false }
);


const columns: any = [
  {
    key: "country",
    name: "Country",
    renderEditCell: textEditor
  },
  {
    key: "value",
    name: "Value",
    renderEditCell: textEditor
  }
]

const initialRows = [
  { country: "India", value: "50" },
  { country: "USA", value: "70" },
  { country: "UK", value: "30" },
  { country: "Australia", value: "40" },
  { country: "Canada", value: "60" }
]

export default function Home() {

  const [rows, setRows] = useState(initialRows);

  const onRowsChange = (updatedRows: any[]) => {
    setRows(updatedRows);
  };

  const addNewRow = () => {
    const newRow = { country: "", value: "" };
    setRows([...rows, newRow]);
  };

  return (
    <div className="flex w-full p-[20px]">
      <div className="p-4 w-1/2">
        <button
          onClick={addNewRow}
          className="mb-2 p-2 bg-blue-500 text-white rounded"
        >
          + Add Row
        </button>
        <DataGrid columns={columns} rows={rows} onRowsChange={onRowsChange} />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Graph country={rows} />  
      </div>
    </div>
  );
}
