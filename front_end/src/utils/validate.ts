import validator from "validator";

export const isValidEmail = (email: string) => {
  return validator.isEmail(email);
};

export const isValidPhoneNumber = ( phone: string) =>{
  return validator.isMobilePhone(phone,'vi-VN');
}

export const isValidPassWord  = (pass: string) =>{
  return validator.isStrongPassword(pass);
}
export const serialize = (obj: any) => {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      if (obj[p] || obj[p] === 0)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};