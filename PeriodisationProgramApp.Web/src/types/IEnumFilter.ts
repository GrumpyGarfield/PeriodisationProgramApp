import { IInputFilter } from "./IInputFilter";

export interface IEnumFilter {
  label: string;
  enumName: string;
  enumObject: any;
  inputFilter: IInputFilter<string>;
}
