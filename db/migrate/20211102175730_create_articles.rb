class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :bonplans do |t|
      t.string :title
      t.string :othertitle
      t.string :image
      t.text :content
      t.timestamps
    end
    create_table :articles do |t|
      t.string :title
      t.string :othertitle
      t.string :image
      t.text :content
      t.timestamps
    end
  end
end
