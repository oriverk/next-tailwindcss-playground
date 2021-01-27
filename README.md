# Next.js + TailwindCSS + TypeScript playgrounds
This repositry came from https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss.

And, This example shows how to use [Tailwind CSS](https://tailwindcss.com/) (v2) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## Deploy your own

Deploy this using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

<!-- [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss) -->

## sample contents
- sticky footer with tailwindcss
- dashboard with sidebar and notification drop window
  - reference: https://tailwindcomponents.com/component/dashboard-template
  - reference code: https://github.com/tailwindcomponents/dashboard
  - orignal code uses alpine.js, so i converted this to with react.

## repositry productoin procedure
1. cra

```
yarn create next-app --example with-tailwindcss
yarn upgrade --latest
yarn add next@canary
```

2. setup typescript

```
yarn add -D typescript @types/react @types/node
```
rename src/pages/index.js to src/pages/indext.tsx and do `yarn dev`. Then `tsconfig.json` and `next-env.d.ts` will be automatically created.

3. setup tailwindcss and postconfig

```
yarn add -D postcss postcss-cli postcss-custom-properties postcss-presetn-env
yarn add -D @fullhuman/postcss-purgecss cssnano
```

<details><summary>tailwind.config.js</summary><div>

```js
module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

</div></details>

<details><summary>post.config.js</summary><div>

https://github.com/vercel/next.js/issues/10117#issuecomment-575263084

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    ...(process.env.NODE_ENV === 'production') && {
      autoprefixer: {},
      '@fullhuman/postcss-purgecss': {
        content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      },
      'postcss-custom-properties': {},
      'postcss-preset-env': { stage: 1 },
      cssnano: { preset: 'default' },
    }
  },
}
```

</div></details>


If you want to use other PostCSS plugins, see [the following](https://tailwindcss.com/docs/using-with-preprocessors)

- postcss-import
  - canonical plugin for handling this with PostCSS
- postcss-custom-properties
  - if you need to support IE11 for css variables

NOTE: postcss-present-env includes css variables, nesting and autoprefixer. So With the postcss-preset-env, you don't need to add separate plugins such as autoprefixer, postcss-nesting, postcss-nested, postcss-custom-properties

4. modify npm script in package.json

```json
{
  "scripts": {
    "dev": "run-p dev:*",
    "dev:css": "postcss src/style/tailwind.css -o src/style/global.css",
    "dev:next": "next",
    "build": "run-s build:*",
    "build:css": "NODE_ENV=production postcss src/style/tailwind.css -o src/style/bundle.min.css",
    "build:next": "next build",
    "start": "next start"
  },
}
```

5. modify _document.tsx to import css through raw-loader
Actually, u can import css in _app.tsx like `import from css.css` but if u wanna custom for amp...

<details><summary>_document.tsx with raw-loader</summary><div>

```ts
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
        <style key='custom'
          dangerouslySetInnerHTML={{ __html: cssFile }}
        />
      ]}}
  // ...
}

export default MyDocument
```

</div></details>
