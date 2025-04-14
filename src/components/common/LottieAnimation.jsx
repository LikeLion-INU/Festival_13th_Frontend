import React from "react";
import Lottie from "react-lottie";

const LottieAnimation = ({
  animationData,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
}) => {
  const defaultOptions = {
    loop: loop,
    autoplay: autoplay,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="lottie-animation">
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default LottieAnimation;
