---
template: BlogPost
path: /NodeJs
date: 2020-02-20T14:59:36.571Z
title: Building a simple CLI Application.
metaDescription: A Command Line Interface application for cryptocurrency price checking
thumbnail: /assets/ULymZgTLGLwUSv7ADBQh_building-cli-apps-with-node.webp
---
#### Contribution Repository
https://github.com/nodejs/node


### Disclaimer
To understand this tutorial, you need a basic knowledge of javaScript and Node.

### Project structure.
+ node_modules/
    + bin
        + atlas.js
    + cmds/
        + allCoin.js
        + coinPrice.js
        + help.js
        + version.js
    + utils/
+ index.js
+ package.lock.json
+ package.json

### Rating 
This tutorial is rated Intermediate.
#### Requirement.

+ Node version version 8.9.4 
+ Npm version 5.6.0
+ [Atlas CLI tool](https://github.com/ogbiyoyosky/atlas-cli-tool)

#### What would i learn? / Table of content.
1. Setting up a project for a command line tool
2. Initiate and link command to make it available globally.
3. Learning how to Parsing Commands And Arguments.
4. Building pagination on the command line.
5. Making Api calls with a command line.
6. Publishing on npm.


# Introduction.
The command line, can be fun for running simple tasks on the computer, for example git commands which help you push, pull, merge and so on. Anybody can build a tool using the same principles we are going to learn in this tutorial.
    The command line doesn't get to much attention and there are not so much tutorial about how to build a CLI (command line interface) tool, there are many libraries like Oclif, commander and yargs for building command line tools. In this tutorial we would keep it simple by striping our dependencies to the minimum just to give you a basic understanding.

## Mission
Our mission is to be able to build a simple tool on the command line that we can pass options to to give us the list of cryptocurrency and also with their prices, isn't that cool?
Note; tool like "create react app" are also built with this principle.

## Setting up
Create a folder for our application, in our case we would call this folder (atlas-cli-tool) open the folder and initiate the command line in this directory. Just as all JavaScript application, we kick start by running the command below to give us a package.json and an entry file.
```
npm init
```
Fill the prompt on the command line

![npm init](https://preview.ibb.co/ekzjw9/cmdinit.jpg)


```
{
  "name": "atlas-cli-tool",
  "version": "1.0.0",
  "description": "Cli tool for price, status and all cryptocurrency",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "freeman ogbiyoyo",
  "license": "ISC",
  "dependencies": {
    
  }
}
```
Create a file `index.js` at the root directory of the application, this file is called the entry file. In the new create file add 
```
console.log('welcome to the Atlas Cli tool');
```
We need a way to add a command that initiate the console to output the information in the index. js.

## Creating a bin file
We need a way to invoke the command line to show our message from the entry file and a way the command can be called from any directory of our system. To do this we have to add it to the system path. The right way to do this by creating a bin file.

Create a folder on the root `bin` and in it add a file `atlas.js`

+ bin
    + atlas.js

Next up we are going add the [shebang expression](https://en.wikipedia.org/wiki/Shebang_(Unix))  in atlas.js and require the file index.js which is the entry point for the application.
```
#!/usr/bin/env node

require('../')()
```
Never seen #!/usr/bin/env node before? It's called a shebang. It basically tells the system this isn't a shell script and it should use a different interpreter. It is important to keep the bin file slim for test-ability. To be able to run the bin file, we need to add it to our package.json and import the index.js file from the root directory of our project.

```
{
  "name": "atlas-cli-tool",
  "version": "1.0.0",
  "description": "Cli tool for price, status and all cryptocurrency",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
"bin": {
    "atlas": "bin/atlas.js"
  },
  "author": "freeman ogbiyoyo",
  "license": "ISC",
  "dependencies": {
    
  }
}
```
![package.json](https://preview.ibb.co/e1LZEU/cmdinit.jpg)

With that in place, we can now run 
```
npm link
```
This make the command atlas to be available on the global path.

## Learning how to Parsing Commands And Arguments.

On the Cli tool, we want to be able to initiate commands and pass options or arguments. Command don't have hyphen in front of them, options or arguments have hyphens in front of them e.g --save,  -d, --debug, --env etc.
We are going to use a package `minimist` to the get the argument from process.agrv. process.argv is used to pass argument into the command line.
```
npm i --save minimist
```
###### index.js

```
const minimist = require('minimist')

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  console.log(args)
}
```
Lets explain whats going on above, the reason we remove the first two arguments with .slice(2) is because the first argument will always be the interpreter followed by the name of the file being interpreted. We only care about the argument after the initial two.
Now running `atlas all-coins` output` { _: ['all-coins'] }` on the command line. And  `atlas all-coins --page  2` outputs `{_: ['all-coins'], 'page': '2'}`. The first argument is the command while the second argument is the option. You can have as many options as possible.

## Building the commands

###### index.js

```
const minimist = require('minimist')

module.exports = () => {
  const args = minimist(process.argv.slice(2))

    let cmd = args._[0] || 'help'

    if (args.version || args.v) {
      cmd = 'version'
    }

    if (args.help || args.h) {
      cmd = 'help'
    }

    switch (cmd) {
      case 'price':
        require('./cmds/coinPrice.js')(args)
        break

      case 'all-coins':
        require('./cmds/allCoin.js')(args)
          break

      case 'version':
        require('./cmds/version')(args)
        break

      case 'help':
        require('./cmds/help')(args)
        break

      default:
        console.error(`"${cmd}" is not a valid command!`);
        break
    }
}
```
We have to listen for a list of command on the console and serve a different file for each case. First we get the command and store in the variable `cmd` and switch for each of the valid cases of commands entered in the console. If the user enters the command 'price' we serve a file that handles the command case.

## Building the command to check price.
The price command will need to send a request to an API to check for the particular price of a certain coin. We would be creating a folder utils on the root of the project, this folder holder all files that makes request to an Api for results. Our first file to the folder is price.js
+ utils
    + price.js

We would require two modules in this file, which are request and chalk. Request is used for making http request to an api while chalk is used to add color to a command line interface.

###### price.js

```
const request = require('request');
const chalk = require('chalk')

module.exports = async (coin) => {

  //  capitalizing the results entered
  const input = coin.toUpperCase()
  
  const url = `https://chasing-coins.com/api/v1/std/coin/${input}/`;
// sending request to the api
  await request.get(url, (error, response, body) => {
    let result = JSON.parse(body);
  console.log(chalk.blue(`${input} price:` ), chalk.keyword('orange')(result.price))
  });

}

```
![price.js](https://preview.ibb.co/guzuG9/price.png)

The async function accepts a coin name which is all set to its capitalize form before sending the request to the api that returns a JSON response in the body. Then chalk is used to set the result color to orange.
Now that we have the file that interacts with the api ready, lets work on the command for the price case.
Remember the price case requires a new file.

###### price.js
```
case 'price':
        require('./cmds/coinPrice.js')(args)
```
Create a folder cmds and add a new file coinprice.js

```
const ora = require('ora')
const getCoinPrice = require('../utils/price.js')

module.exports = async (args) => {
  const spinner = ora().start()

  try {

      const coin = args.coin || args[1];

      const allCoins = await getCoinPrice(coin)

      spinner.stop()

      console.log(`below is price for ${coin}`);


  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}

```


![price.gif](https://cdn.steemitimages.com/DQmTNtM5H3iVwNwktedythnvDmCkqMtzM2trypWhcYdjykL/price.gif)


First we have to require the module we just created to request the price of coins from the api. We pass the argument (the coin entered by the user) to the getCoinPrice function. Our commands and options object becomes `{_: ['price'], 'coin': 'btc'}`  then the  constant coin becomes an option so it is referenced below 
```
atlas price --coin btc
```

## Building the command to show all coins and paginating on the command line. 
We are going to work on a command to return a list of crytocurrencies and run pagination on the result returned from the Api

Open the index.js and add a new case command for 'all-coins'

```
case 'all-coins':
        require('./cmds/allCoin.js')(args)
          break
```
Add a new file in the cmd folder `allCoin.js`, before that, lets create a method that send request to the api and fetch the total coins and paginate the results. This method will accept a pageNo and a default limit of 8. The formula for pagination is `((page + 1) * limit)` . The results from the api is paginated by slicing from the startAt variable.

###### allCoin.js

```
const request = require('request');
const chalk = require('chalk')

module.exports = async (page = 1, limit = 8) => {
  const url = 'https://www.chasing-coins.com/api/v1/coins';

await request.get(url, (error, response, body) => {
  let payload = JSON.parse(body);
  let startAt = page * limit;

  let results = payload.slice(startAt, ((page + 1) * limit))

  results.forEach((coin) => {
    console.log(chalk.blue('Coin: '), chalk.keyword('orange')(coin))
  })
});

}
```

![coin-list.gif](https://cdn.steemitimages.com/DQmYYGYyj6aHsdt6HzKSd7ro7xwhifkDQb2axrZunftKT7p/coin-list.gif)

In allCoin.js, we need to add a new option to the command which is the pageNo. 
We set the arg[1] variable to page so we can now write the command as `atlas all-coins ---page 2`. Note that the pageNo variable was passed to the  `getAllCoins(pageNo)` function that returns the total number of coins per page.
Finally the last two cases of commands are the once that don't need to interact with an api. From our `index.js` we have two other cases to build, the case that returns a version and shows us the valid commands on the help commands. Case help requires us to create a file help.js in the cmds folder. 

###### help.js

```
const menus = {
  main: `
    atlas [command] <options>

    price .............. show the price of coin in USD
    all-coins .............. show all coins which accepts <options> of page
    version ............ show package version
    help ............... show help menu for a command`,

  today: `
    atlas today <options>

    --location, -l ..... the location to use`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}
```
![](https://cdn.steemitimages.com/DQmPfJfRVbtBGGEE9ehUNy7ng9ZMexa6SU4AE77EeGqfHc5/image.png)
In this file, we are just displaying the list of commands our application accepts using a menus object to store the syntax for each command and display it to the user whenever he/she enters the command `atlas help`

## Publishing to Npm.
Publishing on npm is quite easy, first you need to register an account on npm. Publishing an npm package, you can update the version on your package.json to the version you want and run 

```
npm publish
```
If you are not logged in you will be prompt to enter you authentication details for npm.
Finally after our package is published, it is now available to anybody with the command.

```
npm install -g atlas
```
## Conclusion
We can now check for the prices of coins and the total coins from the chasing coin Api by entering the following commands on the console.
`atlas price --coin <coin name>`
`atlas all-coins --page <page No>`

Resources
+ Remember to check out the [Repo](https://github.com/ogbiyoyosky/atlas-cli-tool) for this project.
+ [chalk documentation](https://www.npmjs.com/package/chalk)
+ [Nodejs documentation](https://nodejs.org/docs/latest/api/)
+ [shebang Expression](https://en.wikipedia.org/wiki/Shebang_(Unix))
