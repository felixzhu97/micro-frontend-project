export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface CounterState {
  count: number;
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}
