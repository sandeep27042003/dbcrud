export const validator = (data) => {
    const isUndefined = (value) => typeof value === 'undefined';
    const isNonEmptyString = (value) => typeof value === 'string' && value.length > 0;
    const isNumber = (value) => !isNaN(value) && typeof value === 'number';

    // Check if required fields are filled
    if (isUndefined(data.id) || !isNumber(data.id) ||
        isUndefined(data.name) || !isNonEmptyString(data.name) ||
        isUndefined(data.city) || !isNonEmptyString(data.city)) {
        return { status: false, msg: 'Required fields cannot be incomplete', code: 400 };
    }

    // Check if id is a number
    else if (!isNumber(data.id)) {
        return { status: false, msg: 'Invalid id format', code: 400 };
    }

    // Check if name is a string
    else if (!isNonEmptyString(data.name)) {
        return { status: false, msg: 'Invalid name format', code: 400 };
    }

    // Check if city is a string
    else if (!isNonEmptyString(data.city)) {
        return { status: false, msg: 'Invalid city format', code: 400 };
    }

    // Return valid data
    return { status: true, data, code: 200 };
};
