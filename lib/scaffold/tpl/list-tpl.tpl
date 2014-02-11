<!-- target: ${templateName} -->
<div class="list fullsize-page">
    <!-- import: ${templateName}Main -->
</div>

<!-- target: ${templateName}Main -->
<!-- if: ${canCreate} -->
<div class="list-action">
    <a data-ui-type="Button" data-ui-id="create" data-ui-skin="spring-add" href="#/${entity}/create">新建${description}</a>
</div>
<!-- /if -->
<div class="list-view">
    <footer class="list-meta">
        <!-- if: ${canBatchModify} -->
        <div class="list-operation">
            <!-- import: defaultBatchButtons -->
        </div>
        <!-- /if -->
        <!-- import: ${templateName}Filter -->
    </footer>
    <!-- import: ${templateName}ExtraFilter -->
    <section class="list-search-parameter">
        <!-- import: listSearchInfo -->
    </section>
    <!-- import: listTable -->
    <!-- import: listPager -->
</div>

<!-- target: ${templateName}Filter -->
<form class="list-filter" data-ui-type="Form" data-ui-id="filter"
    action="/${entity | plural}" method="GET" novalidate="novalidate">
    <div data-ui-type="Select" data-ui-id="status" data-ui-name="status"
        data-ui-datasource="@statuses" data-ui-value="@status"
        data-ui-extension-submit-type="AutoSubmit"></div>
    <!-- TODO: 如有其它筛选条件在此添加 -->
    <!-- use: listSearchBoxNew(placeholder = "请输入${description}名称") -->
</form>

<!-- target: ${templateName}ExtraFilter -->
<!-- TODO: 如果有复杂筛选条件在此处添加 -->