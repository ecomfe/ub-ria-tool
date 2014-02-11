define(function (require) {
    var ReadAction = require('ub-ria/ReadAction');
    var ${actionType} = require('${entity}/Form');

    describe('${actionType}Action', function () {
        it('should be a constructor', function () {
            expect(${actionType}).toBeOfType('function');
        });

        it('should be instaitable', function () {
            expect(new ${actionType}()).toBeOfType('object');
        });

        it('should extends ReadAction', function () {
            var action = new ${actionType}();
            expect(action instanceof ReadAction).toBe(true);
        });
    });
});
