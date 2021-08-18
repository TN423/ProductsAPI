FROM node:14
WORKDIR /ProductsAPI
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
EXPOSE 3306
CMD ["npm", "start"]

# I need a 2nd dockerfile for my database?
# My EC2 instance will have a copy of my cloned github repo right? So what exactly is being copied with the copy statements?
#
#ENV vs EXPOSE
#Yarn?