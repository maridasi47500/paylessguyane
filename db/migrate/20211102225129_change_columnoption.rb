class ChangeColumnoption < ActiveRecord::Migration[6.0]
  def change
    change_column :options, :qty, :boolean
  end
end
