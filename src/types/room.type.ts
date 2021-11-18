import Do from "./do.type";

interface IRoom {
  id: string;
  uid: string;
  name: string;
  createAt: DateConstructor;
  uids: string[];
  dos: Do;
}

export default IRoom;
