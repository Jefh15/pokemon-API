import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
// CSS
import { CssBaseline } from '@nextui-org/react';




class MyDocument extends Document {


    // el context es la req, res, y manipularla
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)

        return {
            ...initialProps,
            styles: <>{initialProps.styles}</>

        }

    }


    render() {
        return (
            <Html lang='es'>
                <Head>
                    {CssBaseline.flush()}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}


export default MyDocument;