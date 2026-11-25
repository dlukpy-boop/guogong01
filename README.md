# 國共合作1.0 — 中三中國歷史互動簡報

**入口：** `index.html`（純靜態 GitHub Pages）。

網站完成一條可授課的完整主線：封面 → 國民黨發展（1905／1912／1914／1919）→ 共產黨發展（1917／1919／1920／1921）→ 兩黨合作原因 → 1923《孫越宣言》 → 1924國民黨一大、黃埔軍校 → 1926–1928北伐及名義統一 → 課堂總結。

**目前保留原貌：** 既有封面、握手單一背景、1905/1912兩頁畫面、圖片路徑與原本逐段 reveal；已批核文字不更動。其他教學頁面採用原設計配色的 **HTML/CSS 佔位圖塊**，可在美術完成後替換。

## 快速操作

- 預覽：本機啟動任意靜態伺服器：`python3 -m http.server 8000`，再開啟 `http://localhost:8000/`。
- 操作：右下角 ▶、左下角 ◀；鍵盤 ← →、PageUp/PageDown；右上角返回封面。
- 初始全景畫面可直接選「國民黨的發展」或「共產黨的發展」。
- 1924三大政策點擊可逐項高亮；1928統一對照卡可切換。
- 1600×900固定畫布按瀏覽器視窗縮放，保持16:9。

## 維護對照

- `index.html`：原有兩個歷史場景、全景背景及新增場景容器。
- `js/scene-config.js`：場景順序／reveal設定。**新增教材順序從這裏管理**。
- `js/expansion-data.js`：新增場景教學文字、圖片預留說明、左側示意元素。
- `js/expansion.js`：把資料渲染成互動 HTML 及教學示意。
- `js/navigation.js`：全站前後、鍵盤和左右支線入口。
- `css/scene-expansion.css`：新增場景 CSS；不影響舊頁的 CSS 文件。
- `assets/`：原有圖片獨立分層存放；尚未提供嘅圖只會出現抽象佔位，**不會以生成照片冒充史料**。
- `content/approved-guomindang-notes.md`：既有國民黨四站文字備份（已確認）。
- `content/site-scenes.json`：新場景資料嘅純 JSON 備份，方便交接及修改。
- `QA_REPORT.md`：實測結果及限制。

## GitHub Pages

推送檔案至 `dlukpy-boop/guogong01` 主分支的儲存庫根目錄，以 GitHub Pages 執行／保持既有 workflow。所有路徑均是相對路徑，不需建置工具。

## 尚需後續美術

1914、1919及共產黨、合作、北伐場景之人物、照片、文件、歷史地圖均只是意象化圖塊/線性示意；原有1912年人物插畫仍是先前試版，尚待正式審美確認。舊版三張 Wikimedia 史料仍屬外部資源，斷網顯示原有提示。北伐路線為非比例抽象示意，不能視作精確地圖。另保留專案 `archive/` 下先前原始單檔 HTML 作備份。

## 資料依據

- 使用者提供之《亮點中國史》第1單元第2章，第46–49頁及原課堂簡報；國民黨四站使用已確認文字。
- 北伐擴展六場景採用使用者同意嘅教學內容；其中1927年分裂與1928年續北伐必須在教學時分開說明。

---


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

### 2026-11-25：歷史圖片及互動北伐地圖

- `assets/historical/` — 從使用者原有出版社PPT/PDF抽出的人物、會場、證件、軍校圖與北伐地圖；保留原像素或明確記錄背景圖的淡化處理。
- `js/historical-media.js` — 史料與場景對照、題目、類型（照片／後世繪畫／示意）。
- `css/historical-media.css` — 史料卡與放大檢視、舊版金色箭頭、北伐動畫與 `overflow:clip` 防止整個畫布被瀏覽器自動捲動。
- 北伐地圖僅有**一幅固定底圖**，SVG路線／標記隨年份逐段顯示；非精確戰場坐標地圖。
- 點擊史料卡可放大，按 × 或背景可退出。
- 圖片由出版社教材抽出，不等於已確認公眾網站再發布授權；如網站對公眾開放，應先確認版權或更換公有領域版本。
