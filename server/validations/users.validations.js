const Joi = require('joi')

const userSchema_login = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required()
})
const userSchema_register = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
    repeat_password: Joi.ref('password')
})

module.exports = {
    userSchema_login,userSchema_register
}