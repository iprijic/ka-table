import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../Enums/DataType';
import FilterCell, { IFilterCellProps } from './FilterCell';

const props: IFilterCellProps = {
  column: {
    dataType: DataType.String,
    field: 'columnField',
    title: 'Field',
  },
  editableCells: [],
  isEditableCell: false,
  onOptionChanged: () => {},
  onRowDataChanged: () => {},
  rowData: {
    column: 1,
  },
  rowKey: '1',
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<FilterCell {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
