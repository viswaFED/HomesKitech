import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/RecipeCarousel.css';
import { Link } from "react-router-dom";

const RecipieCarousel = ({ recipes }) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 768, // mobile breakpoint
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };


    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {recipes.map((item, index) => (
                    <div key={index} className="carousel-item">
                        <Link to={`/recipe/${item.id}/${item.title}`}>
                            <img
                                src={item.image}
                                alt={`Template ${index + 1}`}
                                className="carousel-image"
                            />
                            <div className="carousel-caption">
                                <h6>{item.title}</h6>
                                <p>ready in {item.readyInMinutes}min</p>
                            </div>
                        </Link>
                    </div>
                ))
                }
            </Slider>
        </div>
    );
};

export default RecipieCarousel;
