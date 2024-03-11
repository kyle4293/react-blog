# 첫 번째 단계: 빌드 환경 설정
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 두 번째 단계: Nginx를 사용하여 정적 파일 서빙
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

