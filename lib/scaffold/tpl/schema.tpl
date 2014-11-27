/**
 * <%-: project.alias %>
 *
 *
 * @file <%-: description %>实体描述
 * @author {<%-: developer.name %>(<%- developer.email %>)}
 */
define(
    function (require) {
        return {
            id: ['number', 'ID'],
            name: ['string', '名称', { required: true, maxLength: 100 }],
            type: ['number', '类型', { required: true }]
            // TODO: 其它字段在这里添加
        };
    }
);
