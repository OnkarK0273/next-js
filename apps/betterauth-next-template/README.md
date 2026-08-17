in this article we are going to see how setup `Better-Auth` with `nextjs` using `postgres-DB` and `Drizzle-ORM`

# Project setup

## Installation

```bash
# Next.js
pnpm create next-app@latest my-app

# Better-auth
pnpm add better-auth

# Drizzle
pnpm add drizzle-orm pg
pnpm add -D drizzle-kit tsx @types/pg
```

## PostgresDB installation

Before config. better-auth with nextjs 1st u need database to connect with it, here we choosing pg-db using docker u can also use supabase or neonDB.

`docker-compose.yaml`

```yaml
services:
  db:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Run following command install images and run pg container on local port `5432`

```bash
docker compose up -d
```

## Configuration

**Set Environment Variables `.env`**

```bash
# You can also use openssl rand -base64 32 to generate
BETTER_AUTH_SECRET= <secret key>

BETTER_AUTH_URL="http://localhost:3000" # Base URL of your app

DATABASE_URL= "postgres://postgres:postgres@localhost:5432/mydb"
```

### Drizzle

```
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 │   ├ 📂 db
 │   │  └ 📂 schema
 |	 |		 └📜 auth-schema.ts
 │   └ 📜 index.ts
 ├ 📜 .env
 ├ 📜 drizzle.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
```

#### **Connect Drizzle ORM to the database:**

Create a `index.ts` file in the `src` directory and initialize the connection:

```bash
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL!);
```

#### **Setup Drizzle config file:**

**Drizzle config** - a configuration file that is used by Drizzle Kit and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```tsx
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

#### Setup migration script

Add following script inside `package.json` file for generate and apply migration.

```tsx
"scripts": {
    "migration:generate": "npx drizzle-kit generate --config=drizzle.config.ts",
    "migration:migrate": "npx drizzle-kit migrate --config=drizzle.config.ts"
  }
```

### Better-auth

#### **Create A Better Auth Instance and connect DB:**

Create a file named `auth.ts` inside file `src/lib`

Configure Database using `Drizzle-ORM` using built in adapter

```tsx
import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
```

#### Create database table

Better Auth includes a CLI tool to help manage the schema required by the library.

- **Generate**: This command generates an ORM schema or SQL migration file.
  ```bash
  pnpm dlx auth@latest generate
  ```

<aside>
📝Note - It generate schema file called `auth-schema.ts` inside root folder so u need to just move this file inside `src/db/schema` to organize all schema files.

</aside>

#### **Applying changes to the database**

1. Run the following script to generate sql migration file of `auth-schema.ts` which locate inside `drizzle` folder

   ```bash
   pnpm run migration:generate
   ```

2. After creating migration file we migrate sql file to generate tables (user, account, session and verification) inside pg database using following script

   ```bash
   pnpm run migration:migrate
   ```

## Reference

Official Document - Better-Auth, Drizzle-ORM, Nextjs
