FROM node:20-slim

WORKDIR /app

RUN apt update && apt install -y python3 make g++

COPY . .

RUN npm install

ARG CONVEX_DEPLOY_KEY
ENV CONVEX_DEPLOY_KEY=${CONVEX_DEPLOY_KEY}

ARG NEXT_PUBLIC_PROJECT_ID
ENV NEXT_PUBLIC_PROJECT_ID=$NEXT_PUBLIC_PROJECT_ID

RUN npx convex deploy --cmd 'npm run build'

EXPOSE 3000

CMD ["npm", "start"]