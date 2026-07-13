/**
 * プレースホルダーID → 実画像URL の対応表。
 * ここに登録された ID は ImagePlaceholder が自動的に実画像を表示し、
 * 未登録の ID は従来どおり枠（プレースホルダー）のまま表示される。
 * 画像は public/images/opt/ に Web表示用へ軽量化（幅1600px・JPEG）したものを置く。
 */
const base = import.meta.env.BASE_URL;
const img = (file: string) => `${base}images/opt/${file}`;

export const IMAGE_SOURCES: Record<string, string> = {
  // トップ ABOUT（若さは武器だ）
  'IMG-01': img('IMG-01.jpg'),
  'IMG-02': img('IMG-02.jpg'),
  // トップ CAREER ティーザー
  'IMG-12': img('IMG-12.jpg'),
  // SERVICE 01 戦略コンサル / 02 DX支援
  'IMG-S01': img('IMG-S01.jpg'),
  'IMG-S02': img('IMG-S02.jpg'),
  // WORKS 01 製造 / 03 ベンチャー / 04 医療 / 05 物流（02 小売は IMG-W02）
  'IMG-W01': img('IMG-W01.jpg'),
  'IMG-W03': img('IMG-W03.jpg'),
  'IMG-W04': img('IMG-W04.jpg'),
  'IMG-W05': img('IMG-W05.jpg'),
  // 社員ポートレート（トップINTERVIEW・詳細ページ共通）
  'IMG-09': img('IMG-09.jpg'),
  'IMG-10': img('IMG-10.jpg'),
  'IMG-11': img('IMG-11.jpg'),
  // INTERVIEW 記事写真
  'IMG-I01': img('IMG-I01.jpg'),
  'IMG-I02': img('IMG-I02.jpg'),
  'IMG-I03': img('IMG-I03.jpg'),
  'IMG-I04': img('IMG-I04.jpg'),
  'IMG-I05': img('IMG-I05.jpg'),
  'IMG-I06': img('IMG-I06.jpg'),
  // SERVICE 03 新規事業開発
  'IMG-S03': img('IMG-S03.jpg'),
  // WORKS 02 小売チェーン
  'IMG-W02': img('IMG-W02.jpg'),
  // CAREER
  'IMG-C01': img('IMG-C01.jpg'),
  'IMG-C02': img('IMG-C02.jpg'),
};
