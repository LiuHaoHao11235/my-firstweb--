import { useState } from "react";
import styled from "styled-components";

const defaultType = {
  styled: {
    color: "rgb(0, 0, 0, 0.7)",
    background: "rgb(128, 128, 128, 0.1)",
    width: "100px",
    height: "40px",
  },
  hover: {
    color: "rgb(0, 0, 0, 0.7)",
    background: "grey",
  },
};
const primaryType = {
  styled: {
    background: "#b90b26",
    color: "aliceblue",
    width: "170px",
    height: "40px",
  },
};
const dashType = {
  styled: {
    width: "170px",
    height: "40px",
    color: "red",
    backgroundcolor: "blue",
    border: "dash",
  },
};

const variantBox = {
  default: defaultType,
  primary: primaryType,
  dash: dashType,
};
const Stylebutton = styled.button`
  margin-right: 30px;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  transition: all 0.1s linear;
  ${(props) => {
    if (variantBox[props.variant]) {
      return props.variant.styled;
    } else {
      return defaultType.styled;
    }
  }};
  &:hover {
    ${(props) => {
      if (variantBox[props.variant]) {
        return props.variant.hover;
      } else {
        return defaultType.hover;
      }
    }};
  }
`;
const Button = (props) => {
  const [loadState, setLoadState] = useState({
    isloading: false,
  });
  const handleonclick = () => {
    if (loadState.isloading) {
      setLoadState((loadState.isloading = true));
    }
  };
  if (props.loading && !loadState.isloading) {
    setTimeout(() => {
      setLoadState((loadState.isloading = false));
    }, props.loading);
  }
  if (!loadState.isloading) {
    return (
      <Stylebutton
        {...props}
        onClick={() => {
          handleonclick();
          props.onClick();
        }}
      ></Stylebutton>
    );
  } else {
    return <Stylebutton {...props}>載入中</Stylebutton>;
  }
};
export default Button;
