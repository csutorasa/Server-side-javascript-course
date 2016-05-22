var assert = require('assert');
var expect = require('chai').expect;
var getPets = require('../middlewares/pets').GetPets;

describe('Get all pets', function () {
    var consolelog = console.log;

    it('All pets should be returned', function (done) {
        var pets = [{ name: 'pet1' }, { name: 'pet2' }];
        var context = {
            petModel: {
                find: function () {
                    return this;
                },
                populate: function () {
                    return this;
                },
                exec: function (cb) {
                    cb(undefined, pets);
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
            expect(response.templateUrl).to.be.equal('/pets.ejs');
            expect(response.template.title).to.be.equal('Pets');
            expect(response.template.data).to.be.equal(pets);
            done();
        };
        console.log = function () {
            printedError = true;
        };
        getPets(context)(request, response, next);
    });

    it('Database error should occour', function (done) {
        var context = {
            petModel: {
                find: function () {
                    return this;
                },
                populate: function () {
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
            expect(response.templateUrl).to.be.equal('/pets.ejs');
            expect(response.template.title).to.be.equal('Pets');
            expect(response.template.data).to.not.exist;
            done();
        };
        console.log = function () {
            printedError = true;
        };
        getPets(context)(request, response, next);
    });
});
