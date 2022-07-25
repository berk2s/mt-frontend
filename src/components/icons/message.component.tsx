import React from "react";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

function MessageIcon(props: IconProps) {
  return (
    <svg
      fill={props.color}
      width={props.width}
      height={props.height}
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 297 297"
      version="1.1"
      viewBox="0 0 297 297"
      xmlSpace="preserve"
    >
      <path d="M206.093 181.516c17.379 0 31.515-14.138 31.515-31.515V54.593c0-17.378-14.136-31.518-31.515-31.518H31.51C14.135 23.075 0 37.215 0 54.593v95.408c0 17.377 14.135 31.515 31.51 31.515h22.933v32.988a9.916 9.916 0 0016.927 7.011l39.991-39.999h94.732z"></path>
      <path d="M269.415 105.583h-15.944v44.418c0 26.125-21.253 47.378-47.378 47.378h-88.161l-18.537 18.542c2.234 12.987 13.567 22.902 27.181 22.902h76.762l32.191 32.196a9.914 9.914 0 0016.926-7.011v-25.186h16.961c15.211 0 27.585-12.378 27.585-27.591V133.17c-.001-15.211-12.375-27.587-27.586-27.587z"></path>
    </svg>
  );
}

export default MessageIcon;
