define(function (require) {
    var ListView = require('common/ListView');
    var Model = require('er/Model');
    var ${viewType} = require('${entity}/ListView');

    describe('${viewType}', function () {
        it('should be a constructor', function () {
            expect(${viewType}).toBeOfType('function');
        });

        it('should be instaitable', function () {
            expect(new ${viewType}()).toBeOfType('object');
        });

        it('should extends `ListView`', function () {
            var view = new ${viewType}();
            expect(view instanceof ListView).toBe(true);
        });

        it('should have designed default args', function () {
            var view = new ${viewType}();
            // TODO: 其它默认参数的检验
        });
    });
});
