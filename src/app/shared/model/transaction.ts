export interface Transaction {
  id?: string;
  nome: string;
  valor: number;
  tipo: boolean;
  data: Date;
  categoria: string;
  descricao: string;
}
