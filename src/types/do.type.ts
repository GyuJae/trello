export interface IDoItemType {
  id: string;
  uid: string;
  text: string;
  createAt: DateConstructor;
  updateAt: DateConstructor;
}

interface Do {
  ["To Do"]: IDoItemType[];
  ["Doing"]: IDoItemType[];
  ["Done"]: IDoItemType[];
}

export default Do;
