import { FC } from "react";
import { Card, Grid } from "@nextui-org/react";
import { useRouter } from 'next/router';

interface Props {
    pokemonId: number;
}


const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {


    // para saber mi ruta
    const router = useRouter();
    // console.log(router);



    // para hacer click en la card
    const onFavoriteClicked = () => {

        // navego a mi card de mi pokemon clickeado
        router.push(`/pokemon/${pokemonId}`);
    }



    return (

        // regreso esto
        <Grid
            // pantallas
            xs={4}
            sm={3}
            md={2}
            xl={1}
            // la llave
            key={pokemonId}
            onClick={onFavoriteClicked}
        >
            <Card
                hoverable
                clickable
                // css
                css={{
                    padding: 10
                }}
            >
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                    // tamano
                    width={'100%'}
                    height={140}
                >

                </Card.Image>
            </Card>

        </Grid>

    )
}

export default FavoriteCardPokemon;