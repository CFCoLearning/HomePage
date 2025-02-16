FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN --mount=type=secret,id=thirdweb_key \
    --mount=type=secret,id=convex_key \
    sh -c "export THIRDWEB_SECRET_KEY=$(cat /run/secrets/thirdweb_key) && \
           export CONVEX_DEPLOY_KEY=$(cat /run/secrets/convex_key) && \
           echo 'Secrets loaded successfully'"

RUN npx convex deploy --cmd 'npm run build'

EXPOSE 3000

CMD ["npm", "start"]