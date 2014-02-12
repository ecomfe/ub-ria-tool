define(function (require) {
    var FormAction = require('ub-ria/FormAction');
    var <%-: actionType %> = require('<%- entity %>/<%- actionModule %>');

    describe('<%-: actionType %>Action', function () {
        it('should be a constructor', function () {
            expect(<%-: actionType %>).toBeOfType('function');
        });

        it('should be instaitable', function () {
            expect(new <%-: actionType %>()).toBeOfType('object');
        });

        it('should extends FormAction', function () {
            var action = new <%-: actionType %>();
            expect(action instanceof FormAction).toBe(true);
        });
    });
});
