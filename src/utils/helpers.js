"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objEmpty = exports.empty = exports.capitalizeWords = exports.validateEmail = exports.reindex = exports.response = exports.getAWSDateTime = exports.generateUniqueID = void 0;
function generateUniqueID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
exports.generateUniqueID = generateUniqueID;
function getAWSDateTime() {
    return new Date().toISOString();
}
exports.getAWSDateTime = getAWSDateTime;
exports.response = {
    sendSuccessResponse: (data) => ({ success: true, data: data }),
    sendFailedResponse: (data) => ({ success: false, errors: data })
};
/**
 * Reindex an array by key field
 * @param array
 * @param idField
 */
function reindex(array, idField) {
    var obj = {}, i, record;
    if (Object.prototype.toString.call(array) !== '[object Array]') {
        throw new Error('Cannot reindex a non-array!');
    }
    if (!idField) {
        throw new Error('You must specify an ID field');
    }
    i = array.length;
    while (i--) {
        record = array[i];
        if (record.hasOwnProperty(idField)) {
            obj[record[idField]] = record;
        }
    }
    return obj;
}
exports.reindex = reindex;
/**
 * validate email
 * @param email
 * @returns {boolean}
 */
function validateEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
exports.validateEmail = validateEmail;
/*** Helper function to Capitalize String texts ***/
function capitalizeWords(str) {
    str = str.toLowerCase();
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
exports.capitalizeWords = capitalizeWords;
/**
 * Helper function for empty check
 * @param string|object|number
 * @returns {boolean}
 */
function empty(value) {
    if (typeof value === 'undefined' || typeof value === null) {
        return true;
    }
    else {
        switch (typeof value) {
            case 'boolean':
                // check boolean
                return (value === false) ? true : false;
                break;
            case 'string':
                // check if string is empty
                return (value === '') ? true : false;
                break;
            case 'number':
                // check if number is empty
                return (isNaN(value) || value === 0) ? true : false;
                break;
            case 'object':
                // check if object is empty
                return (value.length < 1 || objEmpty(value)) ? true : false;
                break;
            default:
                // value cannot be checked
                return true;
                break;
        }
    }
}
exports.empty = empty;
/**
 * Function to check if an object is empty and return corresponding boolean value
 * @param obj
 * @return {boolean}
 */
function objEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
exports.objEmpty = objEmpty;

exports.AGENDA_ID = void 0;
exports.AGENDA_ID = "dff3085d-4802-4406-adb8-00c2d30d53a4";
exports.AGENDA_ID2 = void 0;
exports.AGENDA_ID2 = "cdf3085d-4802-4406-adb8-00c2d30d53h9";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsU0FBZ0IsZ0JBQWdCO0lBQzlCLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUIsSUFBSSxJQUFJLEdBQUcsc0NBQXNDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7UUFDNUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0MsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVJELDRDQVFDO0FBRUQsU0FBZ0IsY0FBYztJQUM1QixPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7QUFDakMsQ0FBQztBQUZELHdDQUVDO0FBRVksUUFBQSxRQUFRLEdBQUc7SUFDdEIsbUJBQW1CLEVBQUUsQ0FBQyxJQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUNqRSxrQkFBa0IsRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0NBQ3JFLENB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RyxJQUFJLEdBQUcsRUFBRTtRQUNuQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBTkQsNEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVVuaXF1ZUlEKCkge1xuICB2YXIgZHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgdmFyIHV1aWQgPSAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgdmFyIHIgPSAoZHQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xuICAgIGR0ID0gTWF0aC5mbG9vcihkdCAvIDE2KTtcbiAgICByZXR1cm4gKGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xuICB9KTtcbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBV1NEYXRlVGltZSgpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxufVxuXG5leHBvcnQgY29uc3QgcmVzcG9uc2UgPSB7XG4gIHNlbmRTdWNjZXNzUmVzcG9uc2U6IChkYXRhOmFueSkgPT4gKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogZGF0YX0pLFxuICBzZW5kRmFpbGVkUmVzcG9uc2U6IChkYXRhOiBhbnkpID0+ICh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcnM6IGRhdGF9KVxufVxuXG4vKipcbiAqIFJlaW5kZXggYW4gYXJyYXkgYnkga2V5IGZpZWxkXG4gKiBAcGFyYW0gYXJyYXkgXG4gKiBAcGFyYW0gaWRGaWVsZCBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlaW5kZXgoYXJyYXk6IGFueSwgaWRGaWVsZDogc3RyaW5nKSB7XG4gIHZhciBvYmo6YW55ID0ge30sIGksIHJlY29yZDtcblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJlaW5kZXggYSBub24tYXJyYXkhJyk7XG4gIH1cblxuICBpZiAoIWlkRmllbGQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYW4gSUQgZmllbGQnKTtcbiAgfVxuXG4gIGkgPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICByZWNvcmQgPSBhcnJheVtpXTtcbiAgICBpZiAocmVjb3JkLmhhc093blByb3BlcnR5KGlkRmllbGQpKSB7XG4gICAgICBvYmpbcmVjb3JkW2lkRmllbGRdXSA9IHJlY29yZDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIHZhbGlkYXRlIGVtYWlsXG4gKiBAcGFyYW0gZW1haWxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbDogYW55KSB7XG4gIHJldHVybiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KGVtYWlsKTtcbn1cblxuLyoqKiBIZWxwZXIgZnVuY3Rpb24gdG8gQ2FwaXRhbGl6ZSBTdHJpbmcgdGV4dHMgKioqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemVXb3JkcyhzdHI6IHN0cmluZykge1xuICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHdcXFMqL2csIGZ1bmN0aW9uICh0eHQpIHtcbiAgICByZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGVtcHR5IGNoZWNrXG4gKiBAcGFyYW0gc3RyaW5nfG9iamVjdHxudW1iZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1wdHkodmFsdWU6YW55KSB7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHZhbHVlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAvLyBjaGVjayBib29sZWFuXG4gICAgICAgIHJldHVybiAodmFsdWUgPT09IGZhbHNlKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAvLyBjaGVjayBpZiBzdHJpbmcgaXMgZW1wdHlcbiAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gJycpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgLy8gY2hlY2sgaWYgbnVtYmVyIGlzIGVtcHR5XG4gICAgICAgIHJldHVybiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSAwKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIC8vIGNoZWNrIGlmIG9iamVjdCBpcyBlbXB0eVxuICAgICAgICByZXR1cm4gKHZhbHVlLmxlbmd0aCA8IDEgfHwgb2JqRW1wdHkodmFsdWUpKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIHZhbHVlIGNhbm5vdCBiZSBjaGVja2VkXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBjaGVjayBpZiBhbiBvYmplY3QgaXMgZW1wdHkgYW5kIHJldHVybiBjb3JyZXNwb25kaW5nIGJvb2xlYW4gdmFsdWVcbiAqIEBwYXJhbSBvYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmpFbXB0eShvYmo6IG9iamVjdCkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufSJdfQ==