define(function (require) {
    var <%-: type %> = require('<%- moduleID %>');

    describe('<%-: type %>', function () {
        it('should be a constructor', function () {
            expect(<%-: type %>).toBeOfType('function');
        });

        it('should be instaitable', function () {
            expect(new <%-: type %>()).toBeOfType('object');
        });

        it('should extends <%-: baseType %>', function () {
            var instance = new <%-: type %>();
            var <%-: baseType %> = require('<%- baseTypeModuleID %>');
            expect(type instanceof <%-: baseType %>).toBe(true);
        });

        describe('created via script', function () {
            // TODO: 添加用例
        });

        describe('created via HTML', function () {
            // TODO: 添加用例
        });

        describe('generally', function () {
            // TODO: 添加用例
        });
    });
});
