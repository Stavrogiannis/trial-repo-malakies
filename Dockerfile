# Use a lightweight Node 16
FROM node:16-alpine 
# Setting  working directory to /app 
WORKDIR /app
# Copying app files
COPY . .

# ==== BUILDING PHASE =====
#super python3 dependencies
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
# Installing dependencies (#important!!--force)
RUN npm install --force
# Building the app
RUN npm run build

# ==== RUNNING PHASE =======
# Set the env to "production"
ENV NODE_ENV production
# Exposing the port
EXPOSE 3000
# Start the app
#CMD [ "npm", "start" ]
CMD ["npx", "serve", "build"]