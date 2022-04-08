// NO TA COMO QUIERO QUE SOLO MUESTRE el mismo nomrbe del carpeta uso index.tsx
import { FC, useEffect, useState } from 'react';
import { Card, Grid } from '@nextui-org/react';

import { Layout } from "../../components/layouts";
import NoFavorites from "../../components/ui/NoFavorites";
import { localFavorites } from '../../utils';
import FavoritePokemons from '../../components/pokemon/FavoritePokemons';



const FavoritesPage: FC = () => {


    // crear un estado en este componente
    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);


    // que se ejecute cuando la pagina carga por primera vez
    useEffect(() => {

        // leer los pokemons
        setFavoritePokemons(localFavorites.pokemons());

    }, []);






    return (
        <Layout
            title="Pokémons - Favoritos"
        >
            {/* // condicion, si el length es 0 mostamos los pokemones */}
            {
                favoritePokemons.length === 0
                    ? (<NoFavorites />)
                    // si no es 0
                    : (
                        <FavoritePokemons
                            // favoritePokemons -> viene de mis
                            pokemons={favoritePokemons}
                        />
                    )
            }



        </Layout>
    );
}

export default FavoritesPage