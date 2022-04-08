import { Card, Grid, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC } from "react"
import { SmallPokemon } from "../../interfaces"

interface Props {
    pokemon: SmallPokemon
}



export const PokemonCard: FC<Props> = ({ pokemon }) => {

    // hago la desestructuracion de pokemon
    const { id, name, img } = pokemon;


    // para obtener mi query de mi link
    const router = useRouter();
    // console.log(router.query);

    const onClick = () => {
        // quiero que ahora se haga la busqueda por el id
        // router.push(`/pokemon/${pokemon.id}`);
        // quiero que ahora se haga la busqueda por el nombre
        router.push(`/name/${pokemon.name}`);
    }



    return (
        // 
        // <li key={id}>#{id} - {name} </li>
        // GRID RESPONSIVE
        <Grid
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


            key={id}
        >
            <Card
                // se puede poner encima
                hoverable
                // clickeable
                clickable
                // le paso mi metodo al hacer click, para que me lleve a la pagina
                onClick={onClick}
            >
                {/* EL CUERPO DE MI TARJETA */}
                <Card.Body
                    css={{
                        // padding
                        p: 1
                    }}
                >
                    <Card.Image
                        src={img}
                        width="100%"
                        height={140}
                    />
                </Card.Body>
                {/* EL FOOTER DE MI TARJETA */}
                <Card.Footer>
                    {/* Fila -> para dividir en 12 o menos */}
                    <Row
                        // separados internamente
                        justify='space-between'
                    >
                        <Text
                            // para que haga el texto en mayusculas
                            transform='capitalize'
                        >{name}</Text>
                        <Text>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>

        </Grid>
    )
}
