<!-- target: ${templateName} -->
<!-- import: ${templateName}Main -->

<!-- target: ${templateName}Main -->
<div class="list-action">
<!-- if: ${canCreate} -->
    <a data-ui-type="Button" data-ui-id="create" data-ui-skin="spring-add" href="#/${entity}/create">新建${description}</a>
<!-- /if -->
</div>
<div class="list-view">
    <footer class="list-meta">
        <!-- if: ${canBatchModify} -->
        <div class="list-operation">
            <!-- import: defaultBatchButtons -->
        </div>
        <!-- /if -->
        <form class="list-filter" data-ui-type="Form" data-ui-id="filter" action="/slot/search"
            method="GET" novalidate="novalidate">
            <div data-ui-type="Select" data-ui-id="status" data-ui-name="status"
                data-ui-datasource="@statuses" data-ui-value="@status"
                data-ui-extension-submit-type="AutoSubmit"></div>
            <!-- TODO: 如有其它筛选条件在此添加 -->
            <!-- use: listSearchBoxNew(placeholder = "请输入${description}名称") -->
        </form>
    </footer>
    <!-- TODO: 如果有复杂筛选条件在此处添加 -->
    <!-- import: listTable -->
    <!-- import: listPager -->
</div>
