var assert = require('assert');
var expect = require('chai').expect;
var getUsers = require('../middlewares/users').GetUsers;

describe('Get all users', function () {
    var consolelog = console.log;

    it('All users should be returned', function (done) {
        var users = [{ name: 'user1' }, { name: 'user2' }];
        var context = {
            userModel: {
                find: function () {
                    return this;
                },
                select: function () {
                    return this;
                },
                exec: function (cb) {
                    cb(undefined, users);
                }
            }
        };
        var request = {

        };
        var response = {
            template: {

            }
        };
        var printedError = false;
        var next = function () {
            console.log = consolelog;
            expect(printedError).to.be.equal(false);
            expect(response.template.data).to.be.equal(users);
            done();
        };
        console.log = function () {
            printedError = true;
        };
        getUsers(context)(request, response, next);
    });

    it('Database error should occour', function (done) {
        var context = {
            userModel: {
                find: function () {
                    return this;
                },
                select: function () {
                    return this;
                },
                exec: function (cb) {
                    cb(new Error('Failed to get from db'), undefined);
                }
            }
        };
        var request = {

        };
        var response = {
            template: {

            }
        };
        var printedError = false;
        var next = function () {
            console.log = consolelog;
            expect(printedError).to.be.equal(true);
            expect(response.template.data).to.not.exist;
            done();
        };
        console.log = function () {
            printedError = true;
        };
        getUsers(context)(request, response, next);
    });
});
