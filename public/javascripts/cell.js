Object.extend(Ajax.InPlaceEditor.prototype, {
  enterEditMode: function(e) {
    if(WebOffice.WebBook.CellAction.currentCell)
      return; // no action if already editing

    if (this._saving || this._editing) return;
    this._editing = true;
    this.triggerCallback('onEnterEditMode');
    if (this.options.externalControl)
      this.options.externalControl.hide();
    //this.element.hide();
    this.createForm();
    //this.element.parentNode.insertBefore(this._form, this.element);
    this.element.insert({top: this._form});

    if (!this.options.loadTextURL)
      this.postProcessEditField();
    if (e) Event.stop(e);

    WebOffice.WebBook.CellAction.currentCell = this._form;
    this.triggerCallback('onFormReady',this._form);
  },
  Listeners: {
    dblclick: 'enterEditMode',
    keydown: 'checkForEscapeOrReturn',
    mouseover: 'enterHover',
    mouseout: 'leaveHover'
  }
})

Prototype.setRule = function(selector, styles){
	var i, x, sheet, rules;

	for (x = document.styleSheets.length - 1; 0 <= x ; x--){
		sheet = document.styleSheets[x];
		rules = sheet.cssRules || sheet.rules;

		for (i = rules.length - 1; 0 <= i; i--){
			if (rules[i].selectorText == selector){
				return Object.extend(rules[i].style, styles);
			}
		}
	}

	var index = rules.length;
	if (sheet.insertRule){ // Normal browsers
		sheet.insertRule(selector + '{ }', index);
	} else { // IE: if (sheet.addRule){
		sheet.addRule(selector, ';', index);
	}

	Object.extend((sheet.cssRules || sheet.rules)[index].style, styles);
}

WebOffice.WebBook.CellAction = {
  currentCell: null,
  _resizeElement: null,
  _direction: null,

  watchCells: function() {
    $$('.cell').invoke('observe', 'click', WebOffice.WebBook.CellAction.selectCell);
    $$('.cell').each(function(cell) {WebOffice.WebBook.CellAction.editCell(cell);});
    $$('.col_adjuster').each(this.setColumnWidth.bindAsEventListener(this))
    this.setColumnWidthBody();
    $$('.row_adjuster').each(this.setRowWidth.bindAsEventListener(this))
    this.setRowWidthBody();

  },

  selectCell: function(event) {
    $$('.selectedCell').invoke('removeClassName', 'selectedCell');
    event.element().addClassName('selectedCell')
  },

  editCell: function(cell) {
    if(cell.id == '') return;
    new Ajax.InPlaceEditor(cell.id,'/book/update_cell?cell=' + cell.id, {
      cancelControl: 'none',
      okControl: 'none',
      onFormReady: function(form) {
        cell = form.element;
        inputField = cell.down('input');
        inputField.setStyle({width: cell.getStyle('width'),
                             height: cell.getStyle('height')})
      }.bindAsEventListener(this),
      htmlResponse: false,
      onSuccess: function(request) {
        results = request.responseJSON;
        results.each(function(cellSettings) {
          // update settings here
          row = cellSettings.row;
          col = cellSettings.col;
          cell = $('R' + row + '_C' + col);
          if(!cell) WebOffice.currentSheet.growSheet(row, col);

          cell.innerHTML = cellSettings.value;
        })
      },
      onComplete: function(request) {
        WebOffice.WebBook.CellAction.currentCell = null;
      }
    });
  },

  setColumnWidth: function(cell) {
    cell.observe('mousedown', function(event) {
      this._resizeElement = $(event.element().getAttribute('colID'));
      this._position = event.screenX;
      this._direction = 'col';
    }.bindAsEventListener(this));
  },

  setColumnWidthBody: function() {
    document.observe('mousemove', function(event) {
      if(!this._resizeElement || this._direction != 'col')
        return;
      change = event.screenX - this._position;
      currentSize = parseInt(this._resizeElement.getStyle('width'));
      newSize = [currentSize + change, 0].max()

      Prototype.setRule('.' + this._resizeElement.id, {width: newSize + 'px'})

      this._position = event.screenX;
    }.bindAsEventListener(this));

    document.observe('mouseup', function(event) {
      this._resizeElement = null;
      this._direction = null;
    }.bindAsEventListener(this));
  },
  setRowWidth: function(cell) {
    cell.observe('mousedown', function(event) {
      this._resizeElement = $(event.element().getAttribute('rowID'));
      this._position = event.screenY - parseInt(this._resizeElement.getStyle('height'));
      this._direction = 'row';
    }.bindAsEventListener(this));
  },

  setRowWidthBody: function() {
    document.observe('mousemove', function(event) {
      if(!this._resizeElement || this._direction != 'row')
        return;
      change = event.screenY - this._position;
      newSize = [change, 0].max()
//      $('pos').update(this._position);
//      $('change').update(change);
//      $('size').update(newSize);
      Prototype.setRule('.' + this._resizeElement.id, {height: newSize + 'px'})
      $('adjuster_' + this._resizeElement.id).setStyle({'marginTop': (newSize - 2) + 'px'})
    }.bindAsEventListener(this));

    document.observe('mouseup', function(event) {
      this._resizeElement = null;
      this._direction = null;
    }.bindAsEventListener(this));
  }

}

