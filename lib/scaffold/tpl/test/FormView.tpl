define(function (require) {
    var FormView = require('ub-ria/FormView');
    var ${viewType} = require('${entity}/${viewModule}');

    describe('${viewType}', function () {
        it('should be a constructor', function () {
            expect(${viewType}).toBeOfType('function');
        });

        it('should be instaitable', function () {
            expect(new ${viewType}()).toBeOfType('object');
        });

        it('should extends FormView', function () {
            var view = new ${viewType}();
            expect(view instanceof FormView).toBe(true);
        });
    });
});
