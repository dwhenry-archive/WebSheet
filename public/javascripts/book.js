var WebOffice = {
  _books: [],
  appElement: 'book',

  setElement: function(element) {
    _appElement = element;
  },

  openBook: function(userName, fileName) {
    book = new WebOffice.WebBook(userName, fileName)
    this._books.push(book)
  },

  WebBook: (function(userName, fileName) {
    this.currentSheet = null;
    this._sheets = [];

    var load_book = function(request) {
      book = request.responseJSON;

      book.sheets.each(function(sheet) {
        currentSheet = new WebOffice.WebBook.WebSheet(sheet);
        this._sheets.push(currentSheet);
      }.bindAsEventListener(this));

      currentSheet.render($(WebOffice.appElement));
    }

    this.render = function(element) {
      this.currentSheet.render($(WebOffice.appElement))
    };

    new Ajax.Request('/book/initialise', {
      params: {user: userName, file: fileName},
      onSuccess: load_book.bindAsEventListener(this)
    });
  })
};
   
