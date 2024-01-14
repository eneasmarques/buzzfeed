export type Question = {
  id: number;
  question: string;
  options: Option[];
};

type Option = {
  id: number;
  name: string;
  alias: string;
};
