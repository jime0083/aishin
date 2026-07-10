import { useMemo, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import GiantWord from '../components/GiantWord';
import useSubpageAnimations from '../hooks/useSubpageAnimations';

/**
 * ENTRYページ（/entry）。
 * 内容のトレース元: mirai-kirei.jp/contact/（フッターはトレースしない）
 * 選択肢等は採用向けに置換。送信はダミー動作（実送信なし・「送信できません」の案内画面を表示。
 * 後日バックエンドや外部フォームサービスに接続できるよう handleSubmit に集約）
 */

const ENTRY_TYPES = ['新卒採用', '中途採用', 'インターン', 'カジュアル面談', 'その他'];

const SOURCES = ['就活サイト', '求人媒体', 'SNS', 'ニュースサイト', '知人からの紹介', 'その他'];

/* トレース元の個人情報保護方針の主要項目 */
const PRIVACY_ITEMS = [
  '個人情報の管理: ご提供いただいた個人情報は、正確かつ最新の状態に保ち、不正アクセス・紛失・改ざん・漏洩を防止するため適切に管理します。',
  '個人情報の利用目的: ご入力いただいた情報は、採用選考のご連絡・ご案内のためにのみ利用します。',
  '第三者への開示・提供の禁止: ご本人の同意がある場合または法令に基づく場合を除き、個人情報を第三者に開示・提供しません。',
  '安全対策: 個人情報の正確性および安全性確保のために、セキュリティに万全の対策を講じています。',
  'ご本人の照会: ご本人が個人情報の照会・修正・削除を希望される場合は、ご本人であることを確認のうえ対応します。',
  '法令・規範の遵守と見直し: 保有する個人情報に関して適用される日本の法令を遵守するとともに、本方針の内容を適宜見直し、改善に努めます。',
];

type FormValues = {
  entryType: string;
  source: string;
  name: string;
  affiliation: string;
  phone: string;
  email: string;
  message: string;
};

const INITIAL_VALUES: FormValues = {
  entryType: '',
  source: '',
  name: '',
  affiliation: '',
  phone: '',
  email: '',
  message: '',
};

/** 各項目のバリデーション（エラーメッセージを返す。問題なければ空文字） */
function validateField(key: keyof FormValues, value: string): string {
  const trimmed = value.trim();
  if (trimmed === '') {
    if (key === 'entryType' || key === 'source') return '選択してください';
    return '入力してください';
  }
  if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return 'メールアドレスの形式が正しくありません';
  }
  if (key === 'phone') {
    const digits = trimmed.replace(/[^0-9]/g, '');
    if (!/^[0-9+\-() ]+$/.test(trimmed) || digits.length < 10 || digits.length > 11) {
      return '電話番号の形式が正しくありません（半角数字10〜11桁）';
    }
  }
  return '';
}

