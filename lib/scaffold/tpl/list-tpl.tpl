<!-- target: <%-: templateName %>(master = listPage) -->
<!-- content: crumb -->
    <!-- import: <%-: templateName %>Crumb -->
<!-- /content -->
<!-- content: main -->
<!-- import: <%-: templateName %>Main -->
<!-- /content -->

<!-- target : <%-: templateName %>Crumb(master = crumb) -->
<!-- content: path -->
    <span><%-: description %></span>
<!-- /content -->

<!-- target: deliveryListMain(master = listView)  -->
<!-- content: actionButtons -->
    <a data-ui-type="Link" data-ui-id="create" data-ui-skin="add" data-ui-href="#/<%-: entity %>/create">新建<%-: description %></a>
<!-- /content -->
<!-- if: ${canBatchModify} -->
    <!-- content: bacthOperation -->
        <!-- use: batchButton(status = 0, statusName = "stop", command = "删除") -->
        <!-- use: batchButton(status = 1, statusName = "restore", command = "启用") -->
    <!-- /content -->
<!-- /if -->
<!-- content: filter -->
    <esui-button data-ui-id="filter-switch" data-ui-skin="select">筛选</esui-button>
<!-- /content -->
<!-- content: searchbox -->
    <!-- use: listSearchBox(placeholder = "输入<%-: description %>ID或名称") -->
<!-- /content -->
<!-- content: listFilter -->
    <!-- import: deliveryListFilters -->
<!-- /content -->
<!-- content: table -->
    <!-- use: listTable(useCommand = true) -->
<!-- /content -->

<!--target: deliveryListFilters(master = listFilter) -->
<!-- content: filters -->
    <!-- use:
        listFilterSelect(
            title = "状态：",
            name = "status",
            datasource = "statuses",
            field = "status"
        )
    -->
    <!-- TODO: 如有其它筛选条件在此添加 -->
<!-- /content -->
<!-- content: filterResults -->
    <!-- use:
        filterResult(
            title = "状态：", filter = ${filtersInfo.filters.status}
        )
    -->
    <!-- TODO: 如有其它筛选条件在此添加 -->
<!-- /content -->
