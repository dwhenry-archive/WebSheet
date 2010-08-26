class BookController < ApplicationController
  def initialise
    render :json => Book.get_book_data(params[:user], params[:file])
  end

  def update_cell
    debugger
    sheet = Sheet.find_by_id(params[:sheet])
    results = sheet.update_cell(params[:cell], params[:value])
    render :json => results
#                    [{
#                      :id => 111,
#                      :row => 6,
#                      :col => 6,
#                      :value => 23
#                    }]
                  
  end
end
