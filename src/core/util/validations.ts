import { replaceUnicodeDigitsWithAscii } from './number';

export const required = (message = '') => {
  return (v: any) => !!v || message;
};

export const isNumber = (message = '') => {
  const reg = /^[۰-۹0-9]+$/;
  return (v: string) => (!!v && !!reg.test(v)) || message;
};

export const maxLength = (message = '', length: number) => {
  return (v: string) => (!!v && String(v).length <= length) || message;
};

export const minLength = (message = '', length: number) => {
  return (v: string) => (!!v && String(v).length >= length) || message;
};

export const length = (message = '', length: number) => {
  return (v: string) => (!!v && String(v).length === length) || message;
};

export const isMobile = (message = '') => {
  return (v: string) => /09\d{9}$/.test(normalizePhone(v)) || message;
};

export function normalizePhone(text: string | number) {
  return replaceUnicodeDigitsWithAscii(text)
    .replace(/[\s-]+/g, '')
    .replace(/^((\+|00)98|0)?/, '0');
}

export function checkNationalId(value: string | number) {
  const string = replaceUnicodeDigitsWithAscii(String(value)).replace(
    /[\s-]+/g,
    '',
  );

  if (!/^\d{10}$/.test(string)) {
    return false;
  }

  const [check, ...digits] = string.split('').map(Number).reverse();
  const sum = digits.reduce((sum, digit, i) => sum + digit * (i + 2)) % 11;
  const calcedCheck = sum < 2 ? sum : 11 - sum;
  return check === calcedCheck;
}

export const isNationalId = (message = '') => {
  return (v: string | number) => (!!v && checkNationalId(v)) || message;
};
