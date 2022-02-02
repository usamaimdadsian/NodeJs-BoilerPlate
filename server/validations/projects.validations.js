const Joi = require('joi')

const projectSchema_create = Joi.object({
    title: Joi.string().required(),
    categories: Joi.string(),
    date: Joi.date(),
    image: Joi.any(),
    url: Joi.string().optional().allow('').min(5),
    content: Joi.string().optional()
})

module.exports = {
    projectSchema_create
}