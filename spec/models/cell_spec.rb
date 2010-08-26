require 'spec_helper'

describe Cell do
  let(:cell) {Cell.new(:row => 3, :col => 4, :value => 'hello')}

  context '#get_cell_data' do
    it 'with standard data' do
      cell.stub!(:id).and_return(100)
      cell.get_cell_data.should == {
        "3:4" => {
          :id => 100,
          :col => 4,
          :row => 3,
          :value => 'hello'
        }
      }
    end
  end
end
