# Vexa Jobs
## Description
Vexa Jobs allows users to see the jobs available at [vexastudio.com](https://vexastudio.com). By clicking on a button, they are redirected to a form (Google Forms, Office Forms, ...) to apply.
The site's dashboard lets you read, create, modify and delete users, positions and categories.
## Installation
1. Clone the repository
2. Install the dependencies
```bash
npm install
```
3. Copy `.env.example` to `.env` and fill in the variables
4. Run the server
```bash
npm run dev
```
## Database migration
Generate a new migration
```bash
pnpm run migrate:generate
```
Run the migrations
```bash
pnpm run migrate:deploy
```
## Help
Join our [Discord server](https://discord.splrge.dev) for help.