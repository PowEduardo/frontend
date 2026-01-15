export class Step {
    step_name!: string; // Nome do passo
    status!: string; // Status do passo
    start_time!: Date; // Data e hora de início
    end_time!: Date; // Data e hora de término
    read_count!: number; // Quantidade de registros lidos
    write_count!: number; // Quantidade de registros escritos
    skip_count!: number; // Quantidade de registros ignorados
    exit_message?: string; // Mensagem de saída (opcional)
  }