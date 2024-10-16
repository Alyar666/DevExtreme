import {
    DxPromise,
} from '../../core/utils/deferred';

import Store, {
    StoreOptions,
} from '../abstract_store';

import {
    LoadOptions,
} from '../index';

interface PromiseExtension<T> {
    then<TResult1 = T, TResult2 = never>(
        onFulfilled?: ((value: T, extraParameters?: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): Promise<TResult1 | TResult2>;
}

/** @namespace DevExpress.data */
export interface ODataStoreOptions extends StoreOptions<ODataStore> {
    /**
     * @docid
     * @type_function_param1_field5 params:object
     * @type_function_param1_field6 payload:object
     * @type_function_param1_field7 headers:object
     * @public
     */
    beforeSend?: ((options: { url?: string; async?: boolean; method?: string; timeout?: number; params?: any; payload?: any; headers?: any }) => void);
    /**
     * @docid
     * @public
     */
    deserializeDates?: boolean;
    /**
     * @docid
     * @type_function_param1 e:Error
     * @type_function_param1_field2 errorDetails:object
     * @type_function_param1_field3 requestOptions:object
     * @public
     */
    errorHandler?: ((e: { httpStatus?: number; errorDetails?: any; requestOptions?: any }) => void);
    /**
     * @docid
     * @default {}
     * @public
     */
    fieldTypes?: any;
    /**
     * @docid
     * @public
     */
    filterToLower?: boolean;
    /**
     * @docid
     * @default false
     * @public
     */
    jsonp?: boolean;
    /**
     * @docid
     * @type string|object
     * @acceptValues "String"|"Int32"|"Int64"|"Guid"|"Boolean"|"Single"|"Decimal"
     * @public
     */
    keyType?: 'String' | 'Int32' | 'Int64' | 'Guid' | 'Boolean' | 'Single' | 'Decimal' | any;
    /**
     * @docid
     * @action
     * @public
     */
    onLoading?: ((loadOptions: LoadOptions) => void);
    /**
     * @docid
     * @public
     */
    url?: string;
    /**
     * @docid
     * @default 2
     * @acceptValues 2|3|4
     * @public
     */
    version?: number;
    /**
     * @docid
     * @default false
     * @public
     */
    withCredentials?: boolean;
}
/**
 * @docid
 * @inherits Store
 * @public
 */
export default class ODataStore extends Store {
    constructor(options?: ODataStoreOptions)
    byKey(key: any | string | number): DxPromise<any>;
    /**
     * @docid
     * @publicName byKey(key, extraOptions)
     * @param1 key:object|string|number
     * @return Promise<any>
     * @public
     */
    byKey(key: any | string | number, extraOptions: { expand?: string | Array<string>; select?: string | Array<string> }): DxPromise<any>;
    /**
     * @docid
     * @publicName createQuery(loadOptions)
     * @param1 loadOptions:object
     * @return object
     * @public
     */
    createQuery(loadOptions: any): any;

    /**
     * @docid
     * @publicName insert(values)
     * @param1 values:object
     * @return Promise<any>
     * @public
     */
    insert(values: any): DxPromise<any> & PromiseExtension<any>;
}
