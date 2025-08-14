import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setRatings } from "../slices/ratings";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export const ReviewCard = () => {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.ratings.ratings);
  useEffect(() => {
    const loading = toast.loading("Reviews loading");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ratings/getRatings`)
      .then((res) => {
        dispatch(setRatings(res.data.ratings));
        toast.dismiss(loading);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loading);
      });
  }, []);
  return (
    <div>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {ratings.length === 0 ? (
          <SwiperSlide>
            {" "}
            <div className="flex items-center justify-center h-full">
              NO RATINGS UPLOADED TO DISPLAY
            </div>{" "}
          </SwiperSlide>
        ) : (
          ratings.map((rating) => (
            <SwiperSlide key={rating._id}>
              <div className="bg-white shadow-lg rounded-lg p-6 min-h-[220px] flex flex-col justify-center items-center text-center border border-gray-200">
                <span className="text-2xl font-bold mb-2">
                  {rating.rating}⭐ {rating.review}
                </span>
                <span className="text-xl font-medium text-gray-700 mb-1">
                  {rating.course.name}
                </span>
                <span className="text-md font-normal text-gray-500">
                  {rating.user.firstName} {rating.user.lastName}
                </span>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};
