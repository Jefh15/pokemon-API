import { NextPage, GetStaticProps } from 'next';

import { Grid } from '@nextui-org/react';
// 
// 
import pokeApi from '../api/pokeApi';
import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';




interface Props {
  // recibo un arreglo de pokemons de tipo SmallPokemon
  pokemons: SmallPokemon[];
}





// le paso por props
const HomePage: NextPage<Props> = ({ pokemons }) => {

  // console.log(pokemons);


  return (

    <Layout
      // titulo de mi pagina
      title='Listado de Pokemons'>

      {/* demostracion */}
      {/* <Image
        // path
        src='/img/banner.png'
        // ancho
        width={200}
        // alto
        height={150}
        // Nombre en caso que no se pueda mostrar
        alt="Banner Image"

      /> */}

      <Grid.Container
        // distancia entre ellos
        gap={2}
        justify='flex-start'

      >
        {
          pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))
        }

      </Grid.Container>
    </Layout>
  );
}






// nextgetStaticProps
export const getStaticProps: GetStaticProps = async (ctx) => {

  // console.log('Hola mundo');

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  // console.log("data :", data);

  const pokemons: SmallPokemon[] = data.results.map((poke, index) => ({
    // propiedades que quiero que muestre mi arreglo
    // copia de mi resp
    ...poke,
    // le envio el id
    id: index + 1,
    // le envio la imagen
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }));

  // El 143.svg lo cambiamos por el id el pokemon
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/143.svg




  return {
    // estas props caen en el componente
    props: {
      // pokemons: pokemons
      pokemons
    }
  }
}

export default HomePage;
