import { consoleErrorMessageSerializer, ErrorMessage } from "./index";

const mockChromeStack = `TypeError: Error raised
at bar http://192.168.31.8:8000/c.js:2:9
at foo http://192.168.31.8:8000/b.js:4:15
at calc http://192.168.31.8:8000/a.js:4:3
at <anonymous>:1:11
at http://192.168.31.8:8000/a.js:22:3
`;

const mockFirefoxStack = `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`;
const makeAssertion = (res: ErrorMessage) => {
  expect(res.message).toEqual("Error Raised");
  expect(res.stack.length).toEqual(4);
  expect(res.stack[0].line).toEqual(2);
  expect(res.stack[0].column).toEqual(9);
  expect(res.stack[0].fileName).toEqual("http://192.168.31.8:8000/c.js");
  expect(res.stack[1].line).toEqual(4);
  expect(res.stack[1].column).toEqual(15);
  expect(res.stack[1].fileName).toEqual("http://192.168.31.8:8000/b.js");
  expect(res.stack[2].line).toEqual(4);
  expect(res.stack[2].column).toEqual(3);
  expect(res.stack[2].fileName).toEqual("http://192.168.31.8:8000/a.js");
  expect(res.stack[3].line).toEqual(22);
  expect(res.stack[3].column).toEqual(3);
  expect(res.stack[3].fileName).toEqual("http://192.168.31.8:8000/a.js");
};

describe("Serialize console error message from different browser", () => {
  it("should serialize meesage from Chrome", () => {
    const res = consoleErrorMessageSerializer(mockChromeStack);
    makeAssertion(res);
  });
  it("should serialize meesage from FireFox", () => {
    const res = consoleErrorMessageSerializer(mockFirefoxStack);
    makeAssertion(res);
  });
});
