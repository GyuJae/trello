import { motion, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { getDetailRoom, updateRoomTodos } from "../firebase";
import IRoom from "../types/room.type";

interface IDoItem {
  category: "To Do" | "Doing" | "Done";
  roomName: string;
}

const Container = styled.div`
  color: ${(props) => props.theme.bgColor};
  font-size: 22px;
  font-weight: 600;
`;

const DoList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const DoItemli = styled.li`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

const Toggle = styled(motion.div)`
  margin: 5px 0px;
  opacity: 0.8;
  font-size: 20px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const PlusDoContainer = styled(motion.div)`
  padding: 5px 0px;
  scale: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
`;

const Form = styled(motion.form)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled(motion.input)`
  padding: 10px 10px;
  width: 290px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const SubmitInput = styled.input`
  background-color: #ab98e2;
  padding: 5px;
  border-radius: 5px;
  margin-left: 10px;
  outline: unset;
  border: none;
  font-weight: 700;
  font-size: 17px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};
  }
`;

const plusVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    x: -100,
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    display: "none",
  },
};

const toggleVariants: Variants = {
  open: {
    marginLeft: 3,
  },
  closed: {},
};

interface IForm {
  doText: string;
}

const DoItem: React.FC<IDoItem> = ({ category, roomName }) => {
  const [isOpenPlus, setIsOpenPlus] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [roomData, setRoomData] = useState<IRoom>();
  useEffect(() => {
    const getData = async () => {
      const data = await getDetailRoom(roomName);
      setRoomData(data as IRoom);
    };
    getData();
  }, [roomName]);
  const onSubmit: SubmitHandler<IForm> = async ({ doText }) => {
    await updateRoomTodos({
      roomName,
      category,
      newDoText: doText,
    });
    setRoomData((originRoom) => ({
      ...(originRoom as IRoom),
      dos: {
        Doing: [
          ...(originRoom?.dos.Doing as string[]),
          category === "Doing" ? doText : "",
        ],
        Done: [
          ...(originRoom?.dos.Done as string[]),
          category === "Done" ? doText : "",
        ],
        "To Do": [
          ...(originRoom?.dos["To Do"] as string[]),
          category === "To Do" ? doText : "",
        ],
      },
    }));
    setValue("doText", "");
  };

  return (
    <Container>
      {category}
      <DoList>
        {roomData?.dos[category].map((doValue, index) => (
          <DoItemli key={index}>{doValue}</DoItemli>
        ))}
      </DoList>

      <PlusDoContainer>
        <Toggle
          onClick={() => setIsOpenPlus((prev) => !prev)}
          variants={toggleVariants}
          animate={isOpenPlus ? "open" : "closed"}
        >
          {isOpenPlus ? "✖" : "➕"}
        </Toggle>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          animate={isOpenPlus ? "open" : "closed"}
          variants={plusVariants}
        >
          <Input {...register("doText")} type="text" />
          <SubmitInput value={"save"} type="submit" />
        </Form>
      </PlusDoContainer>
    </Container>
  );
};

export default DoItem;
