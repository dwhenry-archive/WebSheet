class Sheet < ActiveRecord::Base
  belongs_to :book
  has_many :cells

  def get_sheet_data
    {
      :id => self.id,
      :cols => self.max_cols,
      :rows => self.max_rows,
      :name => self.name,
      :cells => self.get_cell_data
    }
  end

  def update_cell(cell, value)
    cell = self.get_cell(cell)
    cell.update_attributes(:value => value)
    cells = [cell]
    
    return cells.map do |cell|
      {
        :id => cell.id,
        :row => cell.row,
        :col => cell.col,
        :value => cell.value
      }
    end
  end

  protected

  def process_cell(cell)
    cell.split('_').map{|v| v[1..-1]}
  end

  def get_cell(cell)
    row, col = self.process_cell(cell)
    self.cells.find_or_create_by_row_and_col(row, col)
  end

  def max_cols
    [self.cells.map(&:col), 10].flatten.max
  end

  def max_rows
    [self.cells.map(&:row), 10].flatten.max
  end

  def get_cell_data
    results = {}
    self.cells.each do |cell|
      results.merge!(cell.get_cell_data)
    end
    results
  end
end
