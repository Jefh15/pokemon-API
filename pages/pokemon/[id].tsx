import { useState } from 'react';


import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Divider, Grid, Image, Row, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';






// MIS Props
interface Props {
    pokemon: Pokemon;
    // id: string;
    // name: string;

}


// desestructuro de mis props el  ({ id, name })
// const PokemonPage: NextPage<Props> = ({ id, name }) => {
const PokemonPage: NextPage<Props> = ({ pokemon }) => {


    // console.log(pokemon);
    // console.log(pokemon.name);
    // console.log(pokemon.sprites);
    // console.log(pokemon.abilities);

    // const router = useRouter();
    // console.log(router.query);


    // hago un estado
    // y lo verifico de una vez
    // const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));
    // este si sirve
    const [isInFavorites, setIsInFavorites] = useState(typeof window === "undefined" && localFavorites.existInFavorites(pokemon.id));






    // funcion para mi clic
    const onToggleFavorite = () => {

        // console.log('Hola mundo');
        // console.log('ID: ', pokemon.id);
        localFavorites.toggleFavorite(pokemon.id);
        // ocupo redibujar mi estado
        // para que cambie al valor inverso
        setIsInFavorites(!isInFavorites);

        // si el pokemon esta en favoritos haga la animacion de canvas
        if (isInFavorites) {
            return null;
        } else {
            // hago la animacion
            confetti({
                // para que este sobre todo
                zIndex: 999,
                // de unas 100 particulas
                particleCount: 100,
                // pixeles
                spread: 160,
                // angulo
                angle: -100,
                // cordenadas
                origin: {
                    // (IZQUIERDA) 0 --> 0.ALGOCENTRO --> 1 (DERECHA)
                    x: 1,
                    y: 0,
                }
            })
        }

    }


    // para saber s es codigo de back-end o de cliente
    // console.log({ existeWindow: typeof window });





    return (
        <Layout
            // titulo
            title={pokemon.name}
        >

            <Grid.Container
                // css
                css={{
                    marginTop: '5px'
                }}
                gap={2}
            >
                <Grid
                    // tamana de este contenedor
                    // pantallas super pequenas
                    xs={6}
                    // pantallas pequenas
                    sm={6}
                    // pantallas medianas
                    md={2}
                    // pantallas largas
                    lg={1}
                    // pantallas muy grandes
                    xl={6}
                >
                    <Card
                        // para que se pueda pasar por encima
                        hoverable
                        css={{
                            padding: '30px'
                        }}
                    >
                        <Card.Body>
                            <Card.Image
                                // source
                                src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid
                    // tamana de este contenedor
                    // pantallas super pequenas
                    xs={12}
                    // pantallas pequenas
                    sm={6}
                    // pantallas medianas
                    md={2}
                    // pantallas largas
                    lg={1}
                    // pantallas muy grandes
                    xl={6}
                >
                    <Card>
                        <Card.Header
                            // css
                            css={{
                                display: 'table-row',
                                justifyContent: 'space-between',
                            }}

                        >
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                        </Card.Header>
                        <Divider />
                        <Divider />

                        <Card.Body

                        >
                            <Text size={30}>Sprites:</Text>
                            <Container
                                direction='row'
                                display='flex'
                                gap={0}
                            >
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                        <Divider />
                        <Card.Footer>
                            <Row justify='flex-end'>

                                <Button
                                    color="gradient"
                                    // para que se mire como que es una linea
                                    // sale en relleno
                                    ghost={!isInFavorites}
                                    onClick={onToggleFavorite}

                                >
                                    {isInFavorites ? 'En Favoritos' : 'Guardar en favoritos'}
                                </Button>
                            </Row>
                        </Card.Footer>
                    </Card>

                </Grid>

            </Grid.Container>



        </Layout>
    )
}





// NextStaticPaths
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

    // me creo una constante con los pokemons
    // creo un arreglo que va de 1 a 151
    const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);
    // console.log(pokemons151);


    return {
        // paths: [
        //     // cada {params es mi id}
        //     {
        //         params: {
        //             // debeben coicidir con /pokemon/[id] -> [id] con este
        //             id: `${pokemons151}`
        //         }
        //     }
        // ],
        paths: pokemons151.map(id => ({
            params: { id }
        })),
        // si el url no existe da un 404
        fallback: false
    }
}




// nextgetStaticProps
// desestructuro del context los params
export const getStaticProps: GetStaticProps = async ({ params }) => {

    // AQUI RECIBIMOS ESOS PARAMETROS del contexto ctx
    // console.log(ctx.params);

    // desestructuro de los params
    const { id } = params as { id: string };


    // // en tiempo de buildtime
    // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
    // // console.log("data :", data);
    // // console.log(data.);





    // El 143.svg lo cambiamos por el id el pokemon
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/143.svg




    return {
        // estas props caen en el componente
        props: {

            // regresa una promesa -> sin el await no funciona
            pokemon: await getPokemonInfo(id)
        }
    }
}








export default PokemonPage