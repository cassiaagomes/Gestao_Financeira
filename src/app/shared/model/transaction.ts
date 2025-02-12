export interface Transaction {
  id?: string;
  nome: string;
  valor: number;
  tipo: boolean;
  data: string;
  categoria: string;
  descricao: string;
}
