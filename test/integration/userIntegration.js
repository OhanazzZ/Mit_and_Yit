const expect = require('chai').expect;
const sinon = require('sinon');
const supertest = require('supertest');
var User = require('../../models/Users.js');
const app = require('../../app')

describe('userController integartion test', () => {
    it('valid user signup---view', async () => {
        const sandbox = sinon.createSandbox();
        after(async () => {
            sandbox.reset();
        })
        
        const user = {
                username: 'name',
                email: 'email@gmail.com',
                password: 'password',
                password2: 'password',
                gender: 'Female',
                dietary: {
                    cuisine: {
                        first: '',
                        second: '',
                        third: ''
                    },
                    religion: '',
                    allergy: '',
                },
                additional: {
                    academic: {
                        major: '',
                        level: ''
                    },
                    hobbies: '',
                    career: '',
                },
                availability: {
                    lunch:'',
                    dinner:'',
                    coffee:''
                },
                request:'',
                history:'',
                review: ''
        };
        sandbox.replace(User.prototype, 'save', function () {
            return Promise.resolve();
        })
        const res = await supertest(app).post('/user/signup').send(user);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('text/html');
        expect('Location','/login')
    })

    it('invalie user signup--view', async () => {
        const sandbox = sinon.createSandbox();
        after(async () => {
            sandbox.reset();
        })
        const user = {
            username: '',
            email: 'email@gmail.com',
            password: 'password',
            password2: 'password',
            gender: 'Female',
            dietary: {
                cuisine: {
                    first: '',
                    second: '',
                    third: ''
                },
                religion: '',
                allergy: '',
            },
            additional: {
                academic: {
                    major: '',
                    level: ''
                },
                hobbies: '',
                career: '',
            },
            availability: {
                lunch:'',
                dinner:'',
                coffee:''
            },
            request:'',
            history:'',
            review: ''
    };
        sandbox.replace(User.prototype, 'save', function () {
            return Promise.resolve();
        })
        const res = await supertest(app).post('/user/signup').send(user);
        expect(res.redirect).to.equal(false);
        expect('Location','/signup')
        expect(res.type).to.equal('text/html');
    })
})