export default function Entry() {
  useSubpageAnimations();

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);

  const errors = useMemo(() => {
    const result = {} as Record<keyof FormValues, string>;
    (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
      result[key] = validateField(key, values[key]);
    });
    return result;
  }, [values]);

  const isValid = Object.values(errors).every((e) => e === '');
  const canSubmit = isValid && agreed;

  const handleChange =
    (key: keyof FormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleBlur = (key: keyof FormValues) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // ダミー送信: 実際の送信処理は行わない（将来ここでAPI/外部フォームサービスに接続する）
    setDone(true);
    window.scrollTo(0, 0);
  };

  const fieldError = (key: keyof FormValues) => (touched[key] && errors[key] ? errors[key] : '');

  return (
    <>
      <PageHero title="ENTRY" />

      <section className="section ent">
        <GiantWord text="JOIN US" side="right" />
        <div className="container">
          {done ? (
            /* 送信後画面（ポートフォリオサイトのため実送信は行わない: P-026） */
            <div className="ent__done" data-reveal>
              <p className="section__eyebrow">NOTICE</p>
              <h2 className="section__title">
                このポートフォリオサイトからは<span className="u-accent">送信できません</span>。
              </h2>
              <p className="ent__done-body">
                当サイトはポートフォリオとして制作したデモサイトのため、
                ご入力いただいたエントリー内容はどこにも送信されません。ご了承ください。
              </p>
              <Link to="/" className="btn-line">
                ← BACK TO TOP
              </Link>
            </div>
          ) : (
            <>
              <p className="section__eyebrow" data-reveal>
                ENTRY FORM
              </p>
              <h2 className="section__title">エントリーフォーム</h2>
              <div className="ent__lead" data-reveal>
                <p>
                  「新卒採用」「中途採用」「インターン」など、お気軽にエントリーください。
                  内容確認後、採用担当者よりご連絡差し上げます。
                </p>
                <p className="ent__note">
                  ※内容によってはご返信を控えさせていただく場合もございますので予めご了承くださいませ。
                </p>
              </div>

              <form className="ent__form" onSubmit={handleSubmit} noValidate data-reveal>
                <div className="ent__field">
                  <label htmlFor="entryType">
                    エントリーの種類 <span className="ent__required">必須</span>
                  </label>
                  <select
                    id="entryType"
                    value={values.entryType}
                    onChange={handleChange('entryType')}
                    onBlur={handleBlur('entryType')}
                  >
                    <option value="">選択してください</option>
                    {ENTRY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {fieldError('entryType') && <p className="ent__error">{fieldError('entryType')}</p>}
                </div>

                <div className="ent__field">
                  <label htmlFor="source">
                    当社を知ったきっかけ <span className="ent__required">必須</span>
                  </label>
                  <select
                    id="source"
                    value={values.source}
                    onChange={handleChange('source')}
                    onBlur={handleBlur('source')}
                  >
                    <option value="">選択してください</option>
                    {SOURCES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {fieldError('source') && <p className="ent__error">{fieldError('source')}</p>}
                </div>

                <div className="ent__field">
                  <label htmlFor="name">
                    お名前 <span className="ent__required">必須</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="例）愛信 太郎"
                    value={values.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  {fieldError('name') && <p className="ent__error">{fieldError('name')}</p>}
                </div>

                <div className="ent__field">
                  <label htmlFor="affiliation">
                    現在のご所属（学校名・会社名） <span className="ent__required">必須</span>
                  </label>
                  <input
                    id="affiliation"
                    type="text"
                    autoComplete="organization"
                    placeholder="例）〇〇大学 〇〇学部 / 株式会社〇〇"
                    value={values.affiliation}
                    onChange={handleChange('affiliation')}
                    onBlur={handleBlur('affiliation')}
                  />
                  {fieldError('affiliation') && (
                    <p className="ent__error">{fieldError('affiliation')}</p>
                  )}
                </div>

                <div className="ent__field">
                  <label htmlFor="phone">
                    電話番号 <span className="ent__required">必須</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="例）09012345678"
                    value={values.phone}
                    onChange={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                  />
                  {fieldError('phone') && <p className="ent__error">{fieldError('phone')}</p>}
                </div>

                <div className="ent__field">
                  <label htmlFor="email">
                    メールアドレス <span className="ent__required">必須</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="例）taro.aishin@example.com"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {fieldError('email') && <p className="ent__error">{fieldError('email')}</p>}
                </div>

                <div className="ent__field">
                  <label htmlFor="message">
                    志望動機・メッセージ <span className="ent__required">必須</span>
                  </label>
                  <textarea
                    id="message"
                    rows={7}
                    placeholder="志望動機やご質問など、自由にご記入ください"
                    value={values.message}
                    onChange={handleChange('message')}
                    onBlur={handleBlur('message')}
                  />
                  {fieldError('message') && <p className="ent__error">{fieldError('message')}</p>}
                </div>

                {/* 個人情報の取り扱い */}
                <div className="ent__privacy">
                  <h3>個人情報の取り扱いについて</h3>
                  <ol>
                    {PRIVACY_ITEMS.map((item) => (
                      <li key={item.slice(0, 10)}>{item}</li>
                    ))}
                  </ol>
                </div>

                <label className="ent__agree">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  個人情報の取り扱いに同意する
                </label>

                <button type="submit" className="ent__submit" disabled={!canSubmit}>
                  同意して送信する <span aria-hidden="true">→</span>
                </button>
                {!canSubmit && (
                  <p className="ent__submit-note">
                    全ての必須項目の入力と個人情報の取り扱いへの同意が必要です
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}
