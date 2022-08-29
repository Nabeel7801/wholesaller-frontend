import React from "react";

// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  CarouselControl,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

// core components
import { Carousel } from "antd";

function onChange(a, b, c) {
  ////console.log(a, b, c);
}

const contentStyle = {
  height: "100%",
  maxHeight: "360px",
  color: "#fff",
  lineHeight: "500px",
  textAlign: "center",
  background: "#364d79",
};

const items = [
  {
    src: require("assets/img/soroush-karimi.jpg"),
    altText: "Somewhere",
    caption: "Somewhere",
  },
  {
    src: require("assets/img/federico-beccari.jpg"),
    altText: "Somewhere else",
    caption: "Somewhere else",
  },
  {
    src: require("assets/img/joshua-stannard.jpg"),
    altText: "Here it is",
    caption: "Here it is",
  },
];

function SectionCarousel() {
  // const [activeIndex, setActiveIndex] = React.useState(0);
  // const [animating, setAnimating] = React.useState(false);
  // const onExiting = () => {
  //   setAnimating(true);
  // };
  // const onExited = () => {
  //   setAnimating(false);
  // };
  // const next = () => {
  //   if (animating) return;
  //   const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
  //   setActiveIndex(nextIndex);
  // };
  // const previous = () => {
  //   if (animating) return;
  //   const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
  //   setActiveIndex(nextIndex);
  // };
  // const goToIndex = (newIndex) => {
  //   if (animating) return;
  //   setActiveIndex(newIndex);
  // };

  return (
    <>
      <Carousel autoplay afterChange={onChange}>
        <div>
          <h3 style={contentStyle}>
            <img
              class="ui fluid image"
              src={require("assets/img/slide-01.jpg")}
            />
            1
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src={require("assets/img/slide-02.jpg")} />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src={require("assets/img/slide-03.jpg")} />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src={require("assets/img/slide-04.jpg")} />
          </h3>
        </div>
      </Carousel>

      {/*      
              <Card className="page-carousel">
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                >
                  <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                  />
                  {items.map((item) => {
                    return (
                      <CarouselItem
                        onExiting={onExiting}
                        onExited={onExited}
                        key={item.src}
                      >
                        <img src={item.src} alt={item.altText} />

                 
      <CarouselCaption
                         style={{color:'white'}}
                          captionText={item.caption}
                          captionHeader="sgsg"
                       
                        />
              

                      </CarouselItem>
                    );
                  })}
                  <a
                    className="left carousel-control carousel-control-prev"
                    data-slide="prev"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      previous();
                    }}
                    role="button"
                  >
                    <span className="fa fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="right carousel-control carousel-control-next"
                    data-slide="next"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      next();
                    }}
                    role="button"
                  >
                    <span className="fa fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </a>
                </Carousel>
              </Card> */}
    </>
  );
}

export default SectionCarousel;
