async function merge() {
  const FOLDER_ID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; //変える
  const EXPORT_ID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; //変える
  var doneFolderId = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; //変える

  // マージ用の空PDF空を作成
  const mergedPdf = await PDFLib.PDFDocument.create();

  //日時を取得
  var date = new Date();
  var displayDate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyyMMddHHmmss');

  //フォルダオブジェクト
  var folder = DriveApp.getFolderById(FOLDER_ID);
  var exportFolder = DriveApp.getFolderById(EXPORT_ID);
  var doneFolder = DriveApp.getFolderById(doneFolderId);

  //ファイルイテレータリスト
  var iteratorList = folder.getFiles();

  //マージするファイルオブジェクトのリスト
  var pdfList = [];
  //拡張子チェック
  var pattern = /.*\.pdf$/;

  while (iteratorList.hasNext()) {
    var file = iteratorList.next();
    if (pattern.test(file.getName())) {
      var blob = file.getBlob();
      var bytes = blob.getBytes();
      var bytesMine = Utilities.base64Encode(bytes);
      var pdfdocs1 = await PDFLib.PDFDocument.load(bytesMine);

      // マージ対象のファイルの全てのページ情報取得
      var targetPdfPages = await mergedPdf.copyPages(
        pdfdocs1,
        pdfdocs1.getPageIndices(),
      );

      //pdfdocs1を結合
      for (var page of targetPdfPages) {
        mergedPdf.addPage(page);
      }
      file.moveTo(doneFolder);
    }
  }

  //ドライブにファイルを生成する
  const base64String = await mergedPdf.saveAsBase64()
  const data = Utilities.base64Decode(base64String)
  var blob = Utilities.newBlob(data).setName("引換票_export" + displayDate + ".pdf").setContentType("application/pdf")
  DriveApp.getFolderById(EXPORT_ID).createFile(blob);

}
