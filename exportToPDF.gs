function exportToPDF() {
  var folderId = "1jvVEYlAGxViy2sj4jAsQRJ6lKMx7EUXr"; // folder with docs
  var moveToFolderId = "1ClK4SLf-_NZQfBaOrgWuUeiyIwsNq_kQ"; // folder to move PDF
  var doneFolderId = "17P5mVD3GElaXRBpa1eM-4yVZ0-COGJHk"; // folder with docs that have already been converted to PDF (to reduce duplication)

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
