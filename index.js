const registrationService = require('.backend_services/register');
const loginService = require('./backend_services/login');
const validationService = require('./backend_services/validate');
const util = require('./backend_services/Utility/utility');

const healthcheck = 'health';
const userRegistration = 'registration';
const userLogin = 'login';
const verify = 'validate';

export const handler = async(event) => {
    console.log('Request Event:', event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthcheck:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === registration:
            const registerBody = JSON.parse(event.body);
            response = await registrationService.register(registerBody);
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === login:
            const loginBody = JSON.parse(event.body);
            response = loginService.login(200);
            break;
        case event.httpMethod === 'POST' && event.path === validate:
            const validateBody = JSON.parse(event.body);
            response = validationService.validate(validateBody);
            break;
        default:
                response = util.buildResponse(404, '404 NOT FOUND ERROR');
    }
};


