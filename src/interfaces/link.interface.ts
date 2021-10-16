import { IconType } from "react-icons";

export default interface LinkInterface {
  key: string;
  title: string;
  to: string;
  icon?: IconType;
}
