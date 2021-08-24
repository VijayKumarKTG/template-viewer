import { useState, useEffect } from 'react';
import './App.css';
import Carousel from './Carousel';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [largeImages, setLargeImages] = useState(null);
  const [smallImages, setSmallImages] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('http://localhost:3001/images');
      let images = await response.json();
      setLargeImages(images.items);
      setSmallImages(images.items.map((image) => image.thumbImg));
    }
    fetchData();
    return () => {
      //cleanup
    };
  }, [setLargeImages, setSmallImages]);

  return largeImages && smallImages ? (
    <div className='App'>
      <div className='largeImg'>
        <img
          src={largeImages[currentImage].regularImg}
          alt={largeImages[currentImage].altDesc}
        />
      </div>
      <div className='info'>
        <p>Image id:{largeImages[currentImage].id}</p>
        <p>description:{largeImages[currentImage].description}</p>
        <p>Created on:{largeImages[currentImage].createdOn}</p>
        <p>Photographer:{largeImages[currentImage].username}</p>
        <p>Profile:{largeImages[currentImage].profile}</p>
        <p>Profile image:{largeImages[currentImage].profileImg}</p>
      </div>
      <Carousel
        length={4}
        thumbImgs={smallImages}
        chooseFromThumbs={setCurrentImage}
      />
    </div>
  ) : (
    'Loading...'
  );
}

export default App;
