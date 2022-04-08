import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";



// me creo una funcion para poder recibir el name y el id
export const getPokemonInfo = async( nameOrId: string) => {
    // para poder recibir como argumento el id o el


    


    // en tiempo de buildtime
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    // Aqui tengo toda la DATA DEL POKEMON
    // console.log(data.);

    // AHORA SOLAMENTE VOY 
    // A USAR LA DATA QUE QUIERO QUE SE 
    // ALMACENE EN LOS ARCHIVOS ESTATICOS 
    // DE MI SERVIDOR
    // PARA ELLO:
    // ME CREO UNA CONSTANTE QUE SE LLAME POKEMON
    return {
        // toda la informacion que realmente necesito para la pagina
        // que son:
        // id
        // sprites
        // name
        // recordar que tambien se puede hacer desestructurting directamente de data
        id: data.id,
        sprites: data.sprites,
        name: data.name
    }


}