import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

// @ts-ignore
import devCss from '!raw-loader!../style/global.css'
// @ts-ignore
import buildCss from '!raw-loader!../style/bundle.min.css'
const cssFile = process.env.NODE_ENV === 'development' ? devCss : buildCss

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = ctx.renderPage((App) => (props) => <App {...props} />)
    const initialProps: any = await Document.getInitialProps(ctx)
    return {
      ...page,
      styles: [
        ...initialProps.styles,
        <style
          key='custom'
          dangerouslySetInnerHTML={{
            __html: cssFile
          }}
        />
      ]
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument