import { validate } from 'uuid';

const userPropsWithoutId: string[] = ['age', 'hobbies', 'username'];
const userPropsWithId: string[] = ['age', 'hobbies', 'id', 'username'];

const validateHobbies = (obj: any) => {
    if (Array.isArray(obj)) {
        if (obj.length === 0) {
            return true;
        }

        const result = obj.map(item => {
            return typeof item === 'string';
        });

        return !result.includes(false);
    }

    return false;
}

export const validateBody = <T>(obj: any): obj is T => {
    const objKeys = Object.keys(obj).sort().toString();
    const resultOfTypeValidation = [];

    if (!obj.id) {
        const isKeysEqual = objKeys === userPropsWithoutId.toString();

        for (const prop in obj) {
            if (prop === 'username') {
                resultOfTypeValidation.push(typeof obj[prop] === 'string');
            }
            if (prop === 'age') {
                resultOfTypeValidation.push(typeof obj[prop] === 'number');
            }
            if (prop === 'hobbies') {
                resultOfTypeValidation.push(typeof obj[prop] === 'object' && validateHobbies(obj[prop]));
            }
        }

        return !resultOfTypeValidation.includes(false) && isKeysEqual;
    }

    if (obj.id) {
        const isKeysEqual = objKeys === userPropsWithId.toString();

        for (const prop in obj) {
            if (prop === 'username') {
                resultOfTypeValidation.push(typeof obj[prop] === 'string');
            }
            if (prop === 'age') {
                resultOfTypeValidation.push(typeof obj[prop] === 'number');
            }
            if (prop === 'hobbies') {
                resultOfTypeValidation.push(typeof obj[prop] === 'object' && validateHobbies(obj[prop]));
            }
            if (prop === 'id') {
                resultOfTypeValidation.push(validate(obj[prop]));
            }
        }

        return !resultOfTypeValidation.includes(false) && isKeysEqual;
    }

    return false;
};
