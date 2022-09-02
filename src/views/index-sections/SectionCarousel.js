import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "100%",
  maxHeight: "360px",
  color: "#fff",
  lineHeight: "500px",
  textAlign: "center",
  background: "#364d79",
};

function SectionCarousel() {
  
  return (
    <Carousel autoplay >
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
  );
}

export default SectionCarousel;
