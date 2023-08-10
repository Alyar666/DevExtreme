import { a11yCheck } from '../../../helpers/accessibilityUtils';
import url from '../../../helpers/getPageUrl';
import createWidget from '../../../helpers/createWidget';
import DataGrid from '../../../model/dataGrid';
import { getData } from '../helpers/generateDataSourceData';
import { Themes } from '../helpers/themes';
import { changeTheme } from '../../../helpers/changeTheme';
import FilterTextBox from '../../../model/dataGrid/editors/filterTextBox';
import HeaderFilter from '../../../model/dataGrid/headers/headerFilter';

fixture`Color contrast`
  .page(url(__dirname, '../../container.html'));

const DATA_GRID_SELECTOR = '#container';

[
  Themes.genericLight,
  Themes.genericDark,
  Themes.materialBlue,
  Themes.materialBlueDark,
].forEach((theme) => {
  test(`Grid without data in ${theme}`, async (t) => {
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);

    await t
      .expect(dataGrid.isReady())
      .ok();

    await a11yCheck(t, DATA_GRID_SELECTOR, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: [],
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Sorting and group panel in ${theme}`, async (t) => {
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);

    await t
      .expect(dataGrid.isReady())
      .ok();

    await a11yCheck(t, DATA_GRID_SELECTOR, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(10, 5),
      keyExpr: 'field_0',
      groupPanel: {
        visible: true,
      },
      columns: [
        'field_0',
        'field_1',
        'field_2',
        {
          dataField: 'field_3',
          sortOrder: 'asc',
          sortIndex: 0,
        },
        {
          dataField: 'field_4',
          sortOrder: 'desc',
          sortIndex: 1,
        },
      ],
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Paging with displayMode is 'full' in ${theme}`, async (t) => {
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);

    await t
      .expect(dataGrid.isReady())
      .ok();

    await a11yCheck(t, DATA_GRID_SELECTOR, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(100, 5),
      keyExpr: 'field_0',
      columns: [
        'field_0',
        'field_1',
        'field_2',
        'field_3',
        'field_4',
      ],
      paging: {
        pageSize: 5,
      },
      pager: {
        visible: true,
        allowedPageSizes: [5, 10, 'all'],
        showPageSizeSelector: true,
        showInfo: true,
        showNavigationButtons: true,
        displayMode: 'full',
      },
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Paging with displayMode is 'compact' in ${theme}`, async (t) => {
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);

    await t
      .expect(dataGrid.isReady())
      .ok();

    await a11yCheck(t, DATA_GRID_SELECTOR, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(100, 5),
      keyExpr: 'field_0',
      columns: [
        'field_0',
        'field_1',
        'field_2',
        'field_3',
        'field_4',
      ],
      paging: {
        pageSize: 5,
      },
      pager: {
        visible: true,
        allowedPageSizes: [5, 10, 'all'],
        showPageSizeSelector: true,
        showInfo: true,
        showNavigationButtons: true,
        displayMode: 'compact',
      },
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Grouping and Summary in ${theme}`, async (t) => {
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);

    await t
      .expect(dataGrid.isReady())
      .ok();

    await a11yCheck(t, DATA_GRID_SELECTOR, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(60, 5),
      keyExpr: 'field_0',
      columns: [
        'field_0',
        {
          dataField: 'field_1',
          groupIndex: 0,
        },
        {
          dataField: 'field_2',
          groupIndex: 1,
        },
        'field_3',
        'field_4',
      ],
      paging: {
        pageSize: 10,
      },
      groupPanel: {
        visible: true,
      },
      summary: {
        groupItems: [{
          column: 'field_3',
          summaryType: 'count',
          showInGroupFooter: true,
        }, {
          column: 'field_4',
          summaryType: 'count',
          showInGroupFooter: false,
          alignByColumn: true,
        }],
        totalItems: [{
          column: 'field_0',
          summaryType: 'count',
        }],
      },
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Filter row - filter menu in ${theme}`, async (t) => {
    // arrange
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);
    const filterEditor = dataGrid.getFilterEditor(0, FilterTextBox);

    await t
      .expect(dataGrid.isReady())
      .ok();

    // act
    await t.click(filterEditor.menuButton);

    // assert
    await t
      .expect(filterEditor.menu.isOpened)
      .ok();

    // act
    await a11yCheck(t, null, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(10, 5).map((item, index) => ({ ...item, index })),
      keyExpr: 'field_0',
      filterRow: {
        visible: true,
      },
      columns: [
        'field_0',
        'field_1',
        'field_2',
        'field_3',
        'field_4',
        {
          dataField: 'index',
          dataType: 'number',
          selectedFilterOperation: 'between',
          filterValue: [1, 7],
        },
      ],
    }, DATA_GRID_SELECTOR, {
      disableFxAnimation: true,
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Header filter - filter menu in ${theme}`, async (t) => {
    // arrange
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);
    const headerCell = dataGrid.getHeaders().getHeaderRow(0).getHeaderCell(0);
    const filterIconElement = headerCell.getFilterIcon();

    await t
      .expect(dataGrid.isReady())
      .ok();

    // act
    await t.click(filterIconElement);

    // assert
    await t
      .expect(new HeaderFilter().element.exists)
      .ok();

    // act
    await a11yCheck(t, null, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(10, 5),
      keyExpr: 'field_0',
      headerFilter: {
        visible: true,
      },
      columns: [
        'field_0',
        'field_1',
        'field_2',
        'field_3',
        'field_4',
      ],
    }, DATA_GRID_SELECTOR, {
      disableFxAnimation: true,
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Fixed columns in ${theme}`, async (t) => {
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);

    // assert
    await t
      .expect(dataGrid.isReady())
      .ok();

    await a11yCheck(t, DATA_GRID_SELECTOR, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(10, 7),
      keyExpr: 'field_0',
      columns: [
        {
          dataField: 'field_0',
          fixed: true,
        },
        {
          dataField: 'field_1',
          fixed: true,
        },
        'field_2',
        'field_3',
        'field_4',
        {
          dataField: 'field_5',
          fixed: true,
          fixedPosition: 'right',
        },
        {
          dataField: 'field_6',
          fixed: true,
          fixedPosition: 'right',
        },
      ],
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Column chooser with the 'dragAndDrop' mode in ${theme}`, async (t) => {
    // arrange
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);
    const columnChooser = dataGrid.getColumnChooser();
    const columnChooserButton = dataGrid.getColumnChooserButton();

    // assert
    await t
      .expect(dataGrid.isReady())
      .ok();

    // act
    await t.click(columnChooserButton);

    // assert
    await t
      .expect(columnChooser.isOpened)
      .ok();

    // act, assert
    await a11yCheck(t, null, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(10, 7),
      keyExpr: 'field_0',
      columnChooser: {
        enabled: true,
        mode: 'dragAndDrop',
      },
      columns: [
        {
          dataField: 'field_0',
          visible: false,
        },
        {
          dataField: 'field_1',
          visible: false,
        },
        'field_2',
        'field_3',
        'field_4',
        'field_5',
        'field_6',
      ],
    }, DATA_GRID_SELECTOR, {
      disableFxAnimation: true,
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Column chooser with the 'select' mode in ${theme}`, async (t) => {
    // arrange
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);
    const columnChooser = dataGrid.getColumnChooser();
    const columnChooserButton = dataGrid.getColumnChooserButton();

    // assert
    await t
      .expect(dataGrid.isReady())
      .ok();

    // act
    await t.click(columnChooserButton);

    // assert
    await t
      .expect(columnChooser.isOpened)
      .ok();

    // act, assert
    await a11yCheck(t, null, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(10, 7),
      keyExpr: 'field_0',
      columnChooser: {
        enabled: true,
        mode: 'select',
      },
      columns: [
        {
          dataField: 'field_0',
          visible: false,
        },
        {
          dataField: 'field_1',
          visible: false,
        },
        'field_2',
        'field_3',
        'field_4',
        'field_5',
        'field_6',
      ],
    }, DATA_GRID_SELECTOR, {
      disableFxAnimation: true,
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });

  test(`Empty column chooser in ${theme}`, async (t) => {
    // arrange
    const dataGrid = new DataGrid(DATA_GRID_SELECTOR);
    const columnChooser = dataGrid.getColumnChooser();
    const columnChooserButton = dataGrid.getColumnChooserButton();

    // assert
    await t
      .expect(dataGrid.isReady())
      .ok();

    // act
    await t.click(columnChooserButton);

    // assert
    await t
      .expect(columnChooser.isOpened)
      .ok();

    // act, assert
    await a11yCheck(t, null, {
      runOnly: 'color-contrast',
    });
  }).before(async () => {
    await changeTheme(theme);

    return createWidget('dxDataGrid', {
      dataSource: getData(10, 5),
      keyExpr: 'field_0',
      columnChooser: {
        enabled: true,
      },
      columns: [
        'field_0',
        'field_1',
        'field_2',
        'field_3',
        'field_4',
      ],
    }, DATA_GRID_SELECTOR, {
      disableFxAnimation: true,
    });
  }).after(async () => {
    await changeTheme('generic.light');
  });
});
