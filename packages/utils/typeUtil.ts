/**
 * 方法说明：是否是数组
 * @param obj  检查对象
 */
export const isArray = (obj: any): boolean => {
    return (typeof obj == 'object') && obj.constructor === Array;
}
/**
 *方法说明：是否是字符串
 * @param obj  检查对象
 */
export const isString = (obj: any): boolean => {
    return (typeof obj == 'string') && obj.constructor === String;
}
/**
 *方法说明：是否是数字
 * @param obj  检查对象
 */
export const isNumber = (obj: any): boolean => {
    return (typeof obj == 'number') && obj.constructor === Number;
}
/**
 *方法说明：是否是日期
 * @param obj  检查对象
 */
export const isDate = (obj: any): boolean => {
    return (typeof obj == 'object') && obj.constructor === Date;
}
/**
 *方法说明：是否是方法
 * @param obj  检查对象
 */
export const isFunction = (obj: any): boolean => {
    return (typeof obj == 'function') && obj.constructor === Function;
}
/**
 *方法说明：是否是对象
 * @param obj  检查对象
 */
export const isObject = (obj: any): boolean => {
    return (typeof obj == 'object') && obj.constructor === Object;
}
