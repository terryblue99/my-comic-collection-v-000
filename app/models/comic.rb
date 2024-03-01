class Comic < ApplicationRecord
  belongs_to :user

  alias_attribute :comic_related, :comic_publisher
  alias_attribute :related_title, :comic_name
  alias_attribute :related_input1, :comic_number
  alias_attribute :related_input2, :comic_title
  alias_attribute :related_input3, :date_published
  alias_attribute :related_input4, :date_for_sale
  alias_attribute :related_input5, :date_sold
  alias_attribute :related_input6, :payout_date
  alias_attribute :related_input7, :sale_venue
  alias_attribute :related_input8, :grade
  
  has_one_attached :image

  validates :comic_name, :comic_publisher, presence: true
  validate :image_attached

  def image_attached
    # Check if a comic image has been selected  
    # and, if not, store a default image
    if !self.image.attached?
      self.image.attach(io: File.open(Rails.root.join('my-comic-collection-front', 
                                                      'src/images',
                                                      'no_image_uploaded.png'
                                                    )
                                      ), 
                        filename: 'no_image_uploaded.png',
                        content_type: 'image/png'
                      )
    end
  end
  
end