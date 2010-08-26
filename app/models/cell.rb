class Cell < ActiveRecord::Base
  belongs_to :sheet
  belongs_to :equation

  def get_cell_data
    {
      "#{self.row}:#{self.col}" => {
        :id => self.id,
        :col => self.col,
        :row => self.row,
        :value => self.value
      }
    }
    
  end
end
