Welcome to log aggregator!!!!! We help you analyze logs which we think is future of business intelligence!

This application aggregates the logs from different sources and represents them in a visually pleasing way and also makes it easy to analyse the data using d3.js

To contribute to this project please follow the standard fork and pull procedure. If you have no idea what that is, Google is your best friend.

******************
1. To run the application clone the repository from [LogAggregator](https://github.com/stackroute/LogAggregator-AptCache.git)
2. Please install [vagrant](http://www.vagrantup.com/downloads) and also install [OracleVMVirtualBox](https://www.virtualbox.org/wiki/Downloads)
3. Please open the GIT Bash and install node ```sudo apt-get install npm```
4. Navigate to the cloned repository and type in ```vagrant up``` to set up the vagrant machine
5. Then type in ```vagrant ssh``` to open the vagrant machine
6. Now go to the folder vagrant of the root using ```cd /vagrant```
7. To install the dependencies use ```npm install```
8. Now run the application on a local server using ```npm start```
9. Now go to any browser and type in the url ```localhost:8080```

###License
This project is licensed under the terms of the Apache-2.0 license

*********************


Project structure

bin/www <-- This is where it all starts
app.js <-- Actual entry point to the entire application and defining or all express routes
passport-init.js <-- Using npm passport and passport-local module code for login, signout and updating users
views/ <-- All the initial views in express go here
routes <-- All your restful routes go here organized by each application. Please add separate application in separate folder
Gruntfile.js <-- Configuration file for running automated tasks

public/controllers <-- All angular controllers organized by each application
public/directives <-- All angular directives organized by html and javascripts and inturn by each application
public/filters <-- All angular filters go here
public/graphs <-- D3 graph code go here. This is optional. You may also use d3 npm module to write graph code
public/images <-- All the images needed for application
public/json <-- json configuration file. Soon to be updated in mongo db
public/lib <-- All external javascripts and javascript framerworks
public/modules <-- All angular modules
public/routes <-- Update your angular routes here
public/services <-- All angular services organized by application
public/stylesheets <-- CSS styles
public/svg <-- The busy button you see when data is loading
public/views <-- All views for angular goes here

node_modules/ <-- All npm modules are here
models/ <-- Schema and models for mongo go here
database/ <-- This contains our initial apt-cache control data

protractorspec/ <-- All the protractor test files are here
test/ <--  All the mocha test files go here
