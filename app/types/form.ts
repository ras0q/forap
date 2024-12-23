import { ObjectId } from "mongodb";

export interface Form {
  _id?: ObjectId;
  title: string;
  channelId: string;
  components: FormComponent[];
}

export type FormComponent =
  | FormComponentText
  | FormComponentSelect
  | FormComponentCheckbox;

export type FormComponentType = FormComponent["type"];

export interface FormComponentText {
  type: "text";
  label: string;
  placeholder: string;
}

export interface FormComponentSelect {
  type: "select";
  label: string;
  options: string[];
}

export interface FormComponentCheckbox {
  type: "checkbox";
  label: string;
  options: string[];
}
