class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.references :activity, foreign_key: true
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end
