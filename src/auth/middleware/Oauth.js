'use strict';
require('dotenv').config();
// After Login Form 
// https://docs.github.com/en/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github

// should be in dotenv.
const superagent = require('superagent');
const userModel = require('../../auth/models/users');
const jwt = require('jsonwebtoken');

let CLIENT_ID = process.env.CLIENT_ID ;
let CLIENT_SECRET = process.env.CLIENT_SECRET ;
let SECRET = process.env.SECRET ;

let tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
let userUrl = 'https://api.linkedin.com/v2/me';

module.exports = async (req, res, next) => {
    // 2. Users are redirected back to your site by GitHub
    // console.log("query object: ", req.query);
    const code = req.query.code;
    console.log("AFTER FORM 1.CODE ======== ", code);
    const token = await exchangeCodeWithToken(code);
   // console.log("AFTER FORM 2.TOKEN ======== ", token);
    // 3. Use the access token to access the user API
    let remoteUser = await exchangeTokenWithUserInfo(token);
    console.log("AFTER FORM 3.USER ======== ", remoteUser);
    let [localUser, localToken] = await getLocalUser(remoteUser);
    req.user = localUser;
    req.token = localToken;
    next();
}

async function exchangeCodeWithToken(code) {
    // tokenUrl + params
    // response : token from github
    try {
        const tokenResponse = await (await superagent.post(tokenUrl)).send({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            grant_type:'authorization_code',
            'Content-Type':'application/x-www-form-urlencoded',
            redirect_uri:'https://auth-team-ltuc.herokuapp.com/api/auth'

        });
       console.log("tokenResponse.body", tokenResponse.body)
        return tokenResponse.body.access_token;
    } catch(err) {
        
        console.log(err);
    }
}

async function exchangeTokenWithUserInfo(token) {
     try {
        const userInfo = await superagent.get(userUrl).set({
            'Authorization': `Bearer ${token}`,
        });
       console.log(userInfo,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        return userInfo.body;
     } catch(err) {
        console.log(2);
     }
}

async function getLocalUser(userObj) {
    try {
        let userRecord = {
            username: userObj.first_name,
            password: 'oauth' 
        }
        let newUser = new userModel(userRecord);
        let user = await newUser.save();
        let token = jwt.sign({username: user.username}, SECRET);
        return [user, token];
    }catch(err) {
        console.log(3)
    }
}