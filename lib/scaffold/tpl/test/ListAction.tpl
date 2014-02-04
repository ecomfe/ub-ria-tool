define(function (require) {
    var ListAction = require('common/ListAction');
    var ${actionType} = require('${entityName}/List');

    describe('${actionType}Action', function () {
        it('should be a constructor', function () {
            expect(${actionType}).toBeOfType('function');
        });

        it('should be instaitable', function () {
            expect(new ${actionType}()).toBeOfType('object');
        });

        it('should extends ListAction', function () {
            var action = new ${actionType}();
            expect(action instanceof ListAction).toBe(true);
        });
    });
});
