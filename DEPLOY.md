# cyc 的生日惊喜 · from zyh

为 2026 年 10 月 19 日二十岁生日准备的互动网页。

## 发布

将这个目录的全部内容上传到 GitHub 仓库 main 分支，保留 `.github/workflows/pages.yml`。
在仓库 Settings → Pages → Source 选择 GitHub Actions。
在 Actions 中查看 Publish birthday website；成功后，Settings → Pages 会显示正式网站链接。

网页内容位于 site/，全部图片为相对路径，适用于 GitHub Pages 的仓库子路径。
不包含原 Sites 的项目身份或认证凭据。

## 摄像头

通过正式 HTTPS 链接访问，点击开启摄像头并允许授权。
画面在浏览器内处理，不录制或上传。吹气通过嘴部表情估计，不使用麦克风。
手势识别仍从 jsDelivr 下载 MediaPipe 运行时，并从 Google Storage 下载模型；这些地址需要在使用者网络下可访问。
GitHub Pages 和外部模型的访问情况仍需用朋友的网络测试。

如果 GitHub Actions 未自动启动，在 Actions 中选择 Publish birthday website → Run workflow。

