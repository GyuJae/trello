import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import DetailRoom from "../components/DetailRoom";
import Header from "../components/Header";
import { authService, getRooms, setRoom } from "../firebase";
import IRoom from "../types/room.type";

const Container = styled.div``;

interface IForm {
  roomName: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  input::placeholder {
    color: white;
  }
`;

const MakeContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  all: unset;
  outline: none;
  padding: 5px;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
`;

const Submit = styled.input`
  all: unset;
  background-color: rgba(250, 250, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 10px 0px;
  border-radius: 5px;
  margin-left: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  &:hover {
    cursor: pointer;
  }
`;

const RoomList = styled(motion.div)`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  width: 500px;
  margin: 0px auto;
  border-radius: 5px;
`;

const Room = styled(motion.div)`
  background-color: ${(props) => props.theme.roomColor};
  border-radius: 5px;
  width: 90%;
  padding: 10px;
  margin: 5px auto;
  color: ${(props) => props.theme.bgColor};
  font-weight: 700;
`;

const Home = () => {
  const { register, handleSubmit } = useForm<IForm>();
  const [user, loading] = useAuthState(authService);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [detailRoomId, setDetailRoomId] = useState<string>("");
  const history = useHistory();
  const useMatchRoomId = useRouteMatch<{ roomId: string }>("/:roomId");
  const onSubmit: SubmitHandler<IForm> = ({ roomName }) => {
    if (user) {
      setRoom({
        roomName,
        user,
      });
    }
    history.go(0);
  };
  useEffect(() => {
    const getData = async () => {
      const data = await getRooms();
      setRooms(data as IRoom[]);
    };
    getData();
  }, []);
  const onClickRoom = ({
    currentTarget: { id },
  }: React.MouseEvent<HTMLDivElement>) => {
    setDetailRoomId(id);
    history.push({
      pathname: `/${id}`,
    });
  };
  return (
    <Container>
      <Header />
      {loading ? (
        <span>Loading</span>
      ) : (
        <AnimateSharedLayout>
          <MakeContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("roomName")}
                autoComplete="off"
                placeholder="Room Name"
              />
              <Submit type="submit" value="Make" />
            </Form>
          </MakeContainer>
          <RoomList>
            {rooms.map((room) => (
              <Room
                key={room.id}
                id={room.id}
                layoutId={room.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{
                  scale: 0.8,
                }}
                onClick={onClickRoom}
              >
                {room.name}
              </Room>
            ))}
          </RoomList>
          {useMatchRoomId?.isExact && (
            <AnimatePresence>
              <DetailRoom
                layoutId={useMatchRoomId.params.roomId}
                room={rooms.filter((room) => room.id === detailRoomId)[0]}
              />
            </AnimatePresence>
          )}
        </AnimateSharedLayout>
      )}
    </Container>
  );
};

export default Home;
