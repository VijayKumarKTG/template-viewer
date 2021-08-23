import { useState } from 'react';
import styles from './Carousel.module.css';
import m7111 from './images/thumbnails/7111-m.jpg';
import m7112 from './images/thumbnails/7112-m.jpg';
import m7118 from './images/thumbnails/7118-m.jpg';
import m7124 from './images/thumbnails/7124-m.jpg';
import m7130 from './images/thumbnails/7130-m.jpg';
import m7131 from './images/thumbnails/7131-m.jpg';
import m7141 from './images/thumbnails/7141-m.jpg';
import m7143 from './images/thumbnails/7143-m.jpg';
import m7147 from './images/thumbnails/7147-m.jpg';
import m7150 from './images/thumbnails/7150-m.jpg';
import m7152 from './images/thumbnails/7152-m.jpg';
import m7155 from './images/thumbnails/7155-m.jpg';
import m7160 from './images/thumbnails/7160-m.jpg';
import m7162 from './images/thumbnails/7162-m.jpg';
import m7164 from './images/thumbnails/7164-m.jpg';
import previous from './images/previous.svg';
import next from './images/next.svg';

export default function Carousel({ length, chooseFromThumbs }) {
  const [currentStep, setCurrentStep] = useState(0);
  const items = arrageData(length, [
    m7111,
    m7112,
    m7118,
    m7124,
    m7130,
    m7131,
    m7141,
    m7143,
    m7147,
    m7150,
    m7152,
    m7155,
    m7160,
    m7162,
    m7164,
  ]);

  function clickPrevious() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function clickNext() {
    if (items.length > currentStep + 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function arrageData(length, array) {
    let arrangedArr = [],
      copiedArr = [...array];
    for (let i = 0; i < array.length; i += length) {
      if (copiedArr.length > length) {
        arrangedArr.push(copiedArr.splice(0, length));
      } else {
        arrangedArr.push(copiedArr.splice(0));
      }
    }
    return arrangedArr;
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.navigation}>
        <div
          className={`${styles.previous} ${
            currentStep === 0 ? styles.disabled : null
          }`}
          onClick={clickPrevious}>
          <img
            src={previous}
            alt='click this to view previous images'
            className={styles.icon}
          />
        </div>
        <div
          className={`${styles.next} ${
            currentStep === items.length - 1 ? styles.disabled : null
          }`}
          onClick={clickNext}>
          <img
            src={next}
            alt='click this to view next images'
            className={styles.icon}
          />
        </div>
      </div>
      <ul className={styles.items}>
        {items.map((item, i) => {
          let list = item.map((e, itemIndex) => (
            <li
              key={e}
              className={styles.item}
              onClick={() => chooseFromThumbs(length * i + itemIndex)}>
              <img src={e} alt='a cat' className={styles.thumbnail} />
            </li>
          ));
          return (
            <div
              className={`${styles.thumbView} ${
                currentStep === i ? styles.active : null
              }`}
              key={item.join('')}>
              {list}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
