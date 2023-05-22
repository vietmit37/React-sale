import { actGetBookId } from "@/redux/book/bookSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ViewDetail from "./viewDetail";
import { unwrapResult } from "@reduxjs/toolkit";
import { URL_BACKEND } from "@/utils/config";
import { useState } from "react";
import BookLoader from "./bookLoader";

const BookDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [bookIdState, setBookIdState] = useState(null);
  const params = new URLSearchParams(location.search);
  const queryId = params?.get("id");

  const fetchId = async (id) => {
    const res = await dispatch(actGetBookId(id));
    let actRes = unwrapResult(res);
    if (actRes) {
      const dataNew = Object.assign({ items: getImg(actRes) }, actRes);
      setTimeout(() => {
        setBookIdState(dataNew);
      }, 300);
    }
  };
  const getImg = (items) => {
    const images = [];
    if (items.thumbnail) {
      images.push({
        original: `${URL_BACKEND}/images/book/${items.thumbnail}`,
        thumbnail: `${URL_BACKEND}/images/book/${items.thumbnail}`,
        originalClass: "original-img",
        thumbnailClass: "thumbnail-img",
      });
    }
    if (items.slider) {
      items?.slider?.map((item) => {
        images.push({
          original: `${URL_BACKEND}/images/book/${item}`,
          thumbnail: `${URL_BACKEND}/images/book/${item}`,
          originalClass: "original-img",
          thumbnailClass: "thumbnail-img",
        });
      });
    }
    return images;
  };
  useEffect(() => {
    fetchId(queryId);
  }, [queryId]);
  console.log(bookIdState);
  return (
    <div>
      {bookIdState && bookIdState._id ? (
        <>
          <ViewDetail bookIdState={bookIdState} />
        </>
      ) : (
        <BookLoader />
      )}
    </div>
  );
};

export default BookDetail;
