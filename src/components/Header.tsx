import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { authService } from "../firebase";
import { FaTrello } from "react-icons/fa";
import { motion } from "framer-motion";

const Container = styled.header`
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
`;

const WhiteBox = styled.div`
  height: 40px;
  width: 40px;
  background-color: rgba(250, 250, 250, 0.5);
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 30px;
  opacity: 0.5;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled(motion.img)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Header = () => {
  const [user, loading] = useAuthState(authService);
  return (
    <Container>
      <WhiteBox></WhiteBox>
      <Title>
        <FaTrello style={{ marginRight: 5 }} />
        <div>Trello</div>
      </Title>
      {loading ? (
        <span>loading</span>
      ) : (
        <Avatar
          src={
            user?.photoURL
              ? user?.photoURL
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
          }
          whileHover={{
            scale: 1.2,
          }}
        />
      )}
    </Container>
  );
};

export default Header;
