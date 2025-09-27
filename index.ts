import 'dotenv/config'; 
import { buildApp } from './app';

/**
 * Starts the Fastify application server.
 *
 * This function initializes the Fastify application by calling the `buildApp` function,
 * which sets up the application with all necessary plugins, routes, and configurations.
 * It then attempts to start the server on the specified port, logging a success message
 * if the server starts successfully or an error message if the server fails to start.
 *
 * Environment Variables:
 * - `PORT`: The port number on which the server will listen. Defaults to 3000 if not provided.
 *
 */
const PORT: number = Number(process.env.PORT) || 3000;

const start = async () => {
  const app = await buildApp();

  try {
    await app.listen({ port: PORT });
    console.log(`Backend Fastify Web Server running on port: ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
