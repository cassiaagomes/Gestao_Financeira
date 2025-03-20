# Projeto FinanZen

O **FinanZen** é um projeto desenvolvido para a organização financeira pessoal. Ele oferece uma aplicação web que permite o cadastro, listagem, edição e exclusão de transações financeiras, ajudando os usuários a manterem o controle de suas finanças pessoais.

## Funcionalidades

- **Cadastro de Transações**: O usuário pode adicionar novas transações financeiras, incluindo informações como nome, valor, tipo (entrada ou saída), data, categoria e descrição.
- **Listagem de Transações**: As transações cadastradas são exibidas em uma lista, permitindo ao usuário visualizar todos os registros de forma organizada.
- **Edição de Transações**: O usuário pode editar os detalhes de transações já cadastradas.
- **Exclusão de Transações**: O usuário pode excluir transações que não são mais relevantes ou foram registradas de forma incorreta.

## Tecnologias utilizadas

- **Angular**: Framework para construção da interface e gerenciamento do estado da aplicação.
- **Firebase Firestore**: Banco de dados em tempo real utilizado para armazenar as transações dos usuários.
- **Angular Material**: Biblioteca de componentes para Angular, que proporciona uma interface moderna e responsiva.

## Estrutura do projeto

O projeto segue a estrutura típica de uma aplicação Angular, com componentes dedicados para a inserção, listagem e gestão das transações.

- **Componente de Cadastro de Transações**: Permite ao usuário adicionar novas transações.
- **Componente de Listagem de Transações**: Exibe todas as transações cadastradas, com a opção de visualizar detalhes, editar ou excluir.
- **Serviços**: São usados para se comunicar com o Firestore e gerenciar as transações de forma centralizada.

## Como executar

1. **Clonar o Repositório**: Clone o repositório do GitHub em sua máquina local.
   ```bash
   git clone https://github.com/cassiaagomes/Gestao_Financeira
   ```
2. **Instalar Dependências**: Navegue até o diretório do projeto e instale as dependências necessárias.
   ```bash
   cd Gestao_Financeira
   npm install
   ```
3. **Iniciar a Aplicação**: Inicie a aplicação.
   ```bash
   npm start
   ```
4. **Acessar a Aplicação**: Abra o navegador e acesse `http://localhost:4200`.

## Links Importantes

- **Link do Stackblitz**: [Stackblitz Project](https://stackblitz.com/~/github.com//cassiaagomes/Gestao_Financeira)
- **Link do GitHub**: [GitHub Repository](https://github.com//cassiaagomes/Gestao_Financeira)

   
