# Turborepo + Pothos + Prisma + Next Template

## Technology stack

- Backend: [Node.js](https://nodejs.org/en/), [Pothos GraphQL](https://pothos-graphql.dev/), [Prisma](https://www.prisma.io/) and [Apollo Server](https://www.apollographql.com/docs/apollo-server/#:~:text=Apollo%20Server%20is%20an%20open,use%20data%20from%20any%20source.)
- Frontend: [React.js](https://reactjs.org/), [Next.js](https://nextjs.org/) and [Apollo Client](https://www.apollographql.com/docs/react/)

## Monorepo Setup

- `apps/api`: [Node.js](https://nodejs.org/en/) app, provides all a gql api and connects to the database.
- `apps/web`: Main app powered by [Next.js](https://nextjs.org)

## Requirements

- ### General

  - **NPM**

  This repository uses npm as a package manager.

  - **Enviroment Variables**

    Inside the `apps/web` directory

    ```
    NEXT_PUBLIC_SERVER_URL="http://localhost:8080/graphql"
    ```

## Running the app

- To install project deps, run

  ```
  npm run install
  ```

- Initialize the database or sync the database schema

  ```
  npm run db:push
  ```

- Generate the pr the prismas client and types

  ```
  npm run db:generate
  ```

- Seed the database

  ```
  npm run db:seed
  ```

- Run app

  - Start the server

    ```
    npm run dev:api
    ```

  - Start server + web

    ```
    npm run dev:web
    ```

## Generating GraphQL Hooks

- To generate the graphql hooks, run

  ```
  npm run generate:hooks
  ```

  This command will detect all the graphql files inside the `apps/web` directories and generate the hooks for them.
