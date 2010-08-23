Object.extend(Ajax.InPlaceEditor.prototype, {
  enterEditMode: function(e) {
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

    this.triggerCallback('onFormReady',this._form);
  }
})

var cellsObject = {
  _editCell: null,

  watchCells: function() {
    $$('.cell').invoke('observe', 'click', this.selectCell);
    $$('.cell').invoke('observe', 'dblclick', this.editCell);

  },

  selectCell: function(event) {
    $$('.selectedCell').invoke('removeClassName', 'selectedCell');
    event.element().addClassName('selectedCell')
  },

  editCell: function(event) {
    if(this._editCell) return;
    this._editCell = event.element();

    new Ajax.InPlaceEditor(this._editCell.id,'/book/update_cell?cell=' + this._editCell.id, {
      cancelControl: 'none',
      okControl: 'none',
      onFormReady: function(form) {
        inputField = this._editCell.down('input');
        inputField.setStyle({width: this._editCell.getStyle('width'),
                             height: this._editCell.getStyle('height')})
      }.bindAsEventListener(this),
      htmlResponse: false,
      onComplete: function(request) {
        results = request.responseJSON;
        results.each(function(cellSettings) {
          // update settings here
          row = cellSettings.row;
          col = cellSettings.col;
          cell = $('R' + row + '_C' + col);
          if(!cell) webBook.currentSheet.growSheet(row, col);

          cell.innerHTML = cellSettings.value;
        })
      }
    });
  }
}