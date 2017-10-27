export interface SharedGuardOptions {
    defaultReturn: any;
    longStackTraces: boolean;
}
export interface SyncGuardOptions extends SharedGuardOptions {
    catchAsync: boolean;
}
export interface AsyncGuardOptions extends SharedGuardOptions {
}
export declare type GuardedFunction<R> = (...args) => R;
export declare type GuardedFunctionMaker = <R>(fn: (...args) => R) => GuardedFunction<R>;
export declare type GuardedAsyncFunction<R> = (...args) => R | PromiseLike<R>;
export declare type GuardedAsyncFunctionMaker = <R>(fn: (...args) => R | PromiseLike<R>) => GuardedAsyncFunction<R>;
export declare function syncGuard(handler: (err: Error) => void, opts?: Partial<SyncGuardOptions>): GuardedFunctionMaker;
export declare function asyncGuard(handler: (err: Error) => void, opts?: Partial<AsyncGuardOptions>): GuardedAsyncFunctionMaker;
