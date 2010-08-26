require 'spec_helper'

describe Equation do
  before(:each) do
    @valid_attributes = {
      :value => "value for value",
      :eq_type => "value for eq_type",
      :index => 1,
      :parent_id => 1
    }
  end

  it "should create a new instance given valid attributes" do
    Equation.create!(@valid_attributes)
  end
end
