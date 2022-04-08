import { useState } from 'react';


import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Divider, Grid, Image, Row, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import { PokemonListResponse } from '../../interfaces/pokemon-list';






// MIS Props
interface Props {
    pokemon: Pokemon;
    // id: string;
    // name: string;

}


// desestructuro de mis props el  ({ id, name })
// const PokemonPage: NextPage<Props> = ({ id, name }) => {
const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {


    // para ver que trae los parametros pokemon
    // console.log({ pokemon });


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













// GENERACION DE FORMA DINAMICA DE TODOS MI POSIBLES ARGUMENTOS, QUE EL GET STATIC PROPS VA A PODER RECIBIR


// NextStaticPaths
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

    // me creo una constante con los pokemons
    // creo un arreglo donde voy a guardar los name de los 151 pokemones
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    // console.log(pokemons151);

    // ocupo de esa data los results y extraigo name
    // me creo un arreglo con los pokemons
    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);





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

        paths: pokemonNames.map(name => ({
            params: {
                // argumento name
                name
            }
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

    // llamo mi funcion
    // // desestructuro de los params
    // // RECIBO EL name de mis params
    const { name } = params as { name: string };








    // El 143.svg lo cambiamos por el id el pokemon
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/143.svg




    return {
        // estas props caen en el componente
        props: {

            // regresa una promesa -> sin el await no funciona
            pokemon: await getPokemonInfo(name)
        }
    }
}








export default PokemonByNamePage;