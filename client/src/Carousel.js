import { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './Carousel.css';
import previous from './images/previous.svg';
import next from './images/next.svg';

export default function Carousel({
  length,
  thumbImgs,
  chooseFromThumbs,
  activeImage,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [animate, setAnimate] = useState('next');
  const items = arrageData(length, thumbImgs);

  function clickPrevious() {
    if (currentStep > 0) {
      setAnimate('prev');
      setCurrentStep(currentStep - 1);
    }
  }

  function clickNext() {
    if (items.length > currentStep + 1) {
      setAnimate('next');
      setCurrentStep(currentStep + 1);
    }
  }

  function arrageData(length, array) {
    if (length && array) {
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
    return [];
  }

  return items.length ? (
    <>
      <div className='container' style={{ zIndex: 5 }}>
        <div
          className={`previous ${currentStep === 0 ? 'disabled' : null}`}
          onClick={clickPrevious}>
          <img
            src={previous}
            alt='click this to view previous images'
            className='icon'
          />
        </div>
        <div
          className={`next ${
            currentStep === items.length - 1 ? 'disabled' : null
          }`}
          onClick={clickNext}>
          <img
            src={next}
            alt='click this to view next images'
            className='icon'
          />
        </div>
      </div>

      <div className='container'>
        <div className='carousel'>
          <SwitchTransition mode='out-in'>
            <CSSTransition
              key={currentStep}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false);
              }}
              classNames={animate === 'next' ? 'slideLeft' : 'slideRight'}>
              <div>
                {items.length
                  ? items.map((item, i) => {
                      let list = item.map((e, itemIndex) => (
                        <li
                          key={e}
                          className='item'
                          onClick={() =>
                            chooseFromThumbs(length * i + itemIndex)
                          }>
                          <img
                            src={e}
                            alt='a cat'
                            className={
                              activeImage === e
                                ? 'thumbnail active'
                                : 'thumbnail'
                            }
                          />
                        </li>
                      ));
                      return currentStep === i ? (
                        <ul className='thumbView' key={item.join('')}>
                          {list}
                        </ul>
                      ) : null;
                    })
                  : 'Loading'}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </>
  ) : (
    <div className='container'>
      <div className='carousel sk-carousel'>
        <div className='sk-box'></div>
        <div className='sk-box'></div>
        <div className='sk-box'></div>
        <div className='sk-box'></div>
      </div>
    </div>
  );
}
