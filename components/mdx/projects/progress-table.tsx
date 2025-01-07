import React from "react";

type ProgressTableProps = {
  columns: string[];
  data: {
    name: string;
    progress: string[]; // "✔" / "✖" / JSX for icons
  }[];
};

export function ProgressTable({ columns, data }: ProgressTableProps) {
  return (
    <section className="mt-8 overflow-x-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-4">共学进度打卡</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-left"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-gray-300 px-4 py-2">{row.name}</td>
              {row.progress.map((item, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
