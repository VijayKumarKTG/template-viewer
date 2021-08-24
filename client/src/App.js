import { useState } from 'react';
import './App.css';
import b7111 from './images/large/7111-b.jpg';
import b7112 from './images/large/7112-b.jpg';
import b7118 from './images/large/7118-b.jpg';
import b7124 from './images/large/7124-b.jpg';
import b7130 from './images/large/7130-b.jpg';
import b7131 from './images/large/7131-b.jpg';
import b7141 from './images/large/7141-b.jpg';
import b7143 from './images/large/7143-b.jpg';
import b7147 from './images/large/7147-b.jpg';
import b7150 from './images/large/7150-b.jpg';
import b7152 from './images/large/7152-b.jpg';
import b7155 from './images/large/7155-b.jpg';
import b7160 from './images/large/7160-b.jpg';
import b7162 from './images/large/7162-b.jpg';
import b7164 from './images/large/7164-b.jpg';
import Carousel from './Carousel';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const largeImgs = [
    b7111,
    b7112,
    b7118,
    b7124,
    b7130,
    b7131,
    b7141,
    b7143,
    b7147,
    b7150,
    b7152,
    b7155,
    b7160,
    b7162,
    b7164,
  ];

  return (
    <div className='App'>
      <div className='largeImg'>
        <img src={largeImgs[currentImage]} alt='a cat' />
      </div>
      <div className='info'>
        <p>Name:</p>
        <p>User:</p>
        <p>Reference:</p>
      </div>
      <Carousel length={4} chooseFromThumbs={setCurrentImage} />
    </div>
  );
}

export default App;
