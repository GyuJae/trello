export interface IDoItemType {
  text: string;
}

interface Do {
  ["To Do"]: string[];
  ["Doing"]: string[];
  ["Done"]: string[];
}

export default Do;
