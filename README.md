Setup Express Project

1. Initialize a Node.js project।

npm init -y

2. Install dependencies

npm install express mongoose

3. Install TypeScript and types
   npm install --save-dev typescript @types/node @types/express @types/mongoose

4. Initialize TypeScript Create tsconfig.json

npx tsc --init

5. Create project structure

6. Set up your TypeScript server

7. Install ts-node-dev for development:
   npm install --save-dev ts-node-dev

8. Run the server in development mode:
   npm run dev

9. Install dotenv
   npm install dotenv

10. Create a .env file

Create a .env file in the root of your project. This file will hold your environment variables. For example:

11. Load dotenv in your code

12. cors install

npm install cors

13. Setup eslint

\*\*\* Then I work automatically convert TypeScript to JavaScript on file save and restart the server

1. Install Required Packages

npm install -g typescript nodemon

2. onfigure tsconfig.json
   add this code tsconfig.json

"include": ["src"], // which files to compile
"exclude": ["node_modules"], // which files to skip

3. Add Scripts to package.json

"scripts": {
"start": "node dist/index.js",  
 "build": "tsc",  
 "dev": "nodemon --watch src --exec
}

4. Start Development Server
   npm run dev
