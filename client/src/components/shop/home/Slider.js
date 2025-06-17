import React, { Fragment, useEffect, useContext, useState, useRef } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";

const Slider = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);
  const sliderInterval = useRef(null);

  const totalSlides = data?.sliderImages?.length || 0;

  useEffect(() => {
    sliderImages(dispatch);
  }, [dispatch]);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (totalSlides > 1) {
      sliderInterval.current = setInterval(() => {
        setSlide((prev) => (prev + 1) % totalSlides);
      }, 4000);
    }

    return () => clearInterval(sliderInterval.current);
  }, [totalSlides]);

  // Pause auto-scroll on hover
  const pauseSlider = () => clearInterval(sliderInterval.current);
  const resumeSlider = () => {
    sliderInterval.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
  };

  return (
    <Fragment>
      <div
        className="relative mt-16 bg-gray-100 border-2 overflow-hidden"
        onMouseEnter={pauseSlider}
        onMouseLeave={resumeSlider}
        style={{
          width: "100%",
          maxHeight: "400px",
          height: "400px",
        }}
      >
        {totalSlides > 0 && (
          <img
            src={`http://localhost:8000/uploads/customize/${data.sliderImages[slide].slideImage}`}
            alt="sliderImage"
            className="w-full h-full object-contain transition-opacity duration-1000 ease-in-out"
            style={{ animation: "fadein 1s" }}
          />
        )}

        {totalSlides > 1 && (
          <>
            {/* Left Arrow */}
            <svg
              onClick={() => prevSlide(totalSlides, slide, setSlide)}
              className="z-10 absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 text-white bg-black bg-opacity-50 rounded-full p-2 cursor-pointer hover:text-yellow-400 transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>

            {/* Right Arrow */}
            <svg
              onClick={() => nextSlide(totalSlides, slide, setSlide)}
              className="z-10 absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 text-white bg-black bg-opacity-50 rounded-full p-2 cursor-pointer hover:text-yellow-400 transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            {/* CTA Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="#shop"
                className="bg-black bg-opacity-70 text-white px-5 py-3 text-lg rounded hover:bg-yellow-600 transition"
              >
                Shop Now
              </a>
            </div>
          </>
        )}
      </div>

      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
