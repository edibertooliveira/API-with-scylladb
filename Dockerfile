# Estágio de construção
FROM node:20-alpine AS build

WORKDIR /home/node/app

USER root

# Copia os arquivos de configuração para aproveitar o cache
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Adiciona o volume para a pasta src
VOLUME /home/node/app/src

USER node

EXPOSE 3003

# Ponto de entrada para o seu aplicativo
CMD ["npm", "run", "dev"]