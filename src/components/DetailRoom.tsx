import { motion } from "framer-motion";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import IRoom from "../types/room.type";
import DoItem from "./DoItem";
interface IDetailRoom {
  layoutId: string;
  room: IRoom;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const RoomTitle = styled.div`
  margin: 20px 0px;
  h1 {
    font-size: 25px;
    font-weight: 700;
    color: ${(props) => props.theme.bgColor};
  }
`;

const TodoContainer = styled(motion.div)`
  position: absolute;
  top: 10px;
  width: 1300px;
  height: 700px;
  margin: 10px auto;
  background-color: #ab98e2;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const GetListStyle = styled.div<{ isDraggingOver: boolean }>`
  background: ${(props) => (props.isDraggingOver ? "#9e8dd3" : "transparent")};
  display: flex;
  width: 1250px;
  padding: 10px;
  overflow: auto;
  justify-content: center;
`;

const GetItemStyle = styled.div<{ isDragging: boolean }>`
  user-select: none;
  padding: 6px;
  margin: 0 10px 0 0;
  background: ${(props) =>
    props.isDragging ? "#e9e7e7" : props.theme.roomColor};
  width: 400px;
  border-radius: 10px;
`;

const DetailRoom: React.FC<IDetailRoom> = ({ layoutId, room }) => {
  const history = useHistory();

  const [caseSeq, setCaseSeq] = useState<string[]>(["To Do", "Doing", "Done"]);

  const ModalClick = () => {
    history.push("/");
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    setCaseSeq((original) => {
      const slice = original.filter((_, idx) => idx !== source.index);
      slice.splice(destination.index, 0, original[source.index]);
      return slice;
    });
  };

  return (
    <Container>
      <Modal onClick={ModalClick}></Modal>
      <TodoContainer layoutId={layoutId}>
        <RoomTitle>
          <h1>{room.name}</h1>
        </RoomTitle>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <GetListStyle
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                {...provided.droppableProps}
              >
                {caseSeq.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided, snapshot) => (
                      <GetItemStyle
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                        isDragging={snapshot.isDragging}
                      >
                        <DoItem
                          category={item as "To Do" | "Doing" | "Done"}
                          roomName={room.name}
                        />
                      </GetItemStyle>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </GetListStyle>
            )}
          </Droppable>
        </DragDropContext>
      </TodoContainer>
    </Container>
  );
};

export default DetailRoom;
