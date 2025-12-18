---
title: Deploying a Symfony Application with Coolify
description: Learn how to deploy a Symfony application using Coolify, a modern and easy-to-use deployment platform.
date: 2024-04-12
image: /articles/symfony-coolify-v2.png
readingTime: 5 min
tags:
  - Symfony
  - Coolify
  - DevOps
---

# Symfony Tutorial

Symfony is the leading PHP framework for creating websites and web applications. It is built on Symfony Components, which are reusable and modular.

## Prerequisites

Before starting, make sure to configure the following:

- Set **Build Pack** to `nixpacks`
- Set `APP_ENV` to specify the application environment (e.g., `prod` for production)
- Set `APP_SECRET` for application security
- Set `NIXPACKS_PHP_FALLBACK_PATH` to `/index.php` to indicate the default entry point
- Set `NIXPACKS_PHP_ROOT_DIR` to `/app/public` to specify the application root directory
- Set **Exposed Ports** to `80` to expose the HTTP port

## Database Migrations

If you use Doctrine for database management, you can add the following script after deployment to apply migrations:

```bash
php bin/console doctrine:migrations:migrate --all-or-nothing --no-interaction
```

This script executes database migrations in non-interactive mode and ensures that all migrations are applied or none (all-or-nothing).

## Other Components

If your application requires additional services like a database or Redis, you can create them beforehand in the Coolify dashboard. You will receive connection strings to use in your application as environment variables.

### Database Connection String

Use the following connection string for PostgreSQL:

```bash
DATABASE_URL=postgresql://app:!ChangeMe!@127.0.0.1:5432/app?serverVersion=16&charset=utf8
```

Replace `!ChangeMe!` with your database password.

### Redis Connection Details

For Redis, use the following connection details:

```bash
REDIS_HOST=<REDIS_HOST> REDIS_PASSWORD=null REDIS_PORT=6379
```

Replace `<REDIS_HOST>` with your Redis server address.

## Trusted Proxy

You may need to configure trusted proxy settings if your application is behind a reverse proxy. To do this:

- Set the `TRUSTED_PROXIES` environment variable with your proxy server IP
- Add the following configuration in Symfony:

File: `config/packages/framework.yaml`

```yaml
framework:
    trusted_proxies: '%env(TRUSTED_PROXIES)%'
    trusted_headers: ['x-forwarded-for', 'x-forwarded-host', 'x-forwarded-proto', 'x-forwarded-port', 'x-forwarded-prefix']
```

This configuration allows Symfony to trust HTTP headers provided by the reverse proxy, which is essential for correct HTTP request handling.
