export function formatDateBR(value: string | Date): string {
  const date =
    value instanceof Date
      ? value
      : (() => {
          const [y, m, d] = value.split('-').map(Number);
          return new Date(y, m - 1, d);
        })();

  return date.toLocaleDateString('pt-BR');
}