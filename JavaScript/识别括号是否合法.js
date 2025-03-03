function isValidBrackets(str) {
  const stack = [];
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  str.split("").forEach(s => {
    if (["(", "[", "{"].includes(s)) {
      stack.push(s);
    }
    if ([")", "]", "}"].includes(s)) {
      if (stack.length === 0) return false;
      const last = stack.pop();
      if (map[last] !== s) return false;
    }
    return stack.length === 0;
  });
}

isValidBrackets("()"); // true
isValidBrackets("()[]{}"); // true
isValidBrackets("(]"); // false
isValidBrackets("([)]"); // false
isValidBrackets("{[]}"); // true
