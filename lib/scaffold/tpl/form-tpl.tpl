<!-- target: ${templateName} -->
<!-- import: formCrumb -->
<!-- import: ${templateName}Main -->

<!-- target: ${templateName}Main -->
<div class="view form-view">
    <h2>新建${description}</h2>
    <form data-ui-type="Form" data-ui-id="form"
        action="/${entityName}s" method="POST" novalidate="novalidate">
        <section class="form-section">
            <div class="form-field">
                <label for="${entity}-name" class="form-field-name">名称：</label>
                <input data-ui-type="TextBox" data-ui-id="name"
                    data-ui-required="required" data-ui-length="100"
                    data-ui-extension-count-type="WordCount"
                    data-value="@name"
                    id="${entity}-name" name="name" title="${description}名称" />
            </div>
            <!-- import: formSubmitField -->
        <!-- TODO: 增加其它字段 -->
        </section>
    </form>
</div>
