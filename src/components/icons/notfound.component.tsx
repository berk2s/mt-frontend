import React from "react";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

function NotFoundIcon(props: IconProps) {
  return (
    <svg
      fill={props.color}
      width={props.width}
      height={props.height}
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 490 490"
      version="1.1"
      viewBox="0 0 490 490"
      xmlSpace="preserve"
    >
      <path d="M69.086 490h351.829C459.001 490 490 459.001 490 420.914V69.086C490 30.991 459.001 0 420.914 0H69.086C30.999 0 0 30.991 0 69.086v351.829C0 459.001 30.999 490 69.086 490zm263.263-357.353c23.551 0 42.642 19.091 42.642 42.641 0 23.551-19.091 42.642-42.642 42.642-23.55 0-42.641-19.091-42.641-42.642 0-23.55 19.091-42.641 42.641-42.641zm38.261 206.95l-18.303 24.554c-105.797-78.91-210.188-3.26-214.584 0l-18.333-24.539c1.256-.928 126.806-92.825 251.22-.015zm-212.959-206.95c23.55 0 42.641 19.091 42.641 42.641 0 23.551-19.091 42.642-42.641 42.642-23.551 0-42.642-19.091-42.642-42.642 0-23.55 19.091-42.641 42.642-42.641z"></path>
    </svg>
  );
}

export default NotFoundIcon;
