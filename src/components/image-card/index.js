import { useState } from 'react';
import './ImageCard.css'

const ImageCard = ({ item }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="image-card">
        {loading ? 
          <img src='/Ellipsis.svg' alt='loading' className='image-loading' />
          : null}
          <img src={item.urls.small} 
            alt={item.alt_description} 
            loading='lazy' 
            className='image' 
            onLoad={() => setLoading(false)} />
    </div>
  )
}

export default ImageCard