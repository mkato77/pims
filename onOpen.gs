function onOpen() {
  var app = SpreadsheetApp.getUi();           // Uiクラスを取得する
  var menu = app.createMenu('引換票発行');  // Uiクラスからメニューを作成する
  menu.addItem('メニュー表示', 'showSidebar');   // メニューにアイテムを追加する
  menu.addSeparator();
  menu.addItem('一括で出力する', 'allFunction');   // メニューにアイテムを追加する
  menu.addSeparator();
  menu.addItem('撮影用: 1つのPDFに出力する', 'camFunction');   // メニューにアイテムを追加する
  menu.addItem('編集用: 1つのPDFに出力する', 'editFunction');   // メニューにアイテムを追加する
  menu.addSeparator();
  menu.addItem('動画受付メール配信', 'sendMail');   // メニューにアイテムを追加する
  menu.addSeparator();
  menu.addSubMenu(                           // サブメニューをメニューに追加する
      app.createMenu("高度な機能")             // Uiクラスからメニューを作成する
      .addItem("未変換DocsをPDF変換", "exportToPDF") // メニューにアイテムを追加する
      .addItem("PDFをマージ", "merge") // メニューにアイテムを追加する
      .addSeparator()
      .addItem("両方: ドキュメントのみ生成", "docsExport") // メニューにアイテムを追加する    
      .addItem("撮影用: ドキュメントのみ生成", "camExport") // メニューにアイテムを追加する    
      .addItem("編集用: ドキュメントのみ生成", "editExport") // メニューにアイテムを追加する    
  );
  menu.addToUi();                            // メニューをUiクラスに追加する
}
