import React from "react";
import { ImSpinner8 } from "react-icons/im";

export default function Loader({ black }: { black?: boolean }) {
  return (
    <ImSpinner8 className={`login__spinner ${black && "black--spinner"} `} />
  );
}
