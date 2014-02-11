define(function (require) {
    var ListModel = require('ub-ria/ListModel');
    var ${modelType} = require('${entity}/${modelModule}');

    describe('${modelType}', function () {
        it('should be a constructor', function () {
            expect(${modelType}).toBeOfType('function');
        });

        it('should be instaitable', function () {
            expect(new ${modelType}()).toBeOfType('object');
        });

        it('should extends ListModel', function () {
            var model = new ${modelType}();
            expect(model instanceof ListModel).toBe(true);
        });

        describe('datasource config', function () {
            // TODO: 对其它`datasource`配置项进行测试
        });

        describe('getQuery method', function () {
            // TODO: 如果有重写`getQuery`方法，则对其进行测试
        });
    });
});
