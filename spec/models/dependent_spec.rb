require 'spec_helper'

describe Dependent do
  before(:each) do
    @valid_attributes = {
      :parent => ,
      :child => 
    }
  end

  it "should create a new instance given valid attributes" do
    Dependent.create!(@valid_attributes)
  end
end
