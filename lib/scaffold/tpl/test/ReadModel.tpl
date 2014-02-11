define(function (require) {
    var FormModel = require('ub-ria/FormModel');
    var ${modelType} = require('${entity}/FormModel');

    describe('${modelType}', function () {
        it('should be a constructor', function () {
            expect(${modelType}).toBeOfType('function');
        });

        it('should be instaitable', function () {
            expect(new ${modelType}()).toBeOfType('object');
        });

        it('should extends FormModel', function () {
            var model = new ${modelType}();
            expect(model instanceof FormModel).toBe(true);
        });

        it('should complete given entity with checkEntity method', function () {
            var entity = { name: 'test' };
            var model = new ${modelType}();
            entity = model.checkEntity(entity);
            // TODO: 测试额外加给entity的属性，没有就删除这个用例
        });

        describe('datasource config', function () {
            // TODO: 对其它datasource配置项进行测试
        });
    });
});
