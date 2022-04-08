// importaciones de react
import { FC } from "react";

// importaciones de next
import Head from "next/head";



// importaciones de nosostros o de terceros
import { Navbar } from '../ui';



// interface
interface Props {
    title?: string;
}



// para poder conocer el path 
// el path ya viene en el objeto window
// window.location -> solo existe si trabajamos en la parte del frontEnd
// console.log(window.location);
const origin = (typeof window === 'undefined') ? '' : window.location.origin;




export const Layout: FC<Props> = ({ children, title }) => {


    // para sacar mi path de mi ruta actual de mi ventana
    // console.log({ origin });


    return (
        <>
            <Head>
                <title>{title || 'PokemonApp'}</title>
                <meta name="author" content="Jesus Fonseca" />
                <meta name="description" content={`Información sobre el pokemón ${title}`} />
                {/* Para que asi la encuentre en google */}
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
                {/* OG METATAGS */}
                <meta property="og:title" content={`Información sobre ${title}`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>


            {/* COLOCO MI NAVBAR */}
            <Navbar />

            <main
                style={{
                    // estilos
                    padding: "0px 20px"
                }}
            >
                {/* MIS CHILDREN -> CONTENIDO DE LA PAGINA */}
                {children}
            </main>

        </>
    )
}
