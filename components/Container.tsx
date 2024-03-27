import { channel } from "diagnostics_channel";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="w-[1440px] mx-auto">{children}</div>;
};

export default Container;
