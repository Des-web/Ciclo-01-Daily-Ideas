import express from 'express'
import cors from 'cors'
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema';
import resolvers from './resolvers';

async function startApolloServer() {
  const app = express()
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  await server.start()
  server.applyMiddleware({ app })

  app.use(express.json())
  app.use(cors())

  // @ts-ignore
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  
  return { server, app }
}

startApolloServer()
