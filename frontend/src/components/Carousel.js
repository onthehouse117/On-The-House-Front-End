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
      "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/46368189_10155820237185906_6751427953516609536_n.jpg?_nc_cat=106&_nc_oc=AQlPTscv5zSJzF9UqkOHtARTodhST64CYBB5Sr5hpmhIqOvMSDzFj_PZ6gkXGvvqtPw&_nc_ht=scontent-lax3-1.xx&oh=b21ef0f2720cf8c248848d3cf492faf4&oe=5E1E6283",
    altText: "Plaza Verde",
    caption: "Plaza Verde"
  },
  {
    src:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/46432635_10155820236750906_4016135674091536384_n.jpg?_nc_cat=110&_nc_oc=AQnlLcbTumwHDu2o9HGIMxlIFZwUdx5fiJDs9wiNEmImTCKBhhs_d5iX6xYHaWrmK1I&_nc_ht=scontent-lax3-1.xx&oh=57a9348134a161dc7fa304d5dd76d6f0&oe=5E22BFF6",
    altText: "Peurta Del Sol",
    caption: "Peurta Del Sol"
  },
  {
    src:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/46311956_10155820236635906_7449249736982265856_n.jpg?_nc_cat=108&_nc_oc=AQn9DmbbdgESFOSeiNAzy78ANZCPq8CqulznFbNCn9VPeLJrvZ_tdu7XcFrxsC2ys5E&_nc_ht=scontent-lax3-1.xx&oh=7efb6dbb8f9ebd620cb83f8061e396f9&oe=5E5249C7",
    altText: "Vista Del Campo Norte",
    caption: "Vista Del Campo Norte"
  },
  {
    src:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/46348673_10155820236850906_5855840677169987584_n.jpg?_nc_cat=111&_nc_oc=AQmURCCJnWLs4bslT4qDKps7F26d2XkRf36-NavFjN2jw4SSdA13xXp3bAtJbqvkAno&_nc_ht=scontent-lax3-1.xx&oh=9f22316c8ee5b72105713d785228af33&oe=5E51E9F5",
    altText: "Camino Del Sol",
    caption: "Camino Del Sol"
  },
  {
    src:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/46303967_10155820237045906_8091344590365261824_o.jpg?_nc_cat=111&_nc_oc=AQkvlnk54DYQFN7YiYQPzZUWkEtJpO_6z0fS4bPoP4PjfD5IyFjG3ZcVMO1KQhLKDJU&_nc_ht=scontent-lax3-1.xx&oh=a420426a29c07315521c5f667f7750bd&oe=5E4D31E4",
    altText: "Vista Del Campo",
    caption: "Camino Del Sol"
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
