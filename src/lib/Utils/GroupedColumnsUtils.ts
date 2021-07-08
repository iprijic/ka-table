import { Column } from '../models';
import { GroupedColumn } from '../Models/GroupedColumn';

export const getChain = (column: Column | GroupedColumn, groupedColumns: GroupedColumn[], currentChain: (Column | GroupedColumn)[] = []): any[] => {
  const newChain = [column, ...currentChain];
  const groupedColumn = groupedColumns.find(gc => gc.columnsKeys.includes(column.key));
  if (groupedColumn) {
    return getChain(groupedColumn, groupedColumns, newChain);
  }
  return newChain;
}
export const addColumnToRows = (rows: any[], column: any, groupedColumns: GroupedColumn[]) => {
  const rowsResult = [...rows];
  const columnsChain = getChain(column, groupedColumns);
  columnsChain.forEach((item, index) => {
    if (!rowsResult[index]){
      rowsResult[index] = [];
    }
    const last = [...rowsResult[index]].pop();
    if (last && last.column === item){
      last.colSpan++;
    } else {
      rowsResult[index].push({
        colSpan: 1,
        columnChainLength: columnsChain.length,
        column: item
      });
    }
  });
  return rowsResult;
};

export const getRowsWithGroupedColumns = (columns: Column[], groupedColumns: GroupedColumn[]) => {
  let rows: any[] = [];
  columns.forEach(c => {
    rows = addColumnToRows(rows, c, groupedColumns);
  });
  rows.forEach((row, index) => {
    row.forEach((c: any) => {
      c.rowSpan = index === c.columnChainLength - 1 ? rows.length - c.columnChainLength + 1 : 1 ;
    });
  });
  return rows;
};