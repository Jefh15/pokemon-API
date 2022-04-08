import { FC } from 'react';

import { Grid } from '@nextui-org/react';
import FavoriteCardPokemon from './FavoriteCardPokemon';



// Me creo las props para poder enviar los argumentos que recibo
interface Props {
    pokemons: number[];
}


const FavoritePokemons: FC<Props> = ({ pokemons }) => {



    return (

        <Grid.Container
            gap={2}
            direction='row'
            justify='flex-start'
        >
            {/* recooro mis pokemones */}
            {
                pokemons.map(id => (
                    <FavoriteCardPokemon
                        // le envio estas props
                        pokemonId={id}
                        // para poder mandarle la key al componente
                        key={id}
                    />
                ))
            }
        </Grid.Container>


    );
}

export default FavoritePokemons;