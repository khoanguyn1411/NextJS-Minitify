"use client";

import { type FC, type PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
