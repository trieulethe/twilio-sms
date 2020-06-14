const assert = require('assert');
const server = require('../app')
const User = require('../models/user')
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

require('dotenv').config()
const phone = process.env.PHONE_TEST

describe('User', () => {
  before((done) => { //Before each test we empty the database
    User.deleteMany({}, (err) => {
      done();
    });
  });
  /*
   * Test route phone input
   */
  describe('/POST book', () => {
    it('send sms to phone', (done) => {
      const data = {
        phone: phone
      }
      chai.request(server)
        .post('/phone')
        .send(data)
        .end((err, res) => {
          // console.log('res:', res.body)
          res.body.should.have.property('success').eql(true);
          res.body.should.be.a('object');
          done();
        });
    });
  })

  // test phone verify
  describe('/POST verify', () => {
    it('verify phone', (done) => {
      User.findOne({
          phone: phone
        })
        .then(data => {
          // console.log('data:', data)
          chai.request(server)
            .post('/phone/verify')
            .send({
              phone: phone,
              code: data.verify_code
            })
            .end((err, res) => {
              // console.log('res:', res.body.data.user)
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('data')
              res.body.should.be.a('object');
              res.body.data.user[0].should.have.property('verified').eql(true);
              done();
            });
        })

    });
  })

  //test user register
  describe('/POST register', () => {
    it('register user', (done) => {
      const data = {
        phone: phone,
        first_name: 'le',
        last_name: 'trieu',
        email: 'thetrieule1995@gmail.com',
        country: 'vietnam',
        province: 'Ha tay',
        city: 'Ha Noi',
        address_line: '43',
        postal_code: '11'
      }
      chai.request(server)
        .post('/users')
        .send(data)
        .end((err, res) => {
          // console.log('res:', res.body)
          res.body.data.should.have.property('first_name')
          res.body.data.should.have.property('last_name')
          res.body.data.should.have.property('email')
          res.body.data.should.have.property('country')
          res.body.data.should.have.property('province')
          res.body.data.should.have.property('city')
          res.body.data.should.have.property('address_line')
          res.body.data.should.have.property('postal_code')
          res.body.data.should.have.property('_id')
          res.body.data.should.have.property('verify_code')
          res.body.data.should.have.property('phone')
          res.body.data.should.have.property('verified')
          done();
        });

    });
  })

})