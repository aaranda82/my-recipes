import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

//other logic
const SpinnerLoader = (): ReactElement => {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontFamily: "#00BFFF",
          margin: "30px",
        }}>
        ...LOADING
      </div>
      <div
        style={{
          textAlign: "center",
        }}>
        <Loader
          type="Oval"
          color="#00BFFF"
          height={150}
          width={150}
          timeout={5000} //3 secs
        />
      </div>
    </>
  );
};

export default SpinnerLoader;
