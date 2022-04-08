// rafc
import NextLink from 'next/link';
import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image";

export const Navbar = () => {

    const { theme } = useTheme();
    // console.log(theme);


    return (
        <div style={{
            // estilos
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "start",
            padding: "0px 20px",
            backgroundColor: theme?.colors.gray900.value
        }}>


            <NextLink href="/" passHref>
                <Link>
                    <Image
                        // de donde viene
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/143.png"
                        // se usa si no se puede mostrar la imagen use ese textos
                        alt="Icono de la app"
                        width={70}
                        height={70}
                    />
                </Link>
            </NextLink>

            <NextLink href="/" passHref>
                <Link>
                    <Text color="white" h2>P</Text>
                    <Text color="white" h3>okémon</Text>
                </Link>
            </NextLink>


            <Spacer css={{
                flex: 1
            }} />

            <NextLink href="/favorites" passHref>
                <Link>
                    <Text color="white" h3>Favoritos</Text>
                </Link>
            </NextLink>
        </div>
    )
}
