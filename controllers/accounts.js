'use strict';

const userstore = require('../models/user-store.js');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('station', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    //const password = userstore.getUserByEmail(request.body.password);
    //logger.info({user});
    //logger.info(password);
    
    if (user /*&& password*/) {
      response.cookie('station', user.email);
      //response.cookie('station', user.password);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      //logger.info(`error ${user.email}`);
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },
  
/*  checkPassword(password){                //check password NOT WORKING
    if (user.password == password)
       return true;
    else
      return false;
  }
*/  
};

module.exports = accounts;