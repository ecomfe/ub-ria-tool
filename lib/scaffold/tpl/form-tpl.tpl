<!-- target: <%-: templateName %>(master = formPage) -->
<!-- content: crumb -->
    <!-- import: <%-: templateName %>Crumb -->
<!-- /content -->
<!-- content: formMain -->
    <!-- import: <%-: templateName %>Main -->
<!-- /content -->

<!-- target: <%-: templateName %>Crumb(master = crumb) -->
<!-- content: path -->
    <!-- use: formCrumb(title = '<%-: description %>') -->
<!-- /content -->

<!-- target: <%-: templateName %>Main(master = formView) -->
<!-- content: sections -->
    <section class="form-section">
        <!-- use:
            textboxField(
                title = '名称', field = 'name', required = true, countWord = true
            )
        -->
        <!-- use:
            textboxField(
                title = '显示顺序', field = 'displayOrder', required = true, min = 1, max = 10000, patern = 'rule.positiveInteger.pattern', tipTitle = '什么是显示顺序？', tip = '显示顺序用于排序，按从小到大升序排列。'
            )
        -->
        <!-- use:
            textareaField(
                title = '说明',
                field = 'description',
                length = 400,
                description = '(选填)'
            )
        -->
        <!-- TODO: 各类型字段在此添加，相关模板请参考common/tpl/form.tpl.html中各常用模板函数 -->
    </section>
<!-- /content -->
