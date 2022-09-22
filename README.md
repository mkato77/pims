# PIMS (Part cm Information Management System)

パートCM制作における、iPad貸出票の配布や提出状況のメール送信など、面倒な事務作業からの脱却。

放送委員会向け業務効率化システム。

[https://github.com/mkato77/pims](https://github.com/mkato77/pims)

![image](https://user-images.githubusercontent.com/80267487/190855844-5dd8eb09-471b-4ac5-b8be-ce9192fb0539.png)


## 機能

### 貸出票発行機能

![image](https://user-images.githubusercontent.com/80267487/191639306-714e27a7-200b-478b-a684-bb64543ddecc.png)

iPadを貸し出す際に必要な貸出票のPDFを、チェックを入れたパート分一括で発行します。

### 動画受付メール送信

動画の提出状況をそれぞれのパートに送信することができます。

未提出・提出済不合格・提出済合格の３種類のメールを送信できます。





## 導入方法＆テンプレート

スプレッドシート・Googleフォーム・GASがすべて入ったテンプレートです。

**こちらをコピーし、設定することで、すぐに利用できます。**

### ステップ1　Googleドライブのフォルダを作成

以下の図を参考に、Googleドライブに**フォルダ6つを作成**してください。

```jsx
PIMS/
　├ 作業フォルダ/
　│　├ マージ待ち/
　│　├ 変換済/
　│　└ 変換待ち/
　└ 生成済PDF/
```

### ステップ2　テンプレートをコピー

スプレッドシート・フォーム・GAS
[https://docs.google.com/spreadsheets/d/1lkWak9yb59ChyUXKrwmaEMXDW4vsKy_ZUJlB9EZsgGU/copy](https://docs.google.com/spreadsheets/d/1lkWak9yb59ChyUXKrwmaEMXDW4vsKy_ZUJlB9EZsgGU/copy)

貸出票Template
[https://docs.google.com/document/d/1DetvKPlyxa56vd_7_UlM3Hdj13VZat9Nrw9ZKGLfNIM/copy](https://docs.google.com/document/d/1DetvKPlyxa56vd_7_UlM3Hdj13VZat9Nrw9ZKGLfNIM/copy)

### ステップ3　パラメータ変更
Google Apps Script内cam.gsを開き、46行目に移動してください。

```
var targetFolder = DriveApp.getFolderById("XXXXXXXXXXXXXXXXXXXXXX"); //変える
```

`XXXXXXXXXXXXXXXXXXXXXX`とあります。ここに、先ほど作成した "PIMS/作業フォルダ/変換待ち" フォルダのIDを代入してください。

例えば、"PIMS/作業フォルダ/変換待ち" のURLが

```
https://drive.google.com/drive/u/1/folders/vnayop38y5bal8ob9wbiue
```

である場合、下のようになります。

```
var targetFolder = DriveApp.getFolderById("vnayop38y5bal8ob9wbiue"); //変える
```

同様に、以下の部分も変えてください。

| ファイル名 | 行番号 | フォルダ・ファイル |
| --- | --- | --- |
| cam.gs | 46 | PIMS/作業フォルダ/変換待ち |
| cam.gs | 63 | 貸出票Template |
| edit.gs | 46 | PIMS/作業フォルダ/変換待ち |
| edit.gs | 63 | 貸出票Template |
| exportToPDF.gs | 4 | PIMS/作業フォルダ/変換待ち |
| exportToPDF.gs | 5 | PIMS/作業フォルダ/マージ待ち |
| exportToPDF.gs | 6 | PIMS/作業フォルダ/変換済 |
| mergePDF.gs | 2 | PIMS/作業フォルダ/マージ待ち |
| mergePDF.gs | 3 | PIMS/生成済PDF |
| mergePDF.gs | 4 | PIMS/作業フォルダ/変換済 |

パラメータを変更したら、プロジェクトを保存するのを忘れないでください。

![Untitled 13](https://user-images.githubusercontent.com/80267487/190855075-3fb28e41-cfae-4328-8a67-af183ea21a5d.png)

これで準備完了です！

何か権限を求められたら、承認してください。

## 利用方法

### 貸出票発行

貸出票を発行するパート列の、貸出票出力指定にチェックを入れます。

![Untitled 14](https://user-images.githubusercontent.com/80267487/190855082-1c71b4a8-ca07-4e78-bbe7-da45f1e2641a.png)

スプレッドシート上部メニュー＞引換票発行

![Untitled 15](https://user-images.githubusercontent.com/80267487/190855088-aeb92b72-83d7-4579-8cd6-3b6a1b6b26a7.png)

「一括で出力」→すべてを１つのPDFに出力します。

「撮影用: 1つのPDFに出力する」→撮影用貸出票のみ、1つのPDFに出力します。

「編集用: 1つのPDFに出力する」→編集用貸出票のみ、1つのPDFに出力します。

実行が完了すると、PIMS/生成済PDF に出力されます。

### 動画受付メール送信

動画の提出状況をそれぞれのパートに送信することができます。

まず、提出された動画のURLをAF列に入力します。

![Untitled 16](https://user-images.githubusercontent.com/80267487/190855091-744aae4f-e432-4aea-88f5-f8859d0d7ab7.png)

次に、提出状況をH列、I列に入力します。以下の図を参考にしてください。

![image](https://user-images.githubusercontent.com/80267487/190855731-130c78d5-3614-40f9-8299-7095e7787cb3.png)

それぞれのパートに連絡事項がある場合は、AG列に入力してください。

不合格パートで、リジェクト理由を伝えたい場合は、AH列に入力してください。

![Untitled 18](https://user-images.githubusercontent.com/80267487/190855096-d68429ac-5890-480f-8445-813cfc3027dc.png)

最後に、メールを送信したいパート行のB列にチェックを入れてください。

![image](https://user-images.githubusercontent.com/80267487/190855769-cc9414a2-485e-481c-800e-7454bbe8dc05.png)

これで、準備完了です！

引換票発行＞動画受付メール配信

![Untitled 20](https://user-images.githubusercontent.com/80267487/190855102-0d27d30b-5a82-49bf-a936-934d8c00f527.png)

メールの文面をカスタマイズしたい場合は、GAS側`sendMail.gs`を変更してください。
