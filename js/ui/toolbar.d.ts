import {
    UserDefinedElement,
    DxElement,
} from '../core/element';

import {
    template,
} from '../core/templates/template';

import DataSource, {
    Options as DataSourceOptions,
} from '../data/data_source';

import Store from '../data/abstract_store';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    ItemInfo,
} from '../events/index';

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions,
} from './collection/ui.collection_widget.base';

/** @public */
export type ContentReadyEvent = EventInfo<dxToolbar>;

/** @public */
export type DisposingEvent = EventInfo<dxToolbar>;

/** @public */
export type InitializedEvent = InitializedEventInfo<dxToolbar>;

/** @public */
export type ItemClickEvent = NativeEventInfo<dxToolbar, MouseEvent | PointerEvent> & ItemInfo;

/** @public */
export type ItemContextMenuEvent = NativeEventInfo<dxToolbar, MouseEvent | PointerEvent | TouchEvent> & ItemInfo;

/** @public */
export type ItemHoldEvent = NativeEventInfo<dxToolbar, MouseEvent | PointerEvent | TouchEvent> & ItemInfo;

/** @public */
export type ItemRenderedEvent = EventInfo<dxToolbar> & ItemInfo;

/** @public */
export type OptionChangedEvent = EventInfo<dxToolbar> & ChangedOptionInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 */
export interface dxToolbarOptions extends CollectionWidgetOptions<dxToolbar> {
    /**
     * @docid
     * @type string | Array<string | dxToolbarItem | any> | Store | DataSource | DataSourceOptions
     * @default null
     * @public
     */
    dataSource?: string | Array<string | Item | any> | Store | DataSource | DataSourceOptions;
    /**
     * @docid
     * @type Array<string | dxToolbarItem | any>
     * @fires dxToolbarOptions.onOptionChanged
     * @public
     */
    items?: Array<string | Item | any>;
    /**
     * @docid
     * @default "menuItem"
     * @type_function_param1 itemData:object
     * @type_function_return string|Element|jQuery
     * @public
     */
    menuItemTemplate?: template | ((itemData: any, itemIndex: number, itemElement: DxElement) => string | UserDefinedElement);
    /**
     * @docid
     * @deprecated
     * @default undefined
     * @public
     */
    height?: number | string | (() => number | string);
}
/**
 * @docid
 * @inherits CollectionWidget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxToolbar extends CollectionWidget {
    constructor(element: UserDefinedElement, options?: dxToolbarOptions)
}

/**
 * @public
 * @namespace DevExpress.ui.dxToolbar
 * */
export type Item = dxToolbarItem;

/**
 * @deprecated Use Item instead
 * @namespace DevExpress.ui
 */
export interface dxToolbarItem extends CollectionWidgetItem {
    /**
     * @docid
     * @default undefined
     * @public
     */
    cssClass?: string;
    /**
     * @docid
     * @type Enums.ToolbarItemLocateInMenuMode
     * @default 'never'
     * @public
     */
    locateInMenu?: 'always' | 'auto' | 'never';
    /**
     * @docid
     * @type Enums.ToolbarItemLocation
     * @default 'center'
     * @public
     */
    location?: 'after' | 'before' | 'center';
    /**
     * @docid
     * @type_function_return string|Element|jQuery
     * @public
     */
    menuItemTemplate?: template | (() => string | UserDefinedElement);
    /**
     * @docid
     * @public
     */
    options?: any;
    /**
     * @docid
     * @type Enums.ToolbarItemShowTextMode
     * @default 'always'
     * @public
     */
    showText?: 'always' | 'inMenu';
    /**
     * @docid
     * @type Enums.ToolbarItemWidget
     * @public
     */
    widget?: 'dxAutocomplete' | 'dxButton' | 'dxCheckBox' | 'dxDateBox' | 'dxMenu' | 'dxSelectBox' | 'dxTabs' | 'dxTextBox' | 'dxButtonGroup' | 'dxDropDownButton';
}

/** @public */
export type Properties = dxToolbarOptions;

/** @deprecated use Properties instead */
export type Options = dxToolbarOptions;

/** @deprecated use Properties instead */
export type IOptions = dxToolbarOptions;
