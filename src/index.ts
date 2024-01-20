import apollo, { gql } from "@elysiajs/apollo";
import { Elysia } from "elysia";
import { PokedexApi } from "./pokedex-datasource";

const app = new Elysia()
  .use(
    apollo({
      typeDefs: gql`
        type Pokemon {
          img: String!
          name: String!
        }

        type Query {
          pokemons: [Pokemon!]
          pokemon(name: String!): Pokemon
        }
      `,
      resolvers: {
        Query: {
          pokemons: (
            _,
            __,
            { dataSources }: { dataSources: { pokedexApi: PokedexApi } }
          ) => {
            return dataSources.pokedexApi.getPokemons();
          },
          pokemon: (
            _,
            { name }: { name: string },
            { dataSources }: { dataSources: { pokedexApi: PokedexApi } }
          ) => {
            return dataSources.pokedexApi.getPokemonByName(name);
          },
        },
      },
      context: async () => {
        return {
          dataSources: {
            pokedexApi: new PokedexApi(),
          },
        };
      },
    })
  )
  .listen(process.env.PORT || 8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
