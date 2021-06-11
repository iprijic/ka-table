
import { getValueByField } from './DataUtils';

export const treeGroupMark = {};
export const treeDataMark = {};

const getItemStructure = (
  item: any,
  dataHash: any,
  rowKeyField: any,
  deep: number = 0): any[] => {
    const children = dataHash[getValueByField(item, rowKeyField)];
    if (!children){
      return [{ treeDataMark, rowData: item, deep }];
    }
    const result = [{ treeGroupMark, rowData: item, deep }];
    children.forEach((c: any) => {
      const childrenData = getItemStructure(c, dataHash, rowKeyField, deep + 1);
      result.push(...childrenData);
    });
    return result;
};

export const getTreeData = (
  data: any[],
  rowKeyField: any,
  parentRowKeyField: any,
  parentsExpanded?: any[][]): any[] => {
    const dataHash: any = {};
    const rootElements: any[] = [];
    data.forEach(d => {
      if (!d[parentRowKeyField]){
        rootElements.push(d);
        return;
      }
      const fieldValue = getValueByField(d, parentRowKeyField) ?? undefined;
      if (!dataHash[fieldValue]){
        dataHash[fieldValue] = [];
      }
      dataHash[fieldValue].push(d);
    });
    const newData: any[] = [];
    rootElements.forEach(d => {
      newData.push(...getItemStructure(d, dataHash, rowKeyField));
    });
    return newData;
};

