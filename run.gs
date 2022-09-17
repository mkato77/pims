function allFunction() {
  console.log("撮影用iPad引換票を出力中...")
  camExport();
  console.log("編集用iPad引換票を出力中...")
  editExport();
  console.log("PDFに変換中...")
  exportToPDF();
  console.log("PDFをマージ中...")
  merge();
  console.log("Done!")
}

function docsFunction() {
  console.log("撮影用iPad引換票を出力中...")
  camExport();
  console.log("編集用iPad引換票を出力中...")
  editExport();
  console.log("Done!")
}

function camFunction() {
  console.log("撮影用iPad引換票を出力中...")
  camExport();
  console.log("PDFに変換中...")
  exportToPDF();
  console.log("PDFをマージ中...")
  merge();
  console.log("Done!")
}

function editFunction() {
  console.log("編集用iPad引換票を出力中...")
  editExport();
  console.log("PDFに変換中...")
  exportToPDF();
  console.log("PDFをマージ中...")
  merge();
  console.log("Done!")
}
