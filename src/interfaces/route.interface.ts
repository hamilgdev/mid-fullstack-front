import type { LazyExoticComponent } from "react";
import type { JSX } from "react/jsx-runtime";

type JSXComponent = () => JSX.Element;

export interface AppRoute {
  path: string;
  name: string;
  element: LazyExoticComponent<JSXComponent> | JSXComponent;
  children?: AppRoute[];
}