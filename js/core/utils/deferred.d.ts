// eslint-disable-next-line @typescript-eslint/prefer-function-type
type Callback<T> = (value?: T, ...args: T[]) => void;
declare class DeferredObj<T> {
    constructor();
    state(): string;
    always(alwaysCallback?: Callback<T>): DeferredObj<T>;
    catch(catchCallback?: Callback<T>): DeferredObj<T>;
    then(resolveCallback?: Callback<T>, rejectCallback?: Callback<T>): DeferredObj<T>;
    done(doneCallback?: Callback<T>): DeferredObj<T>;
    fail(failCallback?: Callback<T>): DeferredObj<T>;
    progress(progressCallback?: Callback<T>): DeferredObj<T>;
    notify(value?: T, ...args: T[]): DeferredObj<T>;
    notifyWith(context: DeferredObj<T>, args?: T[]): DeferredObj<T>;
    reject(value?: T, ...args: T[]): DeferredObj<T>;
    rejectWith(context: DeferredObj<T>, args?: T[]): DeferredObj<T>;
    resolve(value?: T, ...args: T[]): DeferredObj<T>;
    resolveWith(context: DeferredObj<T>, args?: T[]): DeferredObj<T>;
    promise(target?: T): Promise<T>;
}

export function Deferred<T>(): DeferredObj<T>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
export interface PromiseType<T> { }
/**
 * @docid
 * @type Promise<void>
 * @namespace DevExpress.core.utils
 */
export type DxPromise<T = void> = {} extends PromiseType<T> ? Promise<T> : PromiseType<T>;
