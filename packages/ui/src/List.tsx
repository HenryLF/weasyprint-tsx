import { ComponentChildren, ComponentProps } from "preact";
import styles from "./List.module.css";
import { cssString, joinClasses, mergeStyle } from "./utils";

export type CounterType =
  | "decimal"
  | "lower-alpha"
  | "upper-alpha"
  | "lower-roman"
  | "upper-roman";

export interface ListItemProps extends ComponentProps<"div"> {
  count?: number;
  marker?: string;
}

export interface ListProps extends ComponentProps<"div"> {
  pre?: ComponentChildren;
  gap?: string | number;
}

export interface OLProps extends ListProps {
  start?: number;
  counterType?: CounterType;
  markerPre?: string;
  markerPost?: string;
}

export interface ULProps extends ListProps {
  marker?: string;
}


export function OL({}  : OLProps){

}