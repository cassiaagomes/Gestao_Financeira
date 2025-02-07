import { IEntradasGastos } from '../interfaces/entradasgastos.interface';

export const DadosEntrada: IEntradasGastos[] = [
    {
        nome: "Salário",
        valor: 5000,
        tipo: true, 
        data: "2021-01-30",
        categoria: "Salário",
        descricao: "Salário do mês de janeiro",
    },
    {
        nome: "Farmácia",
        valor: 80,
        tipo: false,
        data: "2021-01-30",
        categoria: "Cuidados Pessoais",
        descricao: "Compra de remédio para dor de cabeça",
    },
    {
        nome: "Mercado",
        valor: 56.98,
        tipo: false, 
        data: "2021-01-30",
        categoria: "Supermercado",
        descricao: "Ingredientes para fazer um mousse",
    }
];
