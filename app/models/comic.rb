class Comic < ApplicationRecord
  belongs_to :user
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