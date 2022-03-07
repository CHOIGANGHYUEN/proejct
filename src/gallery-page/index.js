import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Gallery() {
  var options = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div id="gallery">
      <section id="image-section">
        <Slider className="gallery-slider" {...options}>
          <img
            className="gallery-img"
            src="../images/map-image/ㄱ글썽춘식이.png"
          />
          <img className="gallery-img" src="../images/map-image/눕춘식이.png" />
          <img
            className="gallery-img"
            src="../images/map-image/춘식이눕기.png"
          />
        </Slider>
      </section>
    </div>
  );
}

export default Gallery;
