const { Router } = require('express');
const handlers = require('../handlers/home');

const homeRoutes = Router();


homeRoutes.get('/', handlers.homePage);

module.exports = homeRoutes;

