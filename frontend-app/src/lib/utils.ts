export function isNumber(val: string | number | any) {
    return Number.isInteger(val)
}

export function isDate(val: string | number | any) {
    const date = new Date(val);

    return date instanceof Date;
}

export const isArray = (val: any) => Array.isArray(val)

export const isString = (val: any) => typeof val === "string"

export const transFormTableDataForRender = (data: []) => {
    return data.map(record => ({
        [record["id"]]: Object.keys(record).reduce((prev, cur) => {
            const selected = !Array.isArray(record[cur]) && !(typeof record[cur] === "object") ? { [cur]: record[cur] } : {}

            return {
                ...prev,
                ...selected
            }

        }, {})
    }))

}