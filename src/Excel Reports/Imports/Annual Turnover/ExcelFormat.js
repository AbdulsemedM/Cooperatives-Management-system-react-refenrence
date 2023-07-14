import React from "react";
import { writeFile, utils } from "xlsx";

const PCExcelFormat = () => {
  const wsData = [["PC Name", "Annual Turnover value", "date generated"]];

  const ws = utils.aoa_to_sheet(wsData);

  // Convert worksheet to workbook
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");

  // Function to download the Excel file
  const handleExportExcel = () => {
    writeFile(wb, "annual turnover Format.xlsx", {
      bookType: "xlsx",
      bookSST: false,
    });
  };

  return (
    <div>
      <button
        className="ui basic button whitespace-nowrap"
        onClick={handleExportExcel}
      >
        <i className="download icon"></i>
        <span className="hidden md:inline-block">Download Excel Format</span>
      </button>
    </div>
  );
};

export default PCExcelFormat;
