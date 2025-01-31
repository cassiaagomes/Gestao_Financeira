export type EntradasEGastos = IEntradasGastos[]

export interface IEntradasGastos {
  nome: string;
  valor: number;
  tipo: string;
  dataRegistro: string;
  dataPagamento: string;
  categoria: string;
  descricao: string;
}