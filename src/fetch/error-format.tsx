export function FormatError(intl: { formatMessage: (arg0: { id: string; }, arg1: any) => any; }, json: { code: string | string[]; data: any; message: any; }) {
  if (json.code !== "0000" && json.code[1] !== "9") {
    var message = intl.formatMessage({ id: "error." + json.code }, json.data);
    if (message !== undefined) {
      return message;
    } else {
      return json.message;
    }
  } else {
    return json.message;
  }
}
