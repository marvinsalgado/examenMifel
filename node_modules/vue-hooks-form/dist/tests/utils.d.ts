export declare type RenderHookResult<T> = {
    result?: T;
};
export declare const renderHook: <Result>(callback?: () => void | Result) => RenderHookResult<Result>;
export declare const waitForNextUpdate: (timeout?: number | undefined) => Promise<unknown>;
