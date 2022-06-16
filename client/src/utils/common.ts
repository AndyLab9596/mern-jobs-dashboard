import { AxiosError } from "axios";

const isAxiosError = (error: unknown | AxiosError): error is AxiosError => {
    return (error as AxiosError).response?.data !== undefined
}

const removeItem = <T>(arr: Array<T>, value: T): Array<T> => {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr;
}

export {
    isAxiosError,
    removeItem
}