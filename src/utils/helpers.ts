
export function generateUniqueID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export function getAWSDateTime() {
  return new Date().toISOString()
}

export const response = {
  sendSuccessResponse: (data:any) => ({ success: true, data: data}),
  sendFailedResponse: (data: any) => ({ success: false, errors: data})
}

/**
 * Reindex an array by key field
 * @param array 
 * @param idField 
 */
export function reindex(array: any, idField: string) {
  var obj:any = {}, i, record;

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

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email: any) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

/*** Helper function to Capitalize String texts ***/
export function capitalizeWords(str: string) {
  str = str.toLowerCase();
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * Helper function for empty check
 * @param string|object|number
 * @returns {boolean}
 */
export function empty(value:any) {

  if (typeof value === 'undefined' || typeof value == null) {
    return true;
  } else {
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

/**
 * Function to check if an object is empty and return corresponding boolean value
 * @param obj
 * @return {boolean}
 */
export function objEmpty(obj: object) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export const AGENDA_ID = "dff3085d-4802-4406-adb8-00c2d30d53a4";
export const AGENDA_ID2 = "cdf3085d-4802-4406-adb8-00c2d30d53h9";