import 'dotenv/config'; 
import { buildApp } from './app';
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
