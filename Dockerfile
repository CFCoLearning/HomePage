# 使用 Node.js 20 Alpine 版本作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 以加速构建缓存
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install

# 复制所有项目文件
COPY . .

# 使用 Secret 机制加载密钥，并确保环境变量全局可用
RUN --mount=type=secret,id=thirdweb_key \
    --mount=type=secret,id=convex_key \
    sh -c "export THIRDWEB_SECRET_KEY=$(cat /run/secrets/thirdweb_key) && \
           export CONVEX_DEPLOY_KEY=$(cat /run/secrets/convex_key) && \
           echo 'Secrets loaded successfully'"

# 运行构建命令
RUN npx convex deploy --cmd 'npm run build'

# 暴露 3000 端口
EXPOSE 3000

# 运行应用
CMD ["npm", "start"]