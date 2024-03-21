FROM node:18
WORKDIR /app 
RUN chown node:node /app 
COPY --chown=node:node package*.json ./ 
COPY --chown=node:node prisma/schema.prisma ./prisma/ 
USER node 
RUN npm install 
RUN npx prisma generate --schema=./prisma/schema.prisma 
COPY . . 
CMD [ "npm", "run", "start:dev" ]