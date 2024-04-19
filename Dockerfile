FROM node:14-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ENV NEXT_PUBLIC_API_URL=http://34.125.64.54:5000
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]