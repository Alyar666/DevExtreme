import { exportDataGrid } from 'exporter/jspdf/export_data_grid_2';

const JSPdfStylesTests = {
    runTests(moduleConfig, createMockPdfDoc, createDataGrid) {

        const customizeCell = ({ pdfCell }) => {
            pdfCell.drawLeftBorder = false;
            pdfCell.drawRightBorder = false;
            pdfCell.drawTopBorder = false;
            pdfCell.drawBottomBorder = false;
            pdfCell.jsPdfTextOptions = { baseline: 'alphabetic' };
        };

        QUnit.module('Styles - Background color', moduleConfig, () => {
            const rowOptions = {
                headerStyles: { backgroundColor: '#808080' },
                groupStyles: { backgroundColor: '#d3d3d3' },
                totalStyles: { backgroundColor: '#ffffe0' },
                rowHeight: 16
            };

            QUnit.test('Simple - [{f1, f2]', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,90,16,F',
                    'text,F1,10,23,',
                    'setFillColor,#808080', 'rect,100,15,80,16,F',
                    'text,F2,100,23,',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [f1, f2] - custom color in Header', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'header' && gridCell.column.dataField === 'f1') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#ffff00', 'rect,10,15,90,16,F',
                    'text,F1,10,23,',
                    'setFillColor,#808080', 'rect,100,15,80,16,F',
                    'text,F2,100,23,',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [f1, f2] - custom color in data row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data' && gridCell.column.dataField === 'f1') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,90,16,F',
                    'text,F1,10,23,',
                    'setFillColor,#808080', 'rect,100,15,80,16,F',
                    'text,F2,100,23,',
                    'setFillColor,#ffff00', 'rect,10,31,90,16,F',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3]', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2', f3: 'f1_3' },
                        { f1: 'f2_1', f2: 'f2_2', f3: 'f2_3' },
                    ],
                });

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,90,16,F',
                    'text,F2,10,23,',
                    'setFillColor,#808080', 'rect,100,15,80,16,F',
                    'text,F3,100,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,170,16,F',
                    'text,F1: f1_1,10,39,',
                    'text,f1_2,20,55,',
                    'text,f1_3,100,55,',
                    'setFillColor,#d3d3d3', 'rect,10,63,170,16,F',
                    'text,F1: f2_1,10,71,',
                    'text,f2_2,20,87,',
                    'text,f2_3,100,87,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3] - custom color in grouped row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2', f3: 'f1_3' },
                        { f1: 'f2_1', f2: 'f2_2', f3: 'f2_3' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group' && gridCell.value === 'f1_1') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,90,16,F',
                    'text,F2,10,23,',
                    'setFillColor,#808080', 'rect,100,15,80,16,F',
                    'text,F3,100,23,',
                    'setFillColor,#ffff00', 'rect,10,31,170,16,F',
                    'text,F1: f1_1,10,39,',
                    'text,f1_2,20,55,',
                    'text,f1_3,100,55,',
                    'setFillColor,#d3d3d3', 'rect,10,63,170,16,F',
                    'text,F1: f2_1,10,71,',
                    'text,f2_2,20,87,',
                    'text,f2_3,100,87,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3] - custom color in data row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2', f3: 'f1_3' },
                        { f1: 'f2_1', f2: 'f2_2', f3: 'f2_3' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data' && gridCell.column.dataField === 'f2') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,90,16,F',
                    'text,F2,10,23,',
                    'setFillColor,#808080', 'rect,100,15,80,16,F',
                    'text,F3,100,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,170,16,F',
                    'text,F1: f1_1,10,39,',
                    'setFillColor,#ffff00', 'rect,20,47,80,16,F',
                    'text,f1_2,20,55,',
                    'text,f1_3,100,55,',
                    'setFillColor,#d3d3d3', 'rect,10,63,170,16,F',
                    'text,F1: f2_1,10,71,',
                    'setFillColor,#ffff00', 'rect,20,79,80,16,F',
                    'text,f2_2,20,87,',
                    'text,f2_3,100,87,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4]', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3', f4: 'f1_4' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3', f4: 'f2_4' },
                    ],
                });

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,90,16,F',
                    'text,F3,10,23,',
                    'setFillColor,#808080', 'rect,100,15,80,16,F',
                    'text,F4,100,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,170,16,F',
                    'text,F1: f1,10,39,',
                    'setFillColor,#d3d3d3', 'rect,20,47,160,16,F',
                    'text,F2: f1_2,20,55,',
                    'text,f1_3,30,71,',
                    'text,f1_4,100,71,',
                    'setFillColor,#d3d3d3', 'rect,20,79,160,16,F',
                    'text,F2: f2_2,20,87,',
                    'text,f2_3,30,103,',
                    'text,f2_4,100,103,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - custom color in grouped row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3', f4: 'f1_4' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3', f4: 'f2_4' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,90,16,F',
                    'text,F3,10,23,',
                    'setFillColor,#808080', 'rect,100,15,80,16,F',
                    'text,F4,100,23,',
                    'setFillColor,#ffff00', 'rect,10,31,170,16,F',
                    'text,F1: f1,10,39,',
                    'setFillColor,#ffff00', 'rect,20,47,160,16,F',
                    'text,F2: f1_2,20,55,',
                    'text,f1_3,30,71,',
                    'text,f1_4,100,71,',
                    'setFillColor,#ffff00', 'rect,20,79,160,16,F',
                    'text,F2: f2_2,20,87,',
                    'text,f2_3,30,103,',
                    'text,f2_4,100,103,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn}]', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,80,16,F',
                    'text,F2,10,23,',
                    'setFillColor,#808080', 'rect,90,15,90,16,F',
                    'text,F3,90,23,',
                    'setFillColor,#808080', 'rect,180,15,80,16,F',
                    'text,F4,180,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,170,16,F',
                    'text,F1: f1,10,39,',
                    'setFillColor,#d3d3d3', 'rect,180,31,80,16,F',
                    'text,Max: f4,180,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn}] - custom color in grouped row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group' && gridCell.column.dataField === 'f4') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,80,16,F',
                    'text,F2,10,23,',
                    'setFillColor,#808080', 'rect,90,15,90,16,F',
                    'text,F3,90,23,',
                    'setFillColor,#808080', 'rect,180,15,80,16,F',
                    'text,F4,180,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,170,16,F',
                    'text,F1: f1,10,39,',
                    'setFillColor,#ffff00', 'rect,180,31,80,16,F',
                    'text,Max: f4,180,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn, showInGroupFooter}]', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,80,16,F',
                    'text,F2,10,23,',
                    'setFillColor,#808080', 'rect,90,15,90,16,F',
                    'text,F3,90,23,',
                    'setFillColor,#808080', 'rect,180,15,80,16,F',
                    'text,F4,180,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,250,16,F',
                    'text,F1: f1,10,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,',
                    'setFillColor,#ffffe0', 'rect,20,63,70,16,F',
                    'setFillColor,#ffffe0', 'rect,90,63,90,16,F',
                    'setFillColor,#ffffe0', 'rect,180,63,80,16,F',
                    'text,Max: f4,180,71,' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn, showInGroupFooter}] - custom color in group footer row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'groupFooter' && gridCell.column.dataField === 'f4') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,80,16,F',
                    'text,F2,10,23,',
                    'setFillColor,#808080', 'rect,90,15,90,16,F',
                    'text,F3,90,23,',
                    'setFillColor,#808080', 'rect,180,15,80,16,F',
                    'text,F4,180,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,250,16,F',
                    'text,F1: f1,10,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,',
                    'setFillColor,#ffffe0', 'rect,20,63,70,16,F',
                    'setFillColor,#ffffe0', 'rect,90,63,90,16,F',
                    'setFillColor,#ffff00', 'rect,180,63,80,16,F',
                    'text,Max: f4,180,71,' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn}]', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,250,16,F',
                    'text,F3,10,23,',
                    'setFillColor,#808080', 'rect,260,15,100,16,F',
                    'text,F4,260,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,250,16,F',
                    'text,F1: f1 (Max: f1),10,39,',
                    'setFillColor,#d3d3d3', 'rect,260,31,100,16,F',
                    'text,Max: f4,260,39,',
                    'setFillColor,#d3d3d3', 'rect,20,47,240,16,F',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'setFillColor,#d3d3d3', 'rect,260,47,100,16,F',
                    'text,Max: f4,260,55,',
                    'text,f3,30,71,',
                    'text,f4,260,71,' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn}] - custom color in grouped row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group' && gridCell.column.dataField === 'f4') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,250,16,F',
                    'text,F3,10,23,',
                    'setFillColor,#808080', 'rect,260,15,100,16,F',
                    'text,F4,260,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,250,16,F',
                    'text,F1: f1 (Max: f1),10,39,',
                    'setFillColor,#ffff00', 'rect,260,31,100,16,F',
                    'text,Max: f4,260,39,',
                    'setFillColor,#d3d3d3', 'rect,20,47,240,16,F',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'setFillColor,#ffff00', 'rect,260,47,100,16,F',
                    'text,Max: f4,260,55,',
                    'text,f3,30,71,',
                    'text,f4,260,71,' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn, showInGroupFooter}]', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,250,16,F',
                    'text,F3,10,23,',
                    'setFillColor,#808080', 'rect,260,15,100,16,F',
                    'text,F4,260,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,350,16,F',
                    'text,F1: f1 (Max: f1),10,39,',
                    'setFillColor,#d3d3d3', 'rect,20,47,340,16,F',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'text,f3,30,71,',
                    'text,f4,260,71,',
                    'setFillColor,#ffffe0', 'rect,30,79,230,16,F',
                    'setFillColor,#ffffe0', 'rect,260,79,100,16,F',
                    'text,Max: f4,260,87,',
                    'setFillColor,#ffffe0', 'rect,20,95,240,16,F',
                    'setFillColor,#ffffe0', 'rect,260,95,100,16,F',
                    'text,Max: f4,260,103,' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn, showInGroupFooter}] - custom color in group footer row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'groupFooter' && gridCell.column.dataField === 'f4') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,250,16,F',
                    'text,F3,10,23,',
                    'setFillColor,#808080', 'rect,260,15,100,16,F',
                    'text,F4,260,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,350,16,F',
                    'text,F1: f1 (Max: f1),10,39,',
                    'setFillColor,#d3d3d3', 'rect,20,47,340,16,F',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'text,f3,30,71,',
                    'text,f4,260,71,',
                    'setFillColor,#ffffe0', 'rect,30,79,230,16,F',
                    'setFillColor,#ffff00', 'rect,260,79,100,16,F',
                    'text,Max: f4,260,87,',
                    'setFillColor,#ffffe0', 'rect,20,95,240,16,F',
                    'setFillColor,#ffff00', 'rect,260,95,100,16,F',
                    'text,Max: f4,260,103,' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [f1, f2], totalItems: [f1]', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f1', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2' }]
                });

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,80,16,F',
                    'text,F1,10,23,',
                    'setFillColor,#808080', 'rect,90,15,90,16,F',
                    'text,F2,90,23,',
                    'text,f1,10,39,',
                    'text,f2,90,39,',
                    'setFillColor,#ffffe0', 'rect,10,47,80,16,F',
                    'text,Max: f1,10,55,',
                    'setFillColor,#ffffe0', 'rect,90,47,90,16,F' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [f1, f2], totalItems: [f1] - custom color in summary row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f1', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'totalFooter' && gridCell.column.dataField === 'f1') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,80,16,F',
                    'text,F1,10,23,',
                    'setFillColor,#808080', 'rect,90,15,90,16,F',
                    'text,F2,90,23,',
                    'text,f1,10,39,',
                    'text,f2,90,39,',
                    'setFillColor,#ffff00', 'rect,10,47,80,16,F',
                    'text,Max: f1,10,55,',
                    'setFillColor,#ffffe0', 'rect,90,47,90,16,F' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [{f1, groupIndex: 0}, f2, f3], totalItems: [f2]', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f2', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3' }]
                });

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,80,16,F',
                    'text,F2,10,23,',
                    'setFillColor,#808080', 'rect,90,15,90,16,F',
                    'text,F3,90,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,170,16,F',
                    'text,F1: f1,10,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'setFillColor,#ffffe0', 'rect,10,63,80,16,F',
                    'text,Max: f2,10,71,',
                    'setFillColor,#ffffe0', 'rect,90,63,90,16,F' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [{f1, groupIndex: 0}, f2, f3], totalItems: [f2] - custom color in summary row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f2', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'totalFooter' && gridCell.column.dataField === 'f2') {
                        pdfCell.backgroundColor = '#ffff00';
                    }
                };

                const expectedLog = [
                    'setFillColor,#808080', 'rect,10,15,80,16,F',
                    'text,F2,10,23,',
                    'setFillColor,#808080', 'rect,90,15,90,16,F',
                    'text,F3,90,23,',
                    'setFillColor,#d3d3d3', 'rect,10,31,170,16,F',
                    'text,F1: f1,10,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'setFillColor,#ffff00', 'rect,10,63,80,16,F',
                    'text,Max: f2,10,71,',
                    'setFillColor,#ffffe0', 'rect,90,63,90,16,F' ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });
        });

        QUnit.module('Styles - Text color', moduleConfig, () => {
            const rowOptions = {
                rowHeight: 16
            };

            QUnit.test('Simple - [{f1, f2] - Custom color for first table cell', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ pdfCell }) => {
                    customizeCell({ pdfCell });
                    if(pdfCell.text === 'F1') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'setTextColor,#0000ff',
                    'text,F1,10,23,',
                    'setTextColor,#000000',
                    'text,F2,100,23,',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom color for last table cell', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ pdfCell }) => {
                    customizeCell({ pdfCell });
                    if(pdfCell.text === 'f1_2') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F1,10,23,',
                    'text,F2,100,23,',
                    'text,f1_1,10,39,',
                    'setTextColor,#0000ff',
                    'text,f1_2,100,39,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom color for first and last table cells', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ pdfCell }) => {
                    customizeCell({ pdfCell });
                    if(pdfCell.text === 'F1' || pdfCell.text === 'f1_2') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'setTextColor,#0000ff',
                    'text,F1,10,23,',
                    'setTextColor,#000000',
                    'text,F2,100,23,',
                    'text,f1_1,10,39,',
                    'setTextColor,#0000ff',
                    'text,f1_2,100,39,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom color for header row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'header') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'setTextColor,#0000ff',
                    'text,F1,10,23,',
                    'text,F2,100,23,',
                    'setTextColor,#000000',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Different colors in header cells', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'header') {
                        if(gridCell.column.dataField === 'f1') {
                            pdfCell.textColor = '#ff0000';
                        } else if(gridCell.column.dataField === 'f2') {
                            pdfCell.textColor = '#0000ff';
                        }

                    }
                };

                const expectedLog = [
                    'setTextColor,#ff0000',
                    'text,F1,10,23,',
                    'setTextColor,#0000ff',
                    'text,F2,100,23,',
                    'setTextColor,#000000',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom color for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F1,10,23,',
                    'text,F2,100,23,',
                    'setTextColor,#0000ff',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3] - Custom color for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2', f3: 'f1_3' },
                        { f1: 'f2_1', f2: 'f2_2', f3: 'f2_3' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,100,23,',
                    'text,F1: f1_1,10,39,',
                    'setTextColor,#0000ff',
                    'text,f1_2,20,55,',
                    'text,f1_3,100,55,',
                    'setTextColor,#000000',
                    'text,F1: f2_1,10,71,',
                    'setTextColor,#0000ff',
                    'text,f2_2,20,87,',
                    'text,f2_3,100,87,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3] - custom color in grouped rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2', f3: 'f1_3' },
                        { f1: 'f2_1', f2: 'f2_2', f3: 'f2_3' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,100,23,',
                    'setTextColor,#0000ff',
                    'text,F1: f1_1,10,39,',
                    'setTextColor,#000000',
                    'text,f1_2,20,55,',
                    'text,f1_3,100,55,',
                    'setTextColor,#0000ff',
                    'text,F1: f2_1,10,71,',
                    'setTextColor,#000000',
                    'text,f2_2,20,87,',
                    'text,f2_3,100,87,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - Custom color for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3', f4: 'f1_4' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3', f4: 'f2_4' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,100,23,',
                    'text,F1: f1,10,39,',
                    'text,F2: f1_2,20,55,',
                    'setTextColor,#0000ff',
                    'text,f1_3,30,71,',
                    'text,f1_4,100,71,',
                    'setTextColor,#000000',
                    'text,F2: f2_2,20,87,',
                    'setTextColor,#0000ff',
                    'text,f2_3,30,103,',
                    'text,f2_4,100,103,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - custom color in grouped rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3', f4: 'f1_4' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3', f4: 'f2_4' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,100,23,',
                    'setTextColor,#0000ff',
                    'text,F1: f1,10,39,',
                    'text,F2: f1_2,20,55,',
                    'setTextColor,#000000',
                    'text,f1_3,30,71,',
                    'text,f1_4,100,71,',
                    'setTextColor,#0000ff',
                    'text,F2: f2_2,20,87,',
                    'setTextColor,#000000',
                    'text,f2_3,30,103,',
                    'text,f2_4,100,103,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn}] - Custom color for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F4,180,23,',
                    'text,F1: f1,10,39,',
                    'text,Max: f4,180,39,',
                    'setTextColor,#0000ff',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn}] - custom color in grouped rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F4,180,23,',
                    'setTextColor,#0000ff',
                    'text,F1: f1,10,39,',
                    'text,Max: f4,180,39,',
                    'setTextColor,#000000',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn, showInGroupFooter}] - Custom color for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F4,180,23,',
                    'text,F1: f1,10,39,',
                    'setTextColor,#0000ff',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,',
                    'setTextColor,#000000',
                    'text,Max: f4,180,71,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn, showInGroupFooter}] - custom color in group footer row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'groupFooter') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F4,180,23,',
                    'text,F1: f1,10,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,',
                    'setTextColor,#0000ff',
                    'text,Max: f4,180,71,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn}] - Custom color for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,260,23,',
                    'text,F1: f1 (Max: f1),10,39,',
                    'text,Max: f4,260,39,',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'text,Max: f4,260,55,',
                    'setTextColor,#0000ff',
                    'text,f3,30,71,',
                    'text,f4,260,71,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn}] - custom color in grouped rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,260,23,',
                    'setTextColor,#0000ff',
                    'text,F1: f1 (Max: f1),10,39,',
                    'text,Max: f4,260,39,',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'text,Max: f4,260,55,',
                    'setTextColor,#000000',
                    'text,f3,30,71,',
                    'text,f4,260,71,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn, showInGroupFooter}] - Custom color for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,260,23,',
                    'text,F1: f1 (Max: f1),10,39,',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'setTextColor,#0000ff',
                    'text,f3,30,71,',
                    'text,f4,260,71,',
                    'setTextColor,#000000',
                    'text,Max: f4,260,87,',
                    'text,Max: f4,260,103,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn, showInGroupFooter}] - custom color in group footer rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'groupFooter') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,260,23,',
                    'text,F1: f1 (Max: f1),10,39,',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'text,f3,30,71,',
                    'text,f4,260,71,',
                    'setTextColor,#0000ff',
                    'text,Max: f4,260,87,',
                    'text,Max: f4,260,103,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [f1, f2], totalItems: [f1] - Custom color for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f1', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F1,10,23,',
                    'text,F2,90,23,',
                    'setTextColor,#0000ff',
                    'text,f1,10,39,',
                    'text,f2,90,39,',
                    'setTextColor,#000000',
                    'text,Max: f1,10,55,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [f1, f2], totalItems: [f1] - custom color in summary rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f1', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'totalFooter') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F1,10,23,',
                    'text,F2,90,23,',
                    'text,f1,10,39,',
                    'text,f2,90,39,',
                    'setTextColor,#0000ff',
                    'text,Max: f1,10,55,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [{f1, groupIndex: 0}, f2, f3], totalItems: [f2] - Custom color for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f2', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.textColor = '#0000ff';
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F1: f1,10,39,',
                    'setTextColor,#0000ff',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'setTextColor,#000000',
                    'text,Max: f2,10,71,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [{f1, groupIndex: 0}, f2, f3], totalItems: [f2] - custom color in summary row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f2', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'totalFooter') {
                        pdfCell.textColor = '#0000ff';
                    }
                };
                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F1: f1,10,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'setTextColor,#0000ff',
                    'text,Max: f2,10,71,',
                    'setTextColor,#000000'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });
        });

        QUnit.module('Styles - Font', moduleConfig, () => {
            const rowOptions = {
                rowHeight: 16
            };

            QUnit.test('Simple - [{f1, f2] - Custom font name for header', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'header') {
                        pdfCell.font = { name: 'courier' };
                    }
                };

                const expectedLog = [
                    'setFont,courier,normal,',
                    'text,F1,10,23,',
                    'text,F2,100,23,',
                    'setFont,helvetica,normal,',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom font style for header', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'header') {
                        pdfCell.font = { style: 'bold' };
                    }
                };

                const expectedLog = [
                    'setFont,helvetica,bold,',
                    'text,F1,10,23,',
                    'text,F2,100,23,',
                    'setFont,helvetica,normal,',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom font style/weight for header', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'header') {
                        if(gridCell.column.dataField === 'f1') {
                            pdfCell.font = { weight: 700 };
                        } else {
                            pdfCell.font = { style: 'bold' };
                        }
                    }
                };

                const expectedLog = [
                    'setFont,helvetica,normal,700',
                    'text,F1,10,23,',
                    'text,F2,100,23,',
                    'setFont,helvetica,normal,',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom font weight for header', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'header') {
                        pdfCell.font = { weight: 700 };
                    }
                };

                const expectedLog = [
                    'setFont,helvetica,normal,700',
                    'text,F1,10,23,',
                    'setFont,helvetica,normal,700',
                    'text,F2,100,23,',
                    'setFont,helvetica,normal,',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom font size for header', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'header') {
                        pdfCell.font = { size: 20 };
                    }
                };

                const expectedLog = [
                    'setFontSize,20',
                    'text,F1,10,23,',
                    'text,F2,100,23,',
                    'setFontSize,16',
                    'text,f1_1,10,39,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom font name for first column', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.column.dataField === 'f1') {
                        pdfCell.font = { name: 'courier' };
                    }
                };

                const expectedLog = [
                    'setFont,courier,normal,',
                    'text,F1,10,23,',
                    'setFont,helvetica,normal,',
                    'text,F2,100,23,',
                    'setFont,courier,normal,',
                    'text,f1_1,10,39,',
                    'setFont,helvetica,normal,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom font style for first column', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.column.dataField === 'f1') {
                        pdfCell.font = { style: 'bold' };
                    }
                };

                const expectedLog = [
                    'setFont,helvetica,bold,',
                    'text,F1,10,23,',
                    'setFont,helvetica,normal,',
                    'text,F2,100,23,',
                    'setFont,helvetica,bold,',
                    'text,f1_1,10,39,',
                    'setFont,helvetica,normal,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom font weight for last column', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.column.dataField === 'f1') {
                        if(gridCell.column.dataField === 'f1') {
                            pdfCell.font = { weight: 700 };
                        }
                    }
                };

                const expectedLog = [
                    'setFont,helvetica,normal,700',
                    'text,F1,10,23,',
                    'setFont,helvetica,normal,',
                    'text,F2,100,23,',
                    'setFont,helvetica,normal,700',
                    'text,f1_1,10,39,',
                    'setFont,helvetica,normal,',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Simple - [{f1, f2] - Custom font size for last column', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.column.dataField === 'f1') {
                        pdfCell.font = { size: 20 };
                    }
                };

                const expectedLog = [
                    'setFontSize,20',
                    'text,F1,10,23,',
                    'setFontSize,16',
                    'text,F2,100,23,',
                    'setFontSize,20',
                    'text,f1_1,10,39,',
                    'setFontSize,16',
                    'text,f1_2,100,39,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3] - Custom font for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2', f3: 'f1_3' },
                        { f1: 'f2_1', f2: 'f2_2', f3: 'f2_3' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,100,23,',
                    'text,F1: f1_1,10,39,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f1_2,20,55,',
                    'text,f1_3,100,55,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,F1: f2_1,10,71,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f2_2,20,87,',
                    'text,f2_3,100,87,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3] - custom font in grouped rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [
                        { f1: 'f1_1', f2: 'f1_2', f3: 'f1_3' },
                        { f1: 'f2_1', f2: 'f2_2', f3: 'f2_3' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,100,23,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,F1: f1_1,10,39,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,f1_2,20,55,',
                    'text,f1_3,100,55,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,F1: f2_1,10,71,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,f2_2,20,87,',
                    'text,f2_3,100,87,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - Custom font for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3', f4: 'f1_4' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3', f4: 'f2_4' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,100,23,',
                    'text,F1: f1,10,39,',
                    'text,F2: f1_2,20,55,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f1_3,30,71,',
                    'text,f1_4,100,71,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,F2: f2_2,20,87,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f2_3,30,103,',
                    'text,f2_4,100,103,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Grouped rows - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - custom font in grouped rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3', f4: 'f1_4' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3', f4: 'f2_4' },
                    ],
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,100,23,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,F1: f1,10,39,',
                    'text,F2: f1_2,20,55,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,f1_3,30,71,',
                    'text,f1_4,100,71,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,F2: f2_2,20,87,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,f2_3,30,103,',
                    'text,f2_4,100,103,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn}] - Custom font for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F4,180,23,',
                    'text,F1: f1,10,39,',
                    'text,Max: f4,180,39,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn}] - custom font in grouped rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F4,180,23,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,F1: f1,10,39,',
                    'text,Max: f4,180,39,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn, showInGroupFooter}] - Custom font for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F4,180,23,',
                    'text,F1: f1,10,39,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,Max: f4,180,71,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn, showInGroupFooter}] - custom font in group footer row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [ { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true } ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'groupFooter') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F4,180,23,',
                    'text,F1: f1,10,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'text,f4,180,55,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,Max: f4,180,71,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90, 80 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn}] - Custom font for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,260,23,',
                    'text,F1: f1 (Max: f1),10,39,',
                    'text,Max: f4,260,39,',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'text,Max: f4,260,55,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f3,30,71,',
                    'text,f4,260,71,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn}] - custom font in grouped rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'group') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,260,23,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,F1: f1 (Max: f1),10,39,',
                    'text,Max: f4,260,39,',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'text,Max: f4,260,55,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,f3,30,71,',
                    'text,f4,260,71,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn, showInGroupFooter}] - Custom font for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,260,23,',
                    'text,F1: f1 (Max: f1),10,39,',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f3,30,71,',
                    'text,f4,260,71,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,Max: f4,260,87,',
                    'text,Max: f4,260,103,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn, showInGroupFooter}] - custom font in group footer rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' }
                    ],
                    summary: {
                        groupItems: [
                            { column: 'f1', summaryType: 'max' },
                            { column: 'f4', summaryType: 'max', alignByColumn: true, showInGroupFooter: true }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'groupFooter') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F3,10,23,',
                    'text,F4,260,23,',
                    'text,F1: f1 (Max: f1),10,39,',
                    'text,F2: f2 (Max of F1 is f1),20,55,',
                    'text,f3,30,71,',
                    'text,f4,260,71,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,Max: f4,260,87,',
                    'text,Max: f4,260,103,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 250, 100 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [f1, f2], totalItems: [f1] - Custom font for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f1', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F1,10,23,',
                    'text,F2,90,23,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f1,10,39,',
                    'text,f2,90,39,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,Max: f1,10,55,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [f1, f2], totalItems: [f1] - custom font in summary rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f1', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'totalFooter') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F1,10,23,',
                    'text,F2,90,23,',
                    'text,f1,10,39,',
                    'text,f2,90,39,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,Max: f1,10,55,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [{f1, groupIndex: 0}, f2, f3], totalItems: [f2] - Custom font for data rows', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f2', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'data') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };

                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F1: f1,10,39,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                    'text,Max: f2,10,71,'
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('Total summaries - [{f1, groupIndex: 0}, f2, f3], totalItems: [f2] - custom font in summary row', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' }
                    ],
                    summary: {
                        totalItems: [
                            { column: 'f2', summaryType: 'max' }
                        ]
                    },
                    dataSource: [{ f1: 'f1', f2: 'f2', f3: 'f3' }]
                });

                const _customizeCell = ({ gridCell, pdfCell }) => {
                    customizeCell({ gridCell, pdfCell });
                    if(gridCell.rowType === 'totalFooter') {
                        pdfCell.font = { name: 'courier', style: 'italic', size: 20 };
                    }
                };
                const expectedLog = [
                    'text,F2,10,23,',
                    'text,F3,90,23,',
                    'text,F1: f1,10,39,',
                    'text,f2,20,55,',
                    'text,f3,90,55,',
                    'setFont,courier,italic,',
                    'setFontSize,20',
                    'text,Max: f2,10,71,',
                    'setFont,helvetica,normal,',
                    'setFontSize,16',
                ];

                exportDataGrid(doc, dataGrid, { topLeft: { x: 10, y: 15 }, columnWidths: [ 80, 90 ], customizeCell: _customizeCell, rowOptions }).then(() => {
                    // doc.save();
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });
        });
    }
};

export { JSPdfStylesTests };
