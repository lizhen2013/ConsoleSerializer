interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    fileName: string;
  }>;
}
export const consoleErrorMessageSerializer = (errorMsgStr: string): ErrorMessage => {
  const regx = new RegExp(`[a-zA-z]+://[^\S^\n]*`, "g");
  const errorFilePaths = errorMsgStr.match(regx);
  const errorMessage = { message: "Error Raised", stack: [] } as ErrorMessage;
  errorFilePaths?.forEach((path) => {
    const columnIndex = path.lastIndexOf(":");
    const lineIndex = path.substring(columnIndex, 0).lastIndexOf(":");
    errorMessage.stack.push({
      line: parseInt(path.substring(lineIndex + 1, columnIndex)),
      column: parseInt(path.substring(columnIndex + 1, path.length)),
      fileName: path.substring(lineIndex, 0)
    });
  });
  return errorMessage;
};
