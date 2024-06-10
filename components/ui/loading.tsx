import React from "react";

export default function Loading() {
  return (
    <div className=" ml-3 w-5 h-5 self-center">
      <img
        src="/loading.gif"
        className=" w-full h-full object-contain"
        alt="processing"
      />
    </div>
  );
}
