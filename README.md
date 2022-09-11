Welcome to the Glitch Template
==============================

A starter project for learning Glitch.

This is an Express.js project, designed to work well with the Glitch development environment. It includes basic express setup, templating, routing, JSON based model and session support.

WeatherTopV2_Js is a Web App companion for the WeatherTop modular weather station.

This allows the user to signup/login with their member details and add or delete stations. 
Station are listed in alphabetical order.
The user can then input data such as weather code, temperature, windspeed, winddirection and air pressure.

Calculations are then preformed on this recorded data and return a symbol indicating current weather conditions along with description, temperature in both celcius and fahrenheit, trends in Temperature + WindSpeed + Pressure, min & max temperature values, wind speed/direction/chill, also min/max values, air pressure values with min/max values. 
User can also delete or edit entered readings.

App is uploaded on GitHub: https://github.com/jmcied/HDipCompSci-WeatherTop2-Js
Deployed on Glitch: https://weathertop2-js.glitch.me/

References: https://fomantic-ui.com/modules/dropdown.html

https://fomantic-ui.com/collections/form.html

https://www.w3schools.com/jsref/jsref_map.asp

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

Known Bugs: Date/Time is -1 hour to current time, no password check is being performed on user accounts 