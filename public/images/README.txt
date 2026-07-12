====================================
画像の保存場所・命名ルール
====================================

このフォルダ（public/images/）に、img.txt の一覧に対応する画像を保存してください。
ファイル名は「プレースホルダーIDそのまま＋拡張子」にしてください。

例）
  public/images/IMG-01.jpg
  public/images/IMG-02.jpg
  public/images/IMG-S01.jpg
  public/images/IMG-W01.jpg
  public/images/IMG-I01.jpg
  public/images/IMG-C01.jpg
  public/images/IMG-LOGO.svg   （ロゴは svg か png）
  public/images/IMG-OGP.jpg    （OGPは 1200×630 固定）

- 写真は .jpg（または .webp）、ロゴ・透過素材は .png / .svg でOK
- ファイル名の英字は img.txt の大文字ID（IMG-01 など）に完全一致させてください
- 廃止済みの IMG-03〜IMG-05 は不要です

保存後、実装側で各プレースホルダー枠を実画像に差し替えます
（パズルピース型の切り抜き・スクロールリビールは枠側で対応済みなので、
 通常のトリミング前写真をそのまま入れて問題ありません）。
