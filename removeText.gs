# テキストから記号を取り除く
function removeText(input) {
  const replaced = input.replace(/[^0-9A-Za-z\u3041-\u309F\u30A1-\u30FF\u3001-\u303B\u31C0-\u33FF\u3400-\u9fEA\uF900-\uFAD9\uFF01-\uFF9F]/g, '');
  return replaced;
}
