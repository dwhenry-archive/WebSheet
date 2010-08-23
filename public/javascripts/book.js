var WebBook = {
  _sheet: null,
  _sheets: new Array(),

  open_book: function(userName, fileName) {
    new Ajax.Request('/book/initialise', {
      params: {user: userName, file: fileName},
      onComplete: function(request) {
        book = request.responseJSON;
	book.sheets.each(function(sheet) {
          this._sheet = WebSheet.add_sheet(sheet);
	  this._sheets.push(this.sheet);
	});
	this._sheet.render($('book'));
      }
    });
  },

  render: function(element) {
    this._sheet.render(element)
  }
};
   
    

