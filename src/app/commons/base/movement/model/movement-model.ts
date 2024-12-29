import { MovementModelInterface } from "./movement-model-interface";

export class MovementModel implements MovementModelInterface{
  category!: string;
  date!: Date;
  description!: string;
  id!: number | null;
  paid!: boolean;
  type!: string;
  value!: number;
}
