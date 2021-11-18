import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { onGoogleLogin } from "../firebase";

const GoogleProviderContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  width: 180px;
  border-radius: 8px;
  margin: 0px auto;
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
  }
`;

const iconYellow = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "#fbc02d",
  },
};

const iconRed = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "#e53935",
  },
};

const iconGreen = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "#4caf50",
  },
};

const iconBlue = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "#1565c0",
  },
};

const LoginGoogle = styled.div``;

const ContainerVar = {
  init: { scale: 1 },
  hover: {
    scale: 1.1,
    color: "#7400AD",
    borderColor: "#7400AD",
    fontWeight: 700,
  },
};

const Auth = () => {
  return (
    <GoogleProviderContainer
      variants={ContainerVar}
      initial="init"
      whileHover="hover"
      onClick={onGoogleLogin}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="30px"
        height="30px"
      >
        <motion.path
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          variants={iconYellow}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: "easeInOut" },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
        />
        <motion.path
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          variants={iconRed}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: "easeIn" },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
        />
        <motion.path
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          variants={iconGreen}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: "easeInOut" },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
        />
        <motion.path
          d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          variants={iconBlue}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: "easeInOut" },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
        />
      </motion.svg>
      <LoginGoogle>Google Login</LoginGoogle>
    </GoogleProviderContainer>
  );
};

export default Auth;
