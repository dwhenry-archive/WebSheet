var webBook;

function WebBook() {
  this.currentSheet = null;
  this._sheet = null;
  this._sheets = [];

  this.open_book = function(userName, fileName) {
    new Ajax.Request('/book/initialise', {
      params: {user: userName, file: fileName},
      onSuccess: this.load_book.bindAsEventListener(this)
    });
  };

  this.load_book = function(request) {
    book = request.responseJSON;
    book.sheets.each(function(sheet) {
      this._sheet = new WebSheet();
      this._sheet.add_sheet(sheet);
      this._sheets.push(this._sheet);
    }.bindAsEventListener(this));
    this._sheet.render($('book'));
  }

  this.render = function(element) {
    this._sheet.render(element)
  };
};
   
