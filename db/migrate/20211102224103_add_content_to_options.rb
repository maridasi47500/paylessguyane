class AddContentToOptions < ActiveRecord::Migration[6.0]
  def change
    add_column :options, :content, :text
  end
end
