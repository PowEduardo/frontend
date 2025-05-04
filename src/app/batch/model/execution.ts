import { Step } from "./step";

export class Execution {
  job_execution_id: number; // ID da execução do job
  status: string; // Status da execução
  start_time: Date; // Data e hora de início da execução
  end_time: Date; // Data e hora de término da execução
  stepDetails: Step[]; // Detalhes dos passos (steps) associados à execução
  totalTime!: number; // Detalhes dos passos (steps) associados à execução

  constructor(
    job_execution_id: number,
    status: string,
    start_time: Date,
    end_time: Date,
    stepDetails: Step[]
  ) {
    this.job_execution_id = job_execution_id;
    this.status = status;
    this.start_time = start_time;
    this.end_time = end_time;
    this.stepDetails = stepDetails;
  }

}