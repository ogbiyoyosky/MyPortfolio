---
template: BlogPost
path: /NodeJs
date: 2020-06-15T10:22:57.481Z
title: Adonis Hexa Architecture
metaDescription: A Command Line Interface application for cryptocurrency price checking
thumbnail: /assets/ULymZgTLGLwUSv7ADBQh_building-cli-apps-with-node.webp
---
#### Repository
https://github.com/creatrixity/adonis-hexa

Adonis Hexa is a software development paradigm for maintaining a scalable application architecture while developing apps for the AdonisJS framework.
It has technically the same ideology as the lucid archetectural pattern for Laravel.


![Adonis Hexa Brand](https://preview.ibb.co/g77Gde/hexa_brand.jpg)

Initially, adonis hexa installation was a clone from the repository, where the command for cloning the repository has to be initiated.

### New Features
## Added cli tool to install project with a command.
In order to solve the issue of cloning from the repository then running the command to install dependency each time you want a new project, i built a cli tool that  accept commands to generate the project by installing the cli tool globally and running the command to create a new project.

## Installation
You can install the package from npm.
```bash
npm i --global adonis-hexa@latest
```

## Next
Create new Adonis Hexa project
```bash
adonis-hexa new Project-Name
```

## Usage
Move into the project directory

```bash
cd Project-Name
```

## start http server
```
adonis serve --dev
```

## Implimentation and Screenshot.
The command new was listen for on the argument passed to the command line a a base generator was created with several methods. Nodegit was used to interface with repository for cloning. After cloning a command was issued out to install adonis hexa dependencies.

![scre.gif](https://cdn.steemitimages.com/DQmT6Pxns9yKAXPn76TmMVFdj6LsjnMtXTn9EtmYxfihg8G/scre.gif)
###### Installation

![screee.png](https://cdn.steemitimages.com/DQmYmZ1mZrjtyttgA3Gwm9QV3s878HwC1Vbs5jqKFY7V4AR/screee.png)

###### help and version checking

## How to contribute 
 Clone the repository [Adonis-Hexa-cli](https://github.com/ogbiyoyosky/adonis-hexa-cli)

Read the Readme.md file on the repository.

## Repository and commits

[adonis-hexa-cli](https://github.com/ogbiyoyosky/adonis-hexa-cli)

[commit to clone from adonis-hexa repository](https://github.com/ogbiyoyosky/adonis-hexa-cli/commit/afc89907387c256912267bc2c6fc4aeb4ac78cd3)

[commit to install packages on adonis-hexa repository using npm.](https://github.com/ogbiyoyosky/adonis-hexa-cli/commit/fc1c0f48207de8c988b09d25eb9bc3beac9cecba)
