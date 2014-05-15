<!-- target: <%-: templateName %>(master=fullsizePageForm) -->
<!-- content: formMain -->
    <!-- import: <%=: templateName %>Main -->
<!-- /content -->

<!-- target: <%-: templateName %>Main -->
<!-- use: formHead(entityName="<%-: entity %>") -->
    <%
        for (var i = 0; i < form.length; i++) {
            var section = form[i];
            if (section.toggleable) {
    %><!-- use: <%- section.name %>Section(sectionId = 'additional-panel') -->
    <%
            }
            else {
    %><!-- import: <%- section.name %>Section -->
    <%
            }
        }
%><!-- use: formTail -->

<%
    for (var m = 0; m < form.length; m++) {
        var section = form[m];
        if (section.toggleable) {
%>

<!-- target: <%- section.name %>Section(master=formToggleSection) -->
<!-- content: title -->
<%-: section.title %><em class="form-section-title-hint">（选填）</em>
<!-- /content -->
<!-- content: content -->
    <section class="form-section"><%
        }
        else {
%>

<!-- target: <%- section.name %>Section -->
<section class="form-section">
    <h3 class="form-section-title">基本信息<%- section.title %></h3><%
        }
%>
    <%
        for (var n = 0; n < section.fields.length; n++) {
            var field = section.fields[n];
            if (field.ctrl === 'textbox' || field.ctrl === 'moneyTextbox' || field.ctrl === 'urlTextbox'
                || field.ctrl === 'sizeTextbox' || field.ctrl === 'frequencyTextbox' || field.ctrl === 'secondTextbox'
                || field.ctrl === 'percentTextbox'
            ) {
    %><!-- use:
        <%- field.ctrl %>Field(
            title = '<%- field.desc %>', field = '<%- field.field %>', name = '<%- field.field %>', id = '<%=: field.field | dash %>'<%
            if (field.required) { %>, required = true<%
            }
            if (field.maxLength) { %>, maxLength = <%= field.maxLength %><%
            }
            if (field.min !== undefined) { %>, min = '<%- field.min %>'<%
            }
            if (field.max !== undefined) { %>, max = '<%- field.max %>'<%
            }
            if (field.pattern) { %>, pattern = '<%- field.pattern %>'<% } %>, countWord = true
        )
    -->
    <%
            }
            else if (field.ctrl === 'textarea') {
    %><!-- use:
        textareaField(
            title = '<%- field.desc %>', field = '<%- field.field %>', id = '<%=: field.field | dash %>'<%
            if (field.required) { %>, required = true, <%
            }
            %>, maxLength = <%- field.maxLength %>
        )
    -->
    <%
            }
            else if (field.ctrl === 'checkbox') {
    %><!-- use:
        checkboxField(
            title = '<%- field.desc %>', field = '<%- field.field %>', id = '<%=: field.field | dash %>'<%
            if (field.required) { %>, required = true<%
            }
            %>, text = '<%- field.desc %>的描述'
        )
    -->
    <%
            }
            else if (field.ctrl === 'radio') {
    %><div class="form-field">
        <label for="<%=: entity | dash %>-<%=: field.field | dash %>" class="form-field-name"><%- field.desc %>：</label>
        <div class="form-field-value" id="<%=: entity | dash %>-<%=: field.field | dash %>">
            <div data-ui-type="BoxGroup" data-ui-id="<%=: entity | dash %>-<%=: field.field | dash %>"
                data-ui-name="<%- field.field %>" data-ui-box-type="radio"
                data-ui-value="@<%- field.field %>">
                <ul><%
                for (var x = 0; x < field.enums.length; x++) {
                    var item = field.enums[x];
                %>
                    <li>
                        <input type="radio" id="<%=: entity | dash %>-<%=: field.field | dash %>-<%=: item.alias | dash %>"
                            name="<%=: item.alias | camel %>" value="<%- x %>" />
                        <label for="<%=: entity | dash %>-<%=: field.field | dash %>-<%=: item.alias | dash %>"><%- item.text %></label>
                    </li><%
                }
        %>
                </ul>
            </div>
            <aside data-ui-type="Tip" id="tip-for-<%=: entity | dash %>-<%=: field.field | dash %>" title="请填写Tip的标题">
                请填写Tip的内容。
            </aside>
        </div>
    </div>
    <%
            }
            else if (field.ctrl === 'toggleSelector') {
    %><!-- use:
        toggleSelectorField(
            title = '<%- field.desc %>', field = '<%- field.datasource %>.id', name = '<%- field.field %>',
            id = '<%=: field.field | dash %>', itemName = '<%- field.desc %>', datasource = '@<%- field.datasource %>'<%
            if (field.required) { %>, required = true<%
            }
            %>
        )
    -->
    <%
            }
            else if (field.ctrl === 'cascadingSelector') {
    %><!-- use:
        cascadingSelectorField(
            title = '<%- field.desc %>', field = '<%- field.datasource %>.id', name = '<%- field.field %>',
            id = '<%=: field.field | dash %>', itemName = '<%- field.desc %>', datasource = '@<%- field.datasource %>'<%
            if (field.required) { %>, required = true<%
            }
            %>
        )
    -->
    <%
            }
            else {
    %><!-- TODO: 由label + value + tip组成的表单field模板样例，content可以是任意内容 -->
    <div class="form-field ${fieldClasses}">
        <label class="form-field-name"><%- field.desc %>：</label>
        <div class="form-field-value">
            <!-- 此处添加content内容-->
            <aside data-ui-type="Tip" class="form-field-tip" title="${tipTitle}">${tip}</aside>
            <div class="form-field-hint" data-ui-type="Label">${singleLinHint}</div>
        </div>
    </div>
<%
            }
        }

        if (!section.toggleable) {
%></section><%
        }
        else {
%>    </section>
<!-- /content --><%
        }
    }
%>
