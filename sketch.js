let capture;
let Graphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#FFDDD2'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏預設的 HTML 視訊元素

  // 建立與視訊畫面一樣大小的 Graphics
  Graphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics(); // 初始化繪製 Graphics
}

function draw() {
  background('#FFDDD2'); // 確保背景顏色維持
  let x = (width - capture.width) / 2; // 計算影像的水平居中位置
  let y = (height - capture.height) / 2; // 計算影像的垂直居中位置

  push(); // 儲存當前繪圖設定
  translate(width, 0); // 將原點移到畫布右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, capture.width, capture.height); // 繪製翻轉後的攝影機影像
  pop(); // 恢復繪圖設定

  // 動態更新 Graphics
  drawOverlayGraphics();

  // 繪製 Graphics 在視訊上方
  image(Graphics, x, y, capture.width, capture.height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小

  // 更新 Graphics 大小
  Graphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics(); // 重新繪製 Graphics
}

function drawOverlayGraphics() {
  Graphics.background('#000000'); // 設定背景為黑色

  Graphics.push(); // 儲存當前繪圖設定
  Graphics.translate(Graphics.width, 0); // 將原點移到 Graphics 的右邊
  Graphics.scale(-1, 1); // 水平翻轉 Graphics

  // 確保 capture 已準備好
  if (capture.loadedmetadata) {
    for (let x = 0; x < Graphics.width; x += 15) { // 每隔 15 單位
      for (let y = 0; y < Graphics.height; y += 15) {
        let col = capture.get(x, y); // 擷取 capture 對應位置的顏色
        let gray = (col[0] + col[1] + col[2]) / 3; // 計算灰階值 (RGB 平均)
        Graphics.fill(gray); // 設定圓的顏色為灰階值
        Graphics.noStroke();
        Graphics.ellipse(x + 7.5, y + 7.5, 10, 10); // 繪製圓，中心點偏移 7.5
      }
    }
  }

  Graphics.pop(); // 恢復繪圖設定
}
