import { useState, useEffect } from 'react';
import './App.css';
import Carousel from './Carousel';
import file from './images/file.svg';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [largeImages, setLargeImages] = useState(null);
  const [smallImages, setSmallImages] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('http://localhost:3001/images');
      let images = await response.json();
      let largeImgs = images.items;
      let smallImgs = images.items.map((image) => image.regularImg);
      smallImgs.forEach((image) => {
        let newImage = new Image();
        newImage.src = image;
      });
      setLargeImages(largeImgs);
      setSmallImages(smallImgs);
    }
    fetchData();
    return () => {
      //cleanup
    };
  }, [setLargeImages, setSmallImages]);

  return largeImages && smallImages ? (
    <div className='App'>
      <div className='imageViewer'>
        <div className='largeImgContainer'>
          <a
            href={largeImages[currentImage].regularImg}
            target='_blank'
            rel='noreferrer'>
            <img
              className='largeImg'
              src={largeImages[currentImage].regularImg}
              alt={largeImages[currentImage].altDesc}
            />
          </a>
          <div className='info'>
            <div className='imgDetails'>
              <p>Image id: {largeImages[currentImage].id}</p>
              <p>description: {largeImages[currentImage].description}</p>
              <p>
                Created on:{' '}
                {new Date(largeImages[currentImage].createdOn).toUTCString()}
              </p>
              <p>
                Photographer:{' '}
                <a
                  href={largeImages[currentImage].profile}
                  rel='noreferrer'
                  target='_blank'>
                  {largeImages[currentImage].username}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Carousel
        length={4}
        thumbImgs={smallImages}
        chooseFromThumbs={setCurrentImage}
      />
    </div>
  ) : (
    <div className='App'>
      <div className='imageViewer'>
        <div className='largeImgContainer sk-largeImgContainer'>
          <div className='sk-largeImg'>
            <img className='sk-image' src={file} alt='file icon' />
          </div>
          <div className='info'>
            <div className='imgDetails sk-info'>
              <div className='sentence'></div>
              <div className='sentence short'></div>
              <div className='sentence exshort'></div>
              <div className='sentence'></div>
            </div>
          </div>
        </div>
      </div>
      <Carousel
        length={4}
        thumbImgs={smallImages}
        chooseFromThumbs={setCurrentImage}
      />
    </div>
  );
}

export default App;
