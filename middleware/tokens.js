const {sign} = require('jsonwebtoken')


const createAccessToken = (userId) => {
    return sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d',
    })
}
const createRefreshToken = (userId) => {
    return sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d',
    })
}

const sendAccessToken = (req, res, accesstoken) => {
    res.send({
        accesstoken,
        email: req.body.email
    })
}
const sendRefreshToken = (res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
      httpOnly: true,
      path: '/refresh_token',
    });
  };

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}