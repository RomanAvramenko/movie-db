import React from "react";
import "./Trailer.scss";

export const Trailer = (props) => {
  return (
    <iframe
      className="video"
      title="trailer"
      width="560"
      height="315"
      src={`//www.youtube.com/embed/${props.trailerKey}?autoplay=1`}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};
