import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

import './Carousel.css';

const items = [
  {
    src:
      "http://ktgy.com/wp-content/uploads/2017/08/Plaza-Verde-UCI-American-Campus-Communities-Undergraduate-Student-Housing-KTGY-16-2000x1335.jpg",
    altText: "Plaza Verde",
    caption: "Plaza Verde"
  },
  {
    src:
      "http://ktgy.com/wp-content/uploads/2015/11/UC-Irvine-Puerta-del-Sol_00-5_-2000x1260.jpg",
    altText: "Puerta Del Sol",
    caption: "Puerta Del Sol"
  },
  {
    src:
      "https://static.wixstatic.com/media/6098a4_dd706b2c3a1f4495960ef27a7b581b6c.jpg",
    altText: "Vista Del Campo Norte",
    caption: "Vista Del Campo Norte"
  },
  {
    src:
      "http://ktgy.com/wp-content/uploads/2015/11/UC-Irvine-Camino-del-Sol_00-4-2000x1332.jpg",
    altText: "Camino Del Sol",
    caption: "Camino Del Sol"
  },
  {
    src:
      "https://static.wixstatic.com/media/47443b_3504201c6bec4f37a93314ae1e356b2c.jpg",
    altText: "Vista Del Campo",
    caption: "Vista Del Campo"
  },
];

const Example = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="d-block w-100" src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default Example;
