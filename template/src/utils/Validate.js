  const curry = (fn) => {
      if (fn.length <= 1) return fn;
      
      // 这是我一开始的实现
      // 后来发现 rest 是多余的，下面这样就行了，fn.length 多处用到，可以提出来
      const generator = (args) => (args.length === fn.length ? fn(...args) : arg => generator([...args, arg]));
      // const generator = (args, rest) => (!rest ? fn(...args) : arg => generator([...args, arg], rest - 1));
      
      return generator([]);
  };

  export function required(field) {
    if (typeof (field) === 'object')
        return !(!field || (Array.isArray(field) && field.length === 0) ||  (field.toString() === '[object Object]' && Object.keys(field).length === 0))
    if (typeof (field) === 'boolean' || typeof (field) === 'number')
        return true
    if (typeof (field) === 'string' && isNullStr(field.trim()))
        return false
    return !!field
  }

  export function isNullStr(val) {
      if (val === undefined || val === "undefined" || val === null || val === "null" || val === "NULL" || val === "" || val === '') {
          return true
      }
      return false
  }

  const regPatten = (regs,key)=> {
      if(!required(key)) return false
      return regs.test(key);
  }
  const _regCurring = curry(regPatten);

  export const checkMobile = _regCurring(/^[1][0-9]{10}$/);
  export const checkEmail = _regCurring(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  export const checkIdCard = _regCurring(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/);
  export const checkMoney = _regCurring(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/);
  export const checkNum = _regCurring(/^[0-9]+$/);
  export const checkUserName = _regCurring(/^[a-zA-Z]{1,20}$/);
  export const checkPwd = _regCurring(/^(\\w){6,20}$/);
  export const checkPositiveInteger = _regCurring(/^[0-9]*[1-9][0-9]*$/);

  //判断字符串长度范围
  export function rangelength(key,param) {
      return required(key) && (key.length >= param[0] && key.length <= param[1])
  }
