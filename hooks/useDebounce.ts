import React, { useEffect, useState } from "react";

export const useDebounce = (val: string, time = 300) => {
  const [value, setValue] = useState<string>(val);
  useEffect(() => {
    const id = setTimeout(() => {
      setValue(val);
    }, time);
    return () => {
      clearTimeout(id);
    };
  }, [val, time]);
  return value;
};
