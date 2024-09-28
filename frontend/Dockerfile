FROM node:18-alpine AS build

WORKDIR /build

COPY package*.json ./
RUN npm install

COPY . .

# Final Stage
FROM node:18-alpine

WORKDIR /app
COPY --from=build /build .

EXPOSE 3000
CMD npm run preview