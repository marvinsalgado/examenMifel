import { RuleItem } from 'async-validator';
import { FieldNode } from './utils';
export declare type ValidateMode = 'change' | 'focusout' | 'submit';
export declare type FormOptions<Values extends object> = {
    defaultValues?: Values;
    shouldUnregister?: boolean;
    validateMode?: ValidateMode;
};
export declare type FieldOptions = {
    rule?: RuleItem;
};
export declare type Error = {
    message: string;
    field: string;
};
export declare type Errors = {
    [field: string]: Error[] | undefined;
};
export declare const useForm: <T extends object>(options?: FormOptions<T>) => {
    values: import("vue-demi").UnwrapRef<T>;
    useField: (path: string | (string | number)[], options?: FieldOptions) => {
        ref: (nodeRef: FieldNode) => void;
        value: any;
        error: Error[] | undefined;
        validate: () => Promise<any>;
    };
    get: (path: string, defaultValue?: any) => any;
    set: (path: string, value: any) => any;
    getFieldValues: () => Partial<T>;
    validateFields: () => Promise<any>;
    validateField: (path: any) => Promise<any>;
    errors: Errors;
    handleSubmit: (onSubmit: (fieldValues: Partial<T>) => any) => (e?: Event | undefined) => Promise<void>;
};
