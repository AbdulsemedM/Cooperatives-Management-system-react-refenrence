import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "semantic-ui-react";

const TypeExcelFileUploader = ({ onDataUpload }) => {
  // eslint-disable-next-line
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setExcelData(jsonData);

      // Find the desired column index in the first row
      const firstRow = jsonData[0];
      const desiredIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "coop-business sector".toLowerCase()
      );

      const mappedData = jsonData
        .slice(1) // Exclude the first row
        .map((row) => ({
          name: row[desiredIndex],
        }));

      onDataUpload(mappedData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Input
      type="file"
      className="flex w-full h-40"
      onChange={handleFileUpload}
    />
  );
};

export default TypeExcelFileUploader;