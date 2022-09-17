function editExport() {
  var mode = "編集";

  //スプレッドシート、シート、行数を取得
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var count = sheet.getLastRow();

  const table = {
    A: "isChecked",
    B: "isFormChecked",
    C: "isTicketCamChecked",
    D: "isTicketEditChecked",
    E: "isTicketCamSent",
    F: "isTicketEditSent",
    G: "isStoryboardSend",
    H: "isMovieSend",
    I: "isMovieChecked",
    J: "datetime",
    K: "partNumber",
    L: "partName",
    M: "userName",
    N: "sid",
    O: "grade",
    P: "classNumber",
    Q: "number",
    R: "email",
    S: "seisaku",
    T: "cam",
    U: "camRentalId",
    V: "camDatetime",
    W: "camDatetimeKibou1",
    X: "camDatetimeKibou2",
    Y: "edit",
    Z: "editRentalId",
    AA: "editDatetime",
    AB: "editDatetimeKibou1",
    AC: "editDatetimeKibou2",
    AD: "freeDescription",
    AE: "memo",
  }

  var pages = 1;

  //ドキュメントを格納するフォルダを取得
  var targetFolder = DriveApp.getFolderById("XXXXXXXXXXXXXXXXXXXXXX"); //変える

  //項目タイトルを覗く3行目~最終行について、ドキュメントを作成する
  for (i = 3; i <= count; i++) {

    //日時を取得
    var date = new Date();
    var displayDate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyyMMddHHmmss');

    var user = {};
    //連想配列にユーザー情報を代入
    Object.keys(table).map(key => user[table[key]] = sheet.getRange(key + i).getValue());

    if (user.isTicketEditChecked) { //ここを変更

      //ドキュメントを作成
      //コピー元のファイルを取得します。
      var sourcefile = DriveApp.getFileById("XXXXXXXXXXXXXXXXXXXXXX"); //変える
      //コピーを作成します。
      newfile = sourcefile.makeCopy("iPad引換票[編集]_" + removeText(user.partName) + "_" + displayDate);
      //コピー後のファイルを取得します。
      var document = DocumentApp.openById(newfile.getId());
      //var document = DocumentApp.create(displayDate + "_" + title);
      var body = document.getBody();

      var userData = user.sid + ": " + user.grade + user.classNumber + " " + user.number + "  " + user.userName;

      // 変える
      kashidashiDate = Utilities.formatDate(user.editDatetime, 'JST', 'yyyy年MM月dd日');

      //本文を書き込む
      body.replaceText('{mode}', mode);
      body.replaceText('{userData}', userData);
      body.replaceText('{user.partName}', user.partName);
      body.replaceText('{displayDate}', displayDate);
      body.replaceText('{pages}', pages);
      body.replaceText('{userData}', userData);
      body.replaceText('{kashidashiDate}', kashidashiDate);
      body.replaceText('{rentalId}', user.editRentalId);
      document.saveAndClose();

      //指定したフォルダに所属（移動）させる
      var docFile = DriveApp.getFileById(document.getId());
      docFile.moveTo(targetFolder);

      console.log(user.editRentalId);
      pages = pages + 1;
    }
  }
}
