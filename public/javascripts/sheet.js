var WebSheet = {
  _cols: 0,
  _rows: 0,
  _name: '',
  _cells: {},
  
  add_sheet: function(sheet) {
    this._cols = sheet.cols,
    this._rows = sheet.rows,
    this._name = sheet.name,
    this._cells = sheet.cells
  },

  render: function(element) {
    this.render_header();
    		 
    for(var row; row < this._rows; row++) {
      this.render_row(row);
    };
  },

  render_header: function() {
    header = document.createElement('DIV');
    header.id = 'header_row';
    for(var col; col < this._cols; col++) {
      this.render_header_col(col, header);
    };
  },

  render_header_col: function(col, parentDiv) {
//    cell = document.createElement('DIV');
//    cell.id = 'col_' + col;
//    cell.class = 'cell col_' + col;
//    cell.innerHTML = col;
//    parentDiv.appendChild(cell);
//    adjuster = document.createElement('DIV');
//    adjuster.class = 'col_adjuster';
//    adjuster.id = 'adjuster_col_' + col;
//    parentDiv.appendChild(adjuster);
  },

  render_row: function(row) {
    rowElement = document.createElement('DIV');
    rowElement.id = 'row_' + row;
    this.render_header_row(row, rowElement);
    // [0..this._cols]
  },

  render_header_row: function(row, parentDiv){
  
  }

}

