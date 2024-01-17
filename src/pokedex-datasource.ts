import { RESTDataSource } from "@apollo/datasource-rest";

export class PokedexApi extends RESTDataSource {
  baseURL?: string | undefined = "https://pokedex-workshop-api.vercel.app/api/";

  async getPokemons() {
    return this.get("pokemons");
  }

  async getPokemonByName(name: string) {
    return this.get(`pokemons/${name}`);
  }
}
