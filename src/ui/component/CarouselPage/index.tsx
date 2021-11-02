import React from "react";
import {Carousel} from "react-bootstrap";
import img1 from "./image/img-1.jpeg";
import img2 from "./image/img-2.jpeg";
import img3 from "./image/img-3.jpeg";
import img4 from "./image/img-4.jpeg";
import img5 from "./image/img-5.jpeg";
import "./index.css";

export default function CarouselPage() {
    return (
        <div>
            <Carousel fade className="carousel-box">
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src={img1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <div className="text-wrapper">
                            <h4>Sourcing the finest green beans  from around the world.</h4>
                        </div>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src={img4}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <div className="text-wrapper">
                            <h4>From farm to home.</h4>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src={img3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <div className="text-wrapper">
                            <h4>Roasting with ❤️ from HK.</h4>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}