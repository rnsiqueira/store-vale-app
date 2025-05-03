# Store Vale App

**Store Vale App** é o frontend oficial do projeto [App Store Vale Core](https://github.com/rnsiqueira/app-store-vale-core), desenvolvido com **Next.js**. Ele oferece uma interface moderna e responsiva para interação com a API backend, com autenticação via credenciais e Google, gerenciamento de sessões com **NextAuth** e renderização de produtos em formato de **cards customizados** criados pelo autor.

## 📃 Visão Geral

Este projeto tem como objetivo prover uma interface intuitiva e eficiente para usuários acessarem os produtos e serviços da Store Vale. Utilizando as melhores práticas de desenvolvimento frontend com React e Next.js, ele integra-se perfeitamente ao backend desenvolvido em Java Spring Boot.

## 🚀 Funcionalidades

* Interface moderna e responsiva com **Next.js**
* Autenticação com **NextAuth** (Google e credenciais locais)
* Listagem de produtos em **cards personalizados**
* Integração com a API REST do backend (Store Vale Core)
* Geração de páginas estáticas e server-side rendering (SSR)

## 🌐 Tecnologias Utilizadas

* **Next.js** (React Framework)
* **NextAuth.js**
* **React**
* **Tailwind CSS** (se aplicável)
* **Axios** ou **Fetch API** para chamadas HTTP

## 🚩 Como Executar Localmente

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/rnsiqueira/store-vale-app.git
   cd store-vale-app
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**:

   Crie um arquivo `.env.local` baseado no `.env.example`, preenchendo as chaves do Google, URL da API backend e segredo do NextAuth.

4. **Execute o projeto em modo desenvolvimento**:

   ```bash
   npm run dev
   ```

5. **Acesse no navegador**:

   ```
   http://localhost:3000
   ```

## ⚖️ Estrutura de Pastas

* `pages/` – Roteamento da aplicação e páginas SSR
* `components/` – Componentes reutilizáveis como os cards de produto
* `lib/` – Funções auxiliares, como integração com a API
* `styles/` – Estilizações globais ou com Tailwind (se houver)

## 📄 Licença

Este projeto está licenciado para fins educacionais e profissionais. Fique à vontade para explorar, contribuir e personalizar.

## 🤝 Contribuições

Pull requests são bem-vindos. Para grandes mudanças, por favor, abra uma issue para discutir o que você gostaria de alterar.

## 📢 Contato

Frontend desenvolvido por [Rafael N. Siqueira](https://github.com/rnsiqueira).
