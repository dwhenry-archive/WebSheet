WebOffice.WebBook.WebSheet = (function(sheet) {
  this._cols = sheet.cols,
  this._rows = sheet.rows,
  this._name = sheet.name,
  this._cells = sheet.cells

  this.render = function(element) {
    this.render_header(element);

    for(var row=0; row < this._rows; row++) {
      this.render_row(row, element);
    }
    WebOffice.WebBook.CellAction.watchCells();
  };

  this.render_header = function(element) {
    header = document.createElement('DIV');
    header.id = 'header_row';
    header.addClassName('row');
    this.render_corner(header);
    for(var col=0; col < this._cols; ++col) {
      this.render_header_col(col, header);
    }
    element.appendChild(header);
  };

  this.render_header_col = function(col, parentDiv) {
    cell = document.createElement('DIV');
    cell.id = 'col_' + col;
    cell.addClassName('cell_header col col_' + col);
    cell.innerHTML = 'COL ' + col;
    parentDiv.appendChild(cell);
    adjuster = document.createElement('DIV');
    adjuster.addClassName('col_adjuster');
    adjuster.id = 'adjuster_col_' + col;
    adjuster.setAttribute('colID', 'col_' + col);
    parentDiv.appendChild(adjuster);
  };

  this.render_row = function(row, element) {
    rowElement = document.createElement('DIV');
    rowElement.id = 'row_' + row;
    rowElement.addClassName('row');
    this.render_header_row(row, rowElement);
    for(var col=0; col < this._cols; ++col) {
      this.render_cell(row, col, rowElement);
    }
    element.appendChild(rowElement)
  };

  this.render_header_row = function(row, parentDiv){
    adjuster = document.createElement('DIV');
    adjuster.addClassName('row_adjuster');
    adjuster.id = 'adjuster_row_' + row;
    adjuster.setAttribute('rowID', 'row_' + row);
    parentDiv.appendChild(adjuster);
    cell = document.createElement('DIV');
    cell.id = 'header_row_' + row;
    cell.addClassName('cell_header header_col row_' + row);
    cell.innerHTML = 'ROW ' + row;
    parentDiv.appendChild(cell);

  };

  this.render_corner = function(parentDiv){
    cell = document.createElement('DIV');
    cell.addClassName('cell col');
    cell.innerHTML = '&nbsp;';
    parentDiv.appendChild(cell);
  };

  this.render_cell = function(row, col, parentDiv) {
    cell = document.createElement('DIV');
    cell.id = 'R' + row + '_C' + col;
    cell.addClassName('cell col col_' + col + ' row_' + row);
    if(this._cells[row + ':' + col]) {
      cellSettings = this._cells[row + ':' + col];
      cell.innerHTML = cellSettings.value;
    } else {
      cell.innerHTML = '&nbsp;'
    }
    parentDiv.appendChild(cell);
  };

  this.growSheet = function(rows, cols) {
    if(cols < this.cols) {
      for(var col1=this._cols; col1 < cols; col1++) {
        for(var row1=0; row1 < this._rows; row1++) {
          this.render_cell(row1, col1, $('row_' + row1));
        }
      }
    }

    for(var col2=0; col2 < cols; col2++) {
      for(var row2=this.rows; row2 < rows; row2++) {
        this.render_cell(row2, col2, $('row_' + row2));
      }
    }

    this._cols = cols;
    this._rows = rows;
  };
})

