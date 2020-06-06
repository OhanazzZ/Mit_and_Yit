const sinon = require('sinon');
const expect = require('chai').expect;

var User = require('../../models/Users.js');

const userController = require("../../controllers/userController.js");

describe('controllers test', () => {
    const sandbox = sinon.createSandbox();

    after(async () => {
        sandbox.reset();
    })
    
    it("add new user", async () => {
        const fake = sinon.fake();
        const req = {
            body: {
                username: "name",
                email: "email@gmail.com",
                password: "password",
                password: "password",
                gender: 'female',
            },
            checkBody: function() {
                return {notEmpty: () => true, isEmail: () => true, isLength: () => true, equals: () => true};
            },
            validationErrors: function() {
                return
            }
        };
        const res = {
            send: fake,
            status: fake
        };


        await userController.signup(req, res);
    })
})