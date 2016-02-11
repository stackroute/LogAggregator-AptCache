Welcome to log aggregator!!!!! We help you analyze logs which we think is future of business intelligence!

To contribute to this project please follow the standard fork and pull procedure. If you have no idea what that is, Google is your best friend.

Project structure

bin/www <-- This is where it all starts
app.js <-- Actual entry point to the entire application and defining or all express routes
passport-init.js <-- Using npm passport and passport-local module code for login, signout and updating users
views/ <-- All the initial views in express go here
routes <-- All your restful routes go here organized by each application. Please add separate application in separate folder


public/controllers <-- All angular controllers organized by each application
public/directives <-- All angular directives organized by html and javascripts and inturn by each application
public/filters <-- All angular filters go here
public/graphs <-- D3 graph code go here. This is optional. You may also use d3 npm module to write graph code
public/html <-- default html views
public/images <-- All the images needed for application
public/json <-- json configuration file. Soon to be updated in mongo db
public/lib <-- All external javascripts and javascript framerworks
public/modules <-- All angular modules
public/routes <-- Update your angular routes here
public/services <-- All angular services organized by application
public/styles <-- CSS styles
public/stylesheets <-- CSS styles
public/svg <-- The busy button you see when data is loading
public/views <-- All views for angular goes here

node_modules/ <-- All npm modules are here
models/ <-- Schema and models for mongo go here
database/ <-- This contains our initial apt-cache control data

test/ <--  Your test files go here
