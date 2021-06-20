This project was bootstrapped with [Vite](https://vitejs.dev/). Vite is quite fast compared to `Create-React-App` with the option of easy configuration without `ejecting`. The only major issue while using it is that getting `Jest` to work with it can get a bit tricky when your code is using `import.meta` 


## Getting Started

Clone the repo and install dependencies...

```

clone <repo>

cd <repo>

yarn or npm i

```

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Runs all the test suites.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Structure

-   apis

    > Contains all `api-modules` used in the app.
    > `api-modules` are simple react-hooks which map to a single api-endpoint. This allows for great typescript leverage for api responses and makes it more predictable. Every `api-modules` can be easily generated via `composer` which is a middleware for creating these type safe hooks.

-   assets

    > All static assets like svgs or images go here.

-   components

    > app-wide components neatly put together

-   hooks

    > houses custom hooks

-   pages

    > All page component map to a single route on app. The `router` component is responsible for declaratively mapping these page components to route. To avoid rewriting lazy imports for each page, we use `loadable-components` to dynamically import page component just by the file name.

-   styles
    > compile-time styles are handled by `PostCss` and supports sass like syntax. For quick prototyping we are using `emotion` to write css in js.
