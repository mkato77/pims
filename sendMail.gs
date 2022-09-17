# 動画受付メール送信
function sendMail() {
  var mode = "受付メール";

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
    AF: "movieURL",
    AG: "message",
    AH: "rejectionReason",
  }

  var pages = 1;

  //項目タイトルを覗く3行目~最終行について、ドキュメントを作成する
  for (i = 3; i <= count; i++) {

    //日時を取得
    var date = new Date();
    var displayDate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyyMMddHHmmss');

    var user = {};
    //連想配列にユーザー情報を代入
    Object.keys(table).map(key => user[table[key]] = sheet.getRange(key + i).getValue());

    var userData = user.sid + ": " + user.grade + user.classNumber + " " + user.number + "  " + user.userName;

    if (user.isFormChecked) {
      if (user.isMovieSend) {
        // 提出済みの場合
        if (user.isMovieChecked) {
          // 審査合格

          //件名
          var subject = 'パートCMの提出を受け付けました。';

          //本文
          var mainMessage = userData + '（' + user.partName + '）<br><br>こんにちは。<br>提出された文化祭パートCMを受け付けました！<br><br><strong>受け付けた動画URL</strong>：<br>' + user.movieURL;

          sheet.getRange("AI" + i).setValue("合格");
        } else {
          // 審査不合格

          //件名
          var subject = '[重要] パートCMに不備があります。至急ご確認ください。';

          //本文
          var mainMessage = userData + '（' + user.partName + '）<br><br>こんにちは。<br>提出された文化祭パートCMについて、映像が不備があり、受け付けられない状態となっています。<br><br>至急、内容を修正の上、再提出してください。<br><br><strong>最終の提出期限は、8月21日です。</strong>期限までに提出していただかない場合、映像を放映できません。<br><br>-----<br><br><strong>リジェクト理由</strong>：<br>' + user.rejectionReason + '<br><br><strong>受け付けた動画URL</strong>：<br>' + user.movieURL;
          sheet.getRange("AI" + i).setValue("不合格");

        }
      } else {
        // 未提出の場合

        //件名
        var subject = '[重要] パートCMが未提出です。至急提出してください。';

        //本文
        var mainMessage = userData + '（' + user.partName + '）<br><br>こんにちは。<br>文化祭パートCMについて、現在映像が未提出状態となっています。<br>至急、映像を提出してください。<br><br><strong>最終の提出期限は、8月21日です。</strong>期限までに提出していただかない場合、映像を放映しません。<br><br><strong>映像を提出したつもりなのにこのメールが届いた場合：</strong>フォームでの提出が行われていない可能性があります。<a href="https://docs.google.com/document/d/1WGJMdHRE_wDMEuptvsqNPzMXRHtSl3dpVdbu5E6YELE/edit?usp=sharing">パート長会議でお渡しした資料</a>で提出方法をご確認ください。';
        sheet.getRange("AI" + i).setValue("未提出");

      }

      //差出人名
      var name = '放送外局 パートCM担当（加藤 実）';


      if (user.message != "") {
        mainMessage = mainMessage + '<br><br>-----<br><br><strong>連絡事項があります</strong>：<br><br>' + user.message;
      }

      var message = mainMessage + '<br><br>-----<br><br>提出方法等は、<a href="https://docs.google.com/document/d/1WGJMdHRE_wDMEuptvsqNPzMXRHtSl3dpVdbu5E6YELE/edit?usp=sharing">パート長会議でお渡しした資料</a>をご確認ください。<br><br>なお、不明な点や相談事項がある場合には、このメールに返信してください。<br><br>-----<br><br>放送外局 パートCM担当<br>高ⅠⅭ24 加藤 実（67045@aikogakuen.net）<br><br>※このメールは、システムにより自動配信しています。内容に間違いがある場合は、返信してください。';

      let options = {
        "htmlBody": message,
        "name": name,
        "cc": "67045+partcm@aikogakuen.net"
      };
      //メール送信
      MailApp.sendEmail(user.email, subject, message, options);
      pages = pages + 1;
    }

  }
}
