export type DOMMessage = {
    type: 'GET_CONSTRAINT_SYSTEM';
}
export type DOMMessageResponse = {
    constraintSystem?: ConstraintSystem;
    type: DOMMessage;
}

export type ConstraintSystem = {
    variables?: {
        name: string;
        value: string | number | boolean;
    }[]
    // Add more properties here, if needed in the extension
}

