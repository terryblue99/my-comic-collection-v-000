import React from 'react'
import Image from 'react-image-enlarger'

const EnlargeImage = (image) => {
  alert('### EnlargeImage')
  const [zoomed, setZoomed] = React.useState(false)

  return (
    <Image
      style={{ width: '200px', height: 'auto' }}
      zoomed={zoomed}
      src={image}
      alt='enlarged comic image'
      onClick={() => setZoomed(true)}
      onRequestClose={() => setZoomed(false)}
    />
  )
}
export default EnlargeImage
