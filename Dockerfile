# Use an official Node.js runtime as a parent image
FROM node:latest AS build

# Set the working directory inside the container
WORKDIR /app
COPY . ./
RUN npm install --legacy-peer-deps
RUN npm run serve:ssr:frontend

# Production stage
FROM node:22.18-bullseye-slim
COPY --from=build /app/dist/frontend/ /usr/share/node/
EXPOSE 4000
CMD ["node", "/usr/share/node/server/server.mjs"]
