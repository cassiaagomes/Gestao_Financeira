import { IEntradasGastos } from "../interfaces/entradasgastos/entradasgatos.interface";

export const DadosEntrada: IEntradasGastos [] = [
    {
        nome: "Salário",
        valor: 5000,
        tipo: "entrada",
        dataRegistro: "2021-01-30",
        dataPagamento: "2021-01-30",
        categoria: "Salário",
        descricao: "Salário do mês de janeiro",
        //pago: true,
        //fixo: true,
        //parcelado: false,
        //parcelas: 0,
    },
    
    {
        nome: "Fármacia",
        valor: 80,
        tipo: "saída",
        dataRegistro: "2021-01-30",
        dataPagamento: "2021-01-30",
        categoria: "Cuidados Pessoais",
        descricao: "Compra de remédio para dor de cabeça",
    },
    
    {
        nome: "Mercado",
        valor: 56.98,
        tipo: "saída",
        dataRegistro: "2021-01-30",
        dataPagamento: "2021-01-30",
        categoria: "Supermercado",
        descricao: "Ingredientes para fazer um mousse",
    }
    


];