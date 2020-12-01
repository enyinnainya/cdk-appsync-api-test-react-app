export declare function generateUniqueID(): string;
export declare function getAWSDateTime(): string;
export declare const response: {
    sendSuccessResponse: (data: any) => {
        success: boolean;
        data: any;
    };
    sendFailedResponse: (data: any) => {
        success: boolean;
        errors: any;
    };
};
/**
 * Reindex an array by key field
 * @param array
 * @param idField
 */
export declare function reindex(array: any, idField: string): any;
/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export declare function validateEmail(email: any): boolean;
/*** Helper function to Capitalize String texts ***/
export declare function capitalizeWords(str: string): string;
/**
 * Helper function for empty check
 * @param string|object|number
 * @returns {boolean}
 */
export declare function empty(value: any): boolean;
/**
 * Function to check if an object is empty and return corresponding boolean value
 * @param obj
 * @return {boolean}
 */
export declare function objEmpty(obj: object): boolean;
