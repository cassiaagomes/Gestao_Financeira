export type EntradasEGastos = IEntradasGastos[]

export interface IEntradasGastos {
  id: string;
  nome: string;
  valor: number;
  tipo: boolean;
  data: string;
  categoria: string;
  descricao: string;
}