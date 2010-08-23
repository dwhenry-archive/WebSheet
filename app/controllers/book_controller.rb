class BookController < ApplicationController
  def initialise
    render :json => Book.get_book(params[:user], params[:file])
  end

  def update_cell
    render :json => [{
                      :id => 111,
                      :row => 6,
                      :col => 6,
                      :value => 23
                    }]
  end
end
