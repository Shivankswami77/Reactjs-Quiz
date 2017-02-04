# TSLA quiz (React)

How to install:

## Install nodejs

https://nodejs.org/en/download/

## Install MongoDB

https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-os-x/ (for mac)

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ (for windows)

## Running the project

### Start the MongoDB service (always keep this service running)

mongod

### Start the node server

```
npm install
bower install
npm start
```

### Load the questions

Open the browser, and load the questions, one at a time.

```
localhost:3000/api/questions/load/1
localhost:3000/api/questions/load/2
localhost:3000/api/questions/load/3
localhost:3000/api/questions/load/4
```

### To visit the app

Open the browser and visit ```localhost:3000```


### My development environment

* Mac OS Sierra 10.12
* Chrome Browser Version 53.0.2785.143 (64-bit)
* Node v5.8.0
* npm v3.8.9
* MongoDB shell version: 2.6.5

### Note:

To reset the questions:

* In the browser console,

```
localStorage.clear()
```

* In the mongoDB collection,

```
Edit the "answered" attribute to 0
```

### Issues ?

Report issues @ https://github.com/anilpai/react-quiz/issues 
