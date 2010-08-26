require 'spec_helper'

describe Sheet do
  let(:sheet) { Sheet.new }
  let(:sheet_data) { sheet.get_sheet_data }
  context '#get_sheet_data' do
    context 'calculated cols value' do
      it 'when no cells attached to sheet' do
        sheet_data[:cols].should == 10
      end

      it 'when no cells @ col 15' do
        sheet.stub!(:cells).and_return([mock_model(Cell, :col => 15, :row => 16, :get_cell_data => {})])
        sheet_data[:cols].should == 15
      end

      it 'when no cells @ col 5' do
        sheet.stub!(:cells).and_return([mock_model(Cell, :col => 5, :row => 16, :get_cell_data => {})])
        sheet_data[:cols].should == 10
      end
    end

    context 'calculated rows value' do
      it 'when no cells attached to sheet' do
        sheet_data[:rows].should == 10
      end

      it 'when no cells @ row 16' do
        sheet.stub!(:cells).and_return([mock_model(Cell, :col => 15, :row => 16, :get_cell_data => {})])
        sheet_data[:rows].should == 16
      end

      it 'when no cells @ col 6' do
        sheet.stub!(:cells).and_return([mock_model(Cell, :col => 15, :row => 6, :get_cell_data => {})])
        sheet_data[:rows].should == 10
      end
    end

    context 'retrieves cell data' do
      it 'for a single cell' do
        sheet.stub!(:cells).and_return([mock_model(Cell, :col => 15, :row => 6, :get_cell_data => {:hello => 5})])
        sheet_data[:cells].should == {:hello => 5}
      end

      it 'with multple cells' do
        sheet.stub!(:cells).and_return([mock_model(Cell, :col => 15, :row => 6, :get_cell_data => {:hello => 5}),
                                        mock_model(Cell, :col => 13, :row => 2, :get_cell_data => {:goodbye => 11})])
        sheet_data[:cells].should == {:hello => 5, :goodbye => 11}
      end
    end
  end
end
