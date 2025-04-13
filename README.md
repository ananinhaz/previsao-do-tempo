# Previsão do Tempo

## Descrição do Projeto
Este projeto é uma aplicação web desenvolvida em React que consome uma API de previsão do tempo para exibir informações climáticas de diversas cidades. O usuário pode pesquisar por uma cidade, visualizar suas informações meteorológicas e adicioná-la a uma lista de favoritas.

## Tecnologias Utilizadas
- React.js
- TypeScript
- Material UI
- React Testing Library
- OpenWeatherMap API

## Estrutura do Projeto
```
desafio-dev-frontend/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── CardTempo.tsx
│   │   ├── CidadesFavoritas.tsx
│   ├── hooks/
│   │   ├── useClima.ts
│   ├── pages/
│   │   ├── Home.tsx
│   ├── services/
│   │   ├── climaApi.ts
│   ├── styles/
│   │   ├── theme.ts
│   ├── tests/
│   │   ├── CardTempo.test.tsx
│   │   ├── CidadesFavoritas.test.tsx
│   │   ├── climaApi.test.ts
│   ├── utils/
│   │   ├── localStorage.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── vercel.json
└── README.md
```

## Funcionalidades
- Pesquisa de cidades para obter informações meteorológicas.
- Exibição da temperatura atual, mínima e máxima.
- Lista de cidades favoritas persistente.
- Informações adicionais sobre precipitação, vento e previsão para os próximos dias.
- Interface responsiva (mobile-first).

## Como Rodar o Projeto
1. Clone este repositório:
   ```sh
   git clone https://github.com/ananinhaz/desafio-dev-frontend.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd desafio-dev-frontend
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto e adicione a chave da API do OpenWeatherMap:
     ```sh
     REACT_APP_API_KEY=SUA_CHAVE_AQUI
     ```
5. Execute o projeto:
   ```sh
   npm start
   ```
6. O projeto estará disponível em `http://localhost:3000/`

## Funcionalidades Adicionais
- **Lista de Cidades Favoritas:** Os usuários podem adicionar cidades à lista de favoritas, mantida no localStorage, garantindo que a lista seja mantida quando recarregar a página.
- **Informações Adicionais:** Além das temperaturas, são exibidas informações sobre precipitação, velocidade do vento e previsão para os próximos dias.


