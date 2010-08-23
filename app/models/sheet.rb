class Sheet
  def self.get_sheet
    {
      :cols => 10,
      :rows => 10,
      :name => 'testSheet',
      :cells => {
        '3:2' => {
          :id => 10,
          :col => 2,
          :row => 3,
          :value => 12
        },
        '3:4' => {
          :id => 12,
          :col => 4,
          :row => 3,
          :value => 10
        }
      }
    }
  end
end
