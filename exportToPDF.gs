function exportToPDF() {
  var folderId = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // 変える、folder with docs
  var moveToFolderId = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // 変える、folder to move PDF
  var doneFolderId = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // 変える、folder with docs that have already been converted to PDF (to reduce duplication)

  var filesN = DriveApp.getFolderById(folderId).getFiles();
  var downloadedFolder = DriveApp.getFolderById(moveToFolderId);
  var doneFolder = DriveApp.getFolderById(doneFolderId);
  while(filesN.hasNext()){
    var doc = filesN.next();
    doc.moveTo(doneFolder);
    var docName = doc.getName();
    docBlob = doc.getAs('application/pdf');
    docBlob.setName(docName + ".pdf");
    var file = downloadedFolder.createFile(docBlob);
    /* Logger.log('Your PDF file is available at ' + file.getUrl()); */
  }
}
