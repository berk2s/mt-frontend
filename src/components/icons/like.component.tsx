import React from "react";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

function LikeIcon(props: IconProps) {
  return (
    <svg
      fill={props.color}
      width={props.width}
      height={props.height}
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 487.57 487.57"
      version="1.1"
      viewBox="0 0 487.57 487.57"
      xmlSpace="preserve"
    >
      <path d="M137.482 253.8c.7-2 1.5-4.2 2.4-6.5 3.8-9.4 10.1-20.9 19.9-31.2 46-35.3 94.2-168 94.2-168s-7.5-48.1 15-48.1 76 15 43.9 112.3c-32.1 97.4 0 82.4 0 82.4 7.4-1.7 14.2-3.1 20.7-4.2 0 0 92.7-20.8 126.9 10.5 27.4 25 6.1 58 6.1 58s38.5 34.3-.7 75.3c0 0 25.1 41.5-19 74.6 0 0 20.5 57.1-61.4 74.5-24.1 5.1-54.4 4.9-83 2.7-71.5 1.5-142.6-7.8-142.6-7.8l-46-200.1c13.9-8.4 20.5-18.1 23.6-24.4zM4.182 281l-.1 200h108.7c9.7 0 16-7.7 14-17.2l-34.8-165.6c-2-9.5-11.5-17.2-21.2-17.2h-66.6z"></path>
    </svg>
  );
}

export default LikeIcon;
