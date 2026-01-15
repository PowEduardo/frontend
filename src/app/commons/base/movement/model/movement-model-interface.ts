export interface MovementModelInterface {
  id: number | null;
  date: Date;
  value: number;
  type: string;
  description: string;
  category: string;
  paid: boolean;
}
