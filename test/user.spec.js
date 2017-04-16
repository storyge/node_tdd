'use strict'

process.env.NODE_ENV = 'dev'

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')


let config = require('../knexfile.js')[process.env.NODE_ENV];

let knex = require('knex')(config)

chai.use(chaiHttp)
let should = chai.should()

describe('user tests', function () {

    beforeEach(async function () {
        await knex.migrate.rollback()
        await knex.migrate.latest()
        await knex.seed.run()
    })

    afterEach(async function () {
        await knex.migrate.rollback()
    })

    describe('GET /hello', function () {
        it('result show be true', async function () {
            let res = await chai.request(server).get('/hello')
            res.body.result.should.equal(true)
        })
    })

    describe('POST /login', function () {
        it('login should sucess', async function () {
            try {
                let res = await chai.request(server).post('/login').send({ 'name': 'liunix', 'password': '123456' })
                // console.log('res=',res)
                // console.log('res.body=',res.body)
                // res.body.result.should.equal(true)
                // let res = await chai.request(server).post('/login').field('_method', 'put').field('name','liunix').field('password','123456')
                // res.body.result.should.equal(true)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        })
    })

})
