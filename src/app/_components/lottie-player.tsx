"use client";
import { useLottie } from "lottie-react";

export default function LottiePlayer({
  animationData,
  size,
}: {
  animationData: object;
  size?: number | string;
}) {
  const defaultOptions = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className="flex items-center justify-center">
        {/* Apply explicit width and height using inline styles */}
        <div
          className="overflow-hidden"
          style={{
            width: size ? `${size}rem` : "16rem",
            height: size ? `${size}rem` : "16rem",
          }}
        >
          {View}
        </div>
      </div>
    </>
  );
}
