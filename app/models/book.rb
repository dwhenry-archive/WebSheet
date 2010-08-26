class Book < ActiveRecord::Base
  has_many :sheets

  def self.get_book_data(owner, file)
    book = self.get_book(owner, file)

    {
      :sheets => book.sheets.map(&:get_sheet_data)
    }
  end

  def self.get_book(owner, file)
    Book.find_or_create_by_owner_and_name(owner, file)
  end
  
  def after_create
    Sheet.create(:name => 'sheet 1', :pos => 1, :book => self)
  end

  def validate
    books = Book.all(:conditions => {:owner => self.owner, :name => self.name})
    unless books.size == 0 or (books.size == 1 and books.id == self.id)
      raise 'Attempt to Generate Duplicate Book Owner/Name'
    end
  end
end

