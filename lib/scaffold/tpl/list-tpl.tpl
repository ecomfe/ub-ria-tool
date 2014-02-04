<!-- target: ${templateName} -->
<!-- import: ${templateName}Main -->

<!-- target: ${templateName}Main -->
<div class="view list-view">
    <section class="list-filter-options">
        <form class="list-filter" data-ui-type="Form" data-ui-id="filter" action="/slot/search"
            method="GET" novalidate="novalidate">
            <div data-ui-type="Select" data-ui-id="status" data-ui-name="status"
                data-ui-datasource="@statuses" data-ui-value="@status"
                data-ui-extension-submit-type="AutoSubmit"></div>
            <!-- TODO: 如有其它筛选条件在此添加 -->
            <!-- use: listSearchBox(placeholder="输入${descripion}名称") -->
        </form>
    </section>
    <!-- TODO: 如有其它独占一块的复杂筛选条件在此添加单独的`<section>`元素 -->
    <footer class="list-meta">
        <!-- if: ${canBatchModify} -->
        <div class="list-operations">
            <!-- import: defaultBatchButtons -->
            <!-- TODO: 如有特殊的批量操作在此添加，可删除上一行 -->
        </div>
        <!-- /if -->
    </footer>
    <!-- import: listTable -->
    <!-- import: listPager -->
</div>
