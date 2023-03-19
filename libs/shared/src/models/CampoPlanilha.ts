import {Column} from 'react-data-grid';

export default class CampoPlanilha {
  field: string;
  headerName: string;
  checked: boolean;
  editable: boolean;
  sortable: boolean;
  isArray: boolean;
  getValue: (object: any) => String | Number;
  csvName: string;

  constructor(
      field: string,
      headerName: string,
      getValue: (object: any) => String | Number,
      csvName: string = null,
      isArray = false,
      checked = false,
      editable = false,
      sortable = false,
  ) {
    this.field = field;
    this.headerName = headerName;
    this.getValue = getValue;
    this.csvName = csvName;
    this.checked = checked;
    this.editable = editable;
    this.sortable = sortable;
    this.isArray = isArray;
  }

  getDataGrid(): Column<Object> {
    return {
      key: this.field,
      name: this.headerName,
      editable: this.editable,
      sortable: this.sortable,
      resizable: true,
      width: 150,
    };
  }
}
