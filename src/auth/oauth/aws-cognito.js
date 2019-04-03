'use strict';

const superagent = require('superagent');
const Users = require('../users-model.js');
const API = 'http://localhost:3000';


// O-KRRR

const authRequest = `https://www.amazon.com/ap/oa?client_id=${process.env.AMAZON_CLIENT_ID}`;
const token = 'https://api.amazon.com/auth/o2/token';

let authorize = (request) => {
  /*
  http://localhost:3000/oauth?code=ANMcYnKpPFXuqayqvwEp&scope=profile
  */
  console.log('(1)', request.query.code);

  let auth_code = request.query.code;

  let apiURL = 'https://api.amazon.com/auth/o2/token';

  let options = {
    grant_type: 'authorization_code',
    code: auth_code,
    redirect_uri: 'http://localhost:3000/oauth',
    client_id: process.env.AMAZON_CLIENT_ID,
    client_secret: process.env.AMAZON_CLIENT_SECRET,
  };

  let QueryString = Object.keys(options).map((key, i) => {
    return `${key}=` + encodeURIComponent(options[key]);
  }).join('&');

  let tokenURL = `${apiURL}?${QueryString}`;
  console.log('tokenURL:', tokenURL);

  return superagent.post(tokenURL)
    .set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
    .then(stuff => console.log('got back:', stuff))

    // .then( response => {
    //   let access_token = response.body.access_token;
    //   console.log('(2)', access_token);
    //   // return access_token;
    // })
    /*
    .then(token => {
      console.log(SERVICE, token);
      return superagent.get(SERVICE)
        .set('Authorization', `Bearer ${token}`)
        .then( response => {
          let user = response.body;
          console.log('(3)', user);
          return user;
        });
    })
    .then( oauthUser => {
      console.log('(4) Create Our Account');
      return Users.createFromOauth(oauthUser.email);
    })
    .then( actualUser => {
      return actualUser.generateToken(); 
    })
    */

    .catch(error => error);
};
module.exports = authorize;


// tokenURL: https://api.amazon.com/auth/o2/token?grant_type=authorization_code&code=ANIHBxhhJyHNezAblMqD&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth&client_id=amzn1.application-oa2-client.5ce879078d484277940a8f0e31ac4f70&client_secret=00bcb6c13b2844fcf90d823daaa08b80b298dcd54ad9d8b66b41c1c8a174a30d

/*
https://api.amazon.com/auth/o2/token/grant_type=authorization_code&code=ANIHBxhhJyHNezAblMqD&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth&client_id=amzn1.application-oa2-client.5ce879078d484277940a8f0e31ac4f70&client_secret=00bcb6c13b2844fcf90d823daaa08b80b298dcd54ad9d8b66b41c1c8a174a30d

POST /auth/o2/token HTTP/l.l
Host: api.amazon.com
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
grant_type=authorization_code
&code=SplxlOBezQQYbYS6WxSbIA
&client_id=foodev
&client_secret=Y76SDl2F
*/