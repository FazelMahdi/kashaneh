const digits = {
  arabic: '٠١٢٣٤٥٦٧٨٩',
  persian: '۰۱۲۳۴۵۶۷۸۹',
  devanagari: '०१२३४५६७८९',
  bangla: '০১২৩৪৫৬৭৮৯',
  tamil: '௦௧௨௩௪௫௬௭௮௯',
};

const replaceFunctions = Object.values(digits).map((langDigits) => {
  const zeroCharCode = langDigits.charCodeAt(0);
  const regex = new RegExp(`[${langDigits}]`, 'g');
  return (text: string) =>
    text.replace(regex, (digit: string) =>
      String(digit.charCodeAt(0) - zeroCharCode),
    );
});

export function replaceUnicodeDigitsWithAscii(text: string | number): string {
  let str = String(text);

  replaceFunctions.forEach((replace) => {
    str = replace(str);
  });

  return str;
}

export function fixChars(val: string | number) {
  if (typeof val !== 'string') return String(val);

  val = replaceUnicodeDigitsWithAscii(val);
  val = val.replace(/ي/g, 'ی').replace(/ك/g, 'ک');
}
