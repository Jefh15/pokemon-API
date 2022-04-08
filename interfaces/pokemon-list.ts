export interface PokemonListResponse {
    count:    number;
    // es opcional
    next?:     string;
    // es opcional
    previous?: string;
    results:  SmallPokemon[];
}

export interface SmallPokemon {
    name:   string;
    url:    string;
    id:     number;
    img:    string;
}
