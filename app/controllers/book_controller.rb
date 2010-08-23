class BookController < ApplicationController
  def initialise
    render :json => Book.new(params[:user], params[:file])
  end

end
