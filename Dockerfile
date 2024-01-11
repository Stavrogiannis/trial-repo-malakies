# Use an official Node runtime as a parent image
FROM node:19-alpine as build
# Set the working directory to /app
WORKDIR /app
# Copy the package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .
# Build the React app
RUN npm run build
# Use an official Nginx runtime as a parent image
FROM nginx:1.21.0-alpine
# Copy the ngnix.conf to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the React app build files to the container
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 for Nginx
EXPOSE 80
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]


# Use a lightweight Node 16
#FROM node:16-alpine 
# Setting  working directory to /app 
#WORKDIR /app
# Copying app files
#COPY . .

# ==== BUILDING PHASE =====
#super python3 dependencies
#RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
# Installing dependencies (#important!!--force)
#RUN npm install --force
# Building the app
#RUN npm run build

# ==== RUNNING PHASE =======
# Set the env to "production"
#ENV NODE_ENV production
# Exposing the port
#EXPOSE 3000
# Start the app
#CMD [ "npm", "start" ]
#CMD ["npx", "serve", "build"]


######NEW TRIAL##############