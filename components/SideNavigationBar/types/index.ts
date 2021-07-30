import { ReactElement } from 'react';

export interface INavigationItem {
  name: string;
  route: string;
  icon: ReactElement;
}

export enum DisplayType {
  Desktop,
  Mobile,
  Tablet,
}
