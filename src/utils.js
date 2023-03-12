export const formatNumber = number => number.toFixed(2);

export const getValidValue = event => {
  let value = event.target.value;

  // replace '.' with '0.'
  value = value.replace(/^\.$/, "0.");

  // exclude all "." signs except first
  value = value.replace(
    /^([^.]*\.)(.*)$/,
    //all - 123.54.  validGroup - '123. | rest - 54.
    (_, validGroup, rest) => validGroup + rest.replaceAll(/\./g, "")
  );

  // exclude all non numeric values except "."
  value = value.replace(/[^0-9.]/g, "");

  // Remove extra "0" from the start of the string
  // "000015" -> "15" | 000.1 -> 0.1
  value = value.replace(/^0+(?=\d)/, "");

  // restrict input floating number to 4 after decimal point
  value = value.replace(/(?<=^\d+\.\d{4}).+/g, "");

  return value;
};
