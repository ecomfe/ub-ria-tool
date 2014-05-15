<!-- target: <%-: templateName %>(master=listPage) -->
<!-- content: main -->
<!-- import: <%-: templateName %>Main -->
<!-- /content -->

<!-- target: <%-: templateName %>Main(master=listView) -->
<!-- content: summary -->
    <!-- TODO: 如有摘要信息，在此添加，否则删除这个content中的内容 -->
    <span class="li-summary-text">启用： <span class="text-status text-avaliable">${enableCount}</span>个</span>
    <span class="li-summary-separator">|</span>
    <span class="li-summary-text">删除：<span class="text-status text-stoped">${disableCount}</span>个</span>
<!-- /content -->
<!-- content: actionButtons -->
    <button data-ui-type="Button" data-ui-id="create" data-ui-skin="add">新建<%- description %></button>
<!-- /content -->
<!-- content: bacthOperation -->
<%
    for (var i = 0; i < list.batch.length; i++) {
        var batch = list.batch[i];
        if (batch.statusName === 'restore') {
    %><!-- use: batchButton(status = 1, statusName = "restore", command = "启用") -->
<%
        }
        else if (batch.statusName === 'remove') {
    %><!-- use: batchButton(status = 0, statusName = "remove", command = "删除") -->
<%
        }
        else {
%><!-- use: batchButton(status = <%- batch.status %>, statusName = "<%- batch.statusName %>", command = "<%- batch.command %>") -->
<%
        }
    }
%>
<!-- /content -->
<!-- content: filter -->
<%  for (var i = 0; i < list.filter.length; i++) {
    %><div data-ui-type="Select" data-ui-id="<%=: list.filter[i] | dash %>" data-ui-name="<%=: list.filter[i] %>"
        data-ui-datasource="@<%=: list.filter[i] | plural | camel %>" data-ui-value="@<%=: list.filter[i] %>"
        data-ui-extension-submit-type="AutoSubmit"></div>
    <%
    }
%>
    <!-- TODO: 如有其它筛选条件在此添加 -->
    <div data-ui-type="DropDown" data-ui-skin="filter-select"
        data-ui-id="filter-select" data-ui-group="filter"
        data-ui-layerid="filter-panel"
    >筛选器</div>
    <!-- TODO: 如不需要筛选弹层，则删除上面这个筛选器的div -->
<!-- /content -->
<!-- content: searchbox -->
    <!-- use: listSearchBox(placeholder = "请输入<%-: description %>名称") -->
<!-- /content -->
<!-- content: table -->
    <!-- use: listTable(<% if (list.table.withCommand) { %>useTableCommand = true<% } %>) -->
<!-- /content -->
<!-- content: advancedFilter -->
    <!-- TODO: 如不需要筛选弹层，则这个import -->
    <!-- import: <%-: templateName %>AdvancedFilter -->
<!-- /content -->
<!-- content: drawPanel -->
    <div data-ui-type="DrawerActionPanel" data-ui-id="editPanel"
        data-ui-left="155" data-ui-hidden="hidden">
    </div>
    <div data-ui-type="DrawerActionPanel" data-ui-id="getCodePanel"
        data-ui-left="155" data-ui-hidden="hidden">
    </div>
<!-- /content -->

<!-- target: <%-: templateName %>AdvancedFilter -->
<!-- TODO: 如不需要筛选弹层，则删除这个Target，并删除上方的引用 -->
<div id="<%-: entity %>-list-advanced-filter-panel" data-ui-type="PartialForm" data-ui-id="advanced-filter-panel" data-ui-group="child-action"
    data-ui-name="filter" data-ui-url="/<%-: entity %>/filter" class="advanced-filter-panel"
    data-ui-action-options="@filters"
    <!-- if: !${forceFilter} -->
        data-ui-hidden="1"
    <!-- /if -->
>
</div>
