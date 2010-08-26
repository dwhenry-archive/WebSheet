require 'spec_helper'

describe Book do
  context '#get_book' do
    it 'Creates a new Book and Sheet Object if none exists' do
      Sheet.should_receive(:create).and_return(mock_model(Sheet))
      Book.get_book('user1', 'book1')
    end

    it 'returns the object if it exists' do
      book = mock_model(Book)

      Book.stub!(:find_or_create_by_owner_and_name).and_return(book)
      Book.get_book('user1', 'book1').should == book
    end
  end

  context '#get_book_data' do
    it "returns a hash of data from the sheets object" do
      sheet = mock_model(Sheet, :get_sheet_data => 'hello')
      book = mock_model(Book, :sheets => [sheet])
      Book.stub!(:get_book).and_return(book)
      Book.get_book_data('user1', 'file1').should == {:sheets => ['hello']}
    end
  end

  context 'on create' do
    it 'raises and error if duplicate book/owner' do
      Book.create(:owner => 'user', :name => 'file').should be_true
      lambda{ Book.create(:owner => 'user', :name => 'file') }.should raise_error
    end
  end
end
