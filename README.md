# React - MovieList Application

## **Setting Up React Project without using** _create-react-app_

1. Inside a new directory, execute the following command line :

```
npm init -y
```

running the command will create a `package.json` file with the bare minimum of information. adding `-y` flag automatically skips the steps which you need to set informations such as name,version, ... .

2. Installing Webpack :

```
npm install --save-dev webpack webpack-cli
```

next, we should include these packages in `package.json` file and have them run our **build** and **start** scripts.
simply add these two lines inside scripts part of package.json :

```
"start" : "webpack --mode development"
"build" : "webpack --mode production"
```

biggest difference between these two command is, `build` minimize our code to decrease the size of our app.
if you want to test webpack to see how it runs your javascript code, create a new directory inside the project called `src` and a new file called `index.js`,just add a simple `console.log('Hello World!')`.
now run `npm start` , this command creates a new directory in your project called `dist/main.js` that includes our project code .
and you can see the result of your code by running `node dist/main.js`.
_this command runs the bundled version of our app_.

3. Configuring Webpack to work with React :<br>
   in order to run any React application we need these two packages.

```
npm install react react-dom
```

not every browser can read the format that your javascript code is written in. so we need to comple the javascript code into a readable format for browser.

4. Installing Babel and its related packages :

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```

`babel-loader` : is a helper package to help babel run with webpack and two preset packages.
these preset packages helps browser to understand which plugin should be used to compile our javascript code into a readable format in browser(@babel/preset-env) and to compile React specific code(@babel/preset-react).

5. Make **Babel** work with **Webpack** :<br>
   create a file called `webpack.config.js` in the root directory and add the following code

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
```

this configuration tells webpack to use `babel-loader` for every `.js` file in the project,excluding `.js` files in node_modules directory for the Babel compiler.<br>
we can also add settings for `babel-loader` by creating a file with extension called `.babelrc` inside the root directory and adding the following code inside it.

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ],
    "@babel/react"
  ]
}
```

this file configures `babel-loader` to use those two presets.
the `@babel/preset-env` preset has options defined in it that make sure that the compiler uses the latest version of Node.js.

## Rendering a React Component with Webpack

After creating a simple component in `index.js` file and creating an `index.html` inside /src , we need webpack to bundle our minified version of code to the body tag as `scripts` when running,so we should install `html-webpack-plugin`.

```
npm install --save-dev html-webpack-plugin
```

and adding this new package inside webpack configuration file as follow :

```
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [htmlPlugin],
};
```

we set the entry point as the `index.html` file, so that webpack knows where to add the bundle in body tag.<br>
now if we run `npm start`, it creates a new file in /dist directory as `index.html` and if you take a look at it, you will see the script tag, which holds the bundle js code.<br>
for opening html file in browser,simple run `open dist/index.html`.

## Creating a Development Server

So far, any changes we make in our application, in order to see it we need to run `npm start` each time. this won't be a good practice so we need to install a development server for our application.<br>
there is another package which we are going to install called `webpack-dev-server`. this package adds the option to force webpack to restart every time we make changes in application, and manages our application files in a memory instead of creating `.dist` directory.

```
npm install --save-dev webpack-dev-server
```

after installing package, we need to update our start script in `package.json` .
remove the old script and replace it with the following :<br>

```
"start" : "webpack-dev-server --mode development --open"
```

this will create a local server for us.<br>
_To enable hot reloading, replace the --open flag with the --hot flag. This will only reload files that have been changed instead of the entire project._

## Adding Styles to the Project with Webpack

normally,webpack is unable to compile CSS files,so we need to add appropriate `CSS loaders`.<br>
follow this command to install the needed packages

```
npm install --save-dec css-loader style-loader
```

after installing them, we need to add these packages as a rule in our `webpack.config.js` file .

```
{
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
}
```

> The order in which loaders are added is important since css-loader handles the compilation of the CSS file and style-loader adds the compiled CSS files to the React DOM. Webpack reads these settings from right to left and the CSS needs to be compiled before it's attached to the DOM.

## Adding ESLint

in order to make sure our code meets certain standards, adding ESLint is required.

```
npm install --save-dev eslint eslint-loader eslint-plugin-react
```

`eslint` is the core package and helps us to identify problamatic patterns in our javascript code.<br>
`eslint-loader` is a package that is used by webpack to run ESLint everytime we update our code.<br>
`eslint-plugin-react` adds specific rules to ESLint for React Applications.<br>
to configure ESLint, create a file in root directory called `.eslintrc.js` and add the following code :

```
module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    plugins: ["react"],
    extends: ["eslint:recommended", "plugin:react/recommended"]
};
```

> The env field sets the actual environment our code will run in and will use es6 functions in it, while the parserOptions field adds extra configuration for using jsx and modern JavaScript. Where things get interesting, however, is the plugins field, which is where we specify that our code uses react as a framework. The extends field is where the recommended settings for eslint are used, as well as framework-specific settings for React.
