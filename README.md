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
