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

<!-- target: <%-: templateName %>Main(master = readView) -->
<!-- content: sections -->
    <section class="form-section">
        <!-- use: labelReadField(label = '名称', value = ${name}) -->
        <!-- use: labelReadField(label = '显示顺序', value = ${displayOrder}) -->
        <!-- use: labelReadField(label = '说明', value = ${description}) -->
        <!-- TODO: 添加其它字段 -->
    </section>
<!-- /content -->
