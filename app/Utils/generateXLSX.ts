import excel4node from "excel4node";

type IColumn = {
  size?: number;
  name: string;
};

type IGenerateXLSX = {
  worksheetName?: string;
  columns: IColumn[];
  data: string[][];
  filePath: string;
};

export const generateXLSX = (config: IGenerateXLSX) => {
  return new Promise((resolve, reject) => {
    const { worksheetName, columns, data, filePath } = config;
    const workbook = new excel4node.Workbook();
    const worksheet = workbook.addWorksheet(worksheetName ?? "worksheet");
    let headingColumnIndex = 1;
    columns.forEach((column) => {
      const { name, size } = column;
      worksheet.column(headingColumnIndex).setWidth(size);
      worksheet.cell(1, headingColumnIndex++).string(name);
    });
    // WRITE DATA IN EXCEL FILE
    let rowIndex = 2;
    data.forEach((rowData) => {
      let columnIndex = 1;
      rowData.forEach((item) => {
        worksheet.cell(rowIndex, columnIndex++).string(item);
      });
      rowIndex++;
    });
    workbook.write(filePath, (err) => {
      if (err) reject(err);
      resolve(filePath);
    });
  });
};
