# 國共合作1.0｜互動 HTML 簡報

**此為整理版，不是重新設計。** 來源為目前最新、最完整的「國民黨沿革至1912」單檔 HTML。

## 立即部署 GitHub Pages

1. 將這份 ZIP **全部解壓**，直接把內部檔案上傳到 `dlukpy-boop/guogong01` 的 repository 根目錄。
2. 根目錄一定有 `index.html`，無須 npm、建置程式或後端。
3. GitHub 頁面開啟 `Settings → Pages → Build and deployment → Deploy from a branch`。
4. 選擇 `main` / `/(root)`，儲存。
5. 等 GitHub 發佈後，開啟 https://dlukpy-boop.github.io/guogong01/ 。

> 本包只負責檔案整理，沒有登入 GitHub，也沒有確認遠端 Pages 已部署。

## 專案目錄

```text
guogong01/
├── index.html                     # 網站入口；保留原 HTML 結構與文字
├── css/
│   ├── base.css                   # 底圖與封面、Zoom/Pan 設定
│   ├── scene-1905.css             # 1905 畫面
│   ├── animations-1905.css        # 1905 三階段進場
│   ├── interface.css              # 時間線及固定箭頭
│   ├── scene-1912.css             # 1912 畫面
│   └── animations-1912.css        # 1912 三階段進場
├── js/
│   ├── main.js                    # 入口初始化
│   ├── viewport.js                # 固定 1600 × 900、按視窗縮放
│   ├── scene-config.js            # 八個現有導覽步驟
│   └── navigation.js              # 前／後、返回封面、鍵盤事件
├── assets/
│   ├── backgrounds/               # 單一握手底圖
│   ├── titles/                    # 封面、1905、1912 獨立標題
│   ├── characters/                # 孫中山、宋教仁、志士等圖層
│   ├── documents/                 # 書冊及《民報》道具插畫
│   ├── symbols/                   # 插畫旗幟
│   ├── source-originals/          # 來源 PNG 備份（不參與網站渲染）
│   ├── audio/                     # 目前無音效
│   └── MANIFEST.json              # 精確尺寸、格式、sha256
├── content/approved-guomindang-notes.md
├── archive/                       # 最新原始單檔 HTML，供比對及回退
├── PROGRESS.md
├── QA_REPORT.md
└── DEPLOY_HANDOFF.md
```

## 如何操作

- 畫面左右下角固定箭頭控制前後步驟；「返回封面」回到起始畫面。
- 亦可用 `←`、`→`、`PageUp`、`PageDown`、空白鍵、`Home`、`Esc`。
- 原程式每個歷史時期分三個進場步驟。
- Zoom/Pan 仍引用同一張 `assets/backgrounds/handshake-panorama.webp`，不會換另一款握手。

## 新增歷史頁面（供下一個對話維護）

1. 先將已確認文字存入 `content/`，不要無故改動現有正文。
2. 把新素材依類別放入 `assets/`，**人物、標題、文件、黨徽各自獨立圖片**。
3. 在 `index.html` 加入新的場景節點（保持 `#stage` 及原本 16:9 結構）。
4. 在新建 `css/scene-年份.css` 管理該頁版面、`css/animations-年份.css` 管理進場，不要整頁重新設計。
5. 在 `js/scene-config.js` 追加步驟，必要時於 `navigation.js` 更新時間線 active 邏輯。
6. 每次新增檔案前後做圖片路徑、Chrome 16:9、手機縮放、導航、動畫檢查。

## 字體與網絡限制

- 標題均為獨立圖片，無需部署字型檔。其他正文沿用原 CSS 系統字型堆疊，跨電腦字形可能因缺少字型而稍有差異。
- 三張真實歷史照片仍是外部 Wikimedia URL；**這次無法取得其二進位原件**，保留現有的 URL、失敗佔位提示及原始史料連結，沒有偽造照片。見 `QA_REPORT.md`。
- 避免雙擊 `index.html` 直接以 `file://` 執行 ES module；可於本機執行 `python -m http.server 8000` 後開啟 http://localhost:8000/ 。GitHub Pages 的 HTTPS 可正常提供 module URL。

## 保護已定稿項目

- `index.html` 保留目前最新檔案的內容文字及 DOM 位置；有任何內容修訂先取得指示。
- `assets/source-originals/` 儲存原始 PNG，沒有取代網站渲染所使用的已嵌入 WebP。
- `archive/latest-standalone-source.html` 是本次拆分前主版本；不要在網站中直接鏈入。

有關完成進度、已知限制及測試詳情，請閱 `PROGRESS.md`、`QA_REPORT.md`。