/* 推導盛中唐擬音
 *
 * 《“平水韻”擬音》
 * https://zhuanlan.zhihu.com/p/681190661
 * https://www.bilibili.com/read/cv37390491/
 *
 * 《中唐音系韻基和聲類》
 * https://www.zhihu.com/pin/1725177872707268608
 *
 * @author unt
 */

/** @type { 音韻地位['屬於'] } */
const is = (...x) => 音韻地位.屬於(...x);
/** @type { 音韻地位['判斷'] } */
const when = (...x) => 音韻地位.判斷(...x);

const is盛唐 = 選項.預置風格?.includes('盛唐') ?? false;
const is慧琳 = 選項.預置風格?.includes('慧琳') ?? false;
const 預置風格changed = 選項._last預置風格 && 選項._last預置風格 !== 選項.預置風格;

const 非組字典 = {
  'f': { 幫: 'f', 滂: 'fʰ', 並: 'v', 明: 'ɱ' },
  'pf': { 幫: 'pf', 滂: 'pfʰ', 並: 'bv', 明: 'ɱ' },
};

function get選單(音類列表, 音標列表s, 音類音標連接符 = ' ', 音類連接符 = ' | ') {
  return 音標列表s.map(音標列表 => ({
    value: 音標列表.join(','),
    text: 音標列表.map((音標, i) => 音類列表[i] + 音類音標連接符 + 音標).join(音類連接符),
  }));
}

if (!音韻地位) return [
  '聲',
  ['非組', [1, ...Object.keys(非組字典)]],
  ['A4合併|三 A 與四等合併', !is盛唐, { reset: 預置風格changed }],
  ['常船合併崇俟合併|常船合併、崇俟合併\n常 dʑ 船 ʑ 合併作擦音 ʑ\n崇 dʐ 俟 ʐ 合併作塞擦音 dʐ', is慧琳, { reset: 預置風格changed }],
  ['等類記法|\n特別地，非組和莊章組後總是不寫等類標記', [1, ...get選單(
    選項.A4合併 ?? true ?
      ['四', '三', '一二'] :
      ['三A', '三BC', '一二四'],
    [['j', 'ɣ', ''], ['ʲ', 'ˠ', ''], ['ʲ', 'ˠ', 'ˤ'], ['ʲ', '', 'ˤ']],
    ' C',
  )], { hidden: !選項.顯示更多選項 }],
  ['見組小舌音簡寫作軟腭音', false, { hidden: !選項.顯示更多選項 }],

  '韻',
  ['低元音', [2, ...get選單(['前', '後'], [['æ', 'a'], ['æ', 'ɑ'], ['a', 'ɑ']])]],
  ['後高元音' + (選項.BC合併 === false ? '|\n微韻除外' : ''), [1, ...get選單(['閉音節', '魚韻'], [['ɨ', 'ɨ'], ['ə', 'ɨ'], ['ə', 'ɯ']])]],
  ['東一冬合併', !is盛唐, { reset: 預置風格changed }],
  ['支脂合併', !is盛唐, { reset: 預置風格changed }],
  ['咍泰合併', !is盛唐, { reset: 預置風格changed }],
  ['BC合併|同攝 BC 韻合併\n中元音 e、ə 合併作 ɛ', !is盛唐, { reset: 預置風格changed }],
  ['輕脣東鍾合併', !is盛唐, { reset: 預置風格changed }],
  ['部分蟹攝二等入假攝', true],
  ['部分流攝脣音入遇攝', true],
  ['覃談合併', true, { hidden: !選項.顯示更多選項, reset: 預置風格changed }],
  ['幽韻一律歸四等', false, { hidden: !選項.顯示更多選項, reset: 預置風格changed }],
  ['完全莊三化二', false, { hidden: !選項.顯示更多選項, reset: 預置風格changed }],

  '調',
  ['聲調', [2, '五度符號', '附加符號', '調類數字']],
  ['全濁上歸去', false, { hidden: !選項.顯示更多選項, reset: 預置風格changed }],

  '',
  ['預置風格|載入預置風格', [2,
    '盛唐：平水韻',
    '中唐：韻圖',
    '中唐：慧琳反切',
  ]],
  ['_last預置風格', [1, 選項.預置風格 ?? '中唐：韻圖'], { hidden: true }],
  ['顯示更多選項', false],
];

function 調整音韻地位() {
  function 調整(表達式, 調整屬性, 字頭串 = null) {
    if (typeof (字頭串) === 'string' && !字頭串.includes(字頭)) return;
    if (is(表達式)) 音韻地位 = 音韻地位.調整(調整屬性);
  }

  // 輕唇化例外
  調整('明母 尤韻', { 等: '一', 類: null, 韻: '侯' });
  調整('明母 東韻', { 等: '一', 類: null });

  if (is`云母 通攝 舒聲`) 音韻地位 = 音韻地位.調整('匣母', ['匣母三等']); // 雄熊

  // [慧琳反切體現的, 唐代用韻體現的, 據今音推測的]
  const 蟹攝二等入假攝字 = ['崖咼(呙)扠涯搋派差絓畫(画)罣罷(罢)', '佳鼃娃解釵(钗)卦柴', '哇洼蛙灑蝸話(话)掛挂查叉杈衩'].join('');
  const 流攝脣音入遇攝字 = ['浮戊母罦罘蜉矛茂覆懋拇某負(负)阜', '謀(谋)部畝(亩)畮婦(妇)不否桴富牟缶', '復複(复)副牡'].join('');
  if (選項.部分蟹攝二等入假攝) 調整('蟹攝 二等', { 韻: '麻' }, 蟹攝二等入假攝字);
  if (選項.部分流攝脣音入遇攝) 調整('幫組 尤侯韻', { 韻: is`尤韻` ? '虞' : '模' }, 流攝脣音入遇攝字);
}

調整音韻地位();

const 韻圖等 = when([
  // 切韻一二四等到韻圖不變
  ['非 三等', 音韻地位.等],

  [選項.幽韻一律歸四等 && '幽韻', '四'],

  // 切韻三等，聲母是銳音的情況
  ['莊組', 選項.完全莊三化二 ? '二' : '三'],
  ['知章組 或 來日母', '三'],
  ['精組 止攝 開口', '一'], // 實際上無用，因爲 i 前的 j 本身就會被省略
  ['端精組 或 以母', '四'],

  // 切韻三等，聲母是鈍音的情況
  ['A類', '四'],
  ['', '三'],
]);

function get聲母() {
  return when([
    ['幫組 C類', 非組字典[選項.非組][音韻地位.母]],
    [選項.常船合併崇俟合併 && '俟母', 'dʐ'],
    [選項.常船合併崇俟合併 && '常母', 'ʑ'],
    [!選項.見組小舌音簡寫作軟腭音 && `見溪疑曉匣母 一二${選項.A4合併 ? '' : '四'}等`, {
      見: 'q', 溪: 'qʰ', 疑: 'ɴ', 曉: 'χ', 匣: 'ʁ',
    }[音韻地位.母]],
    [選項.等類記法.includes('ɣ') && '匣母', 'ʁ'], // 爲了避免和介音衝突，匣母一律寫 ʁ
    ['', {
      幫: 'p', 滂: 'pʰ', 並: 'b', 明: 'm',
      端: 't', 透: 'tʰ', 定: 'd', 泥: 'n', 來: 'l',
      知: 'ʈ', 徹: 'ʈʰ', 澄: 'ɖ', 孃: 'ɳ',
      精: 'ts', 清: 'tsʰ', 從: 'dz', 心: 's', 邪: 'z',
      莊: 'tʂ', 初: 'tʂʰ', 崇: 'dʐ', 生: 'ʂ', 俟: 'ʐ',
      章: 'tɕ', 昌: 'tɕʰ', 常: 'dʑ', 書: 'ɕ', 船: 'ʑ', 日: 'ɲ', 以: 'j',
      見: 'k', 溪: 'kʰ', 羣: 'ɡ', 疑: 'ŋ',
      影: 'ʔ', 曉: 'x', 匣: 'ɣ', 云: '',
    }[音韻地位.母]],
  ]);
}

function get等類記法() {
  let 等類記法 = 選項.等類記法.split(',');
  return when([
    ['幫組 C類', ''],
    ['莊章組 或 日以母', ''],
    [!選項.A4合併 && '四等', ''],
    [韻圖等 === '四', 等類記法[0]],
    [韻圖等 === '三', 等類記法[1]],
    ['', 等類記法[2]],
  ]);
}

function get合口介音() {
  return is`合口 或 幫組 咍泰魂韻` ? 'w' : '';
}

function get韻基() {
  const 韻基字典 = {
    // 攝: [四 三C 二 一的元音, 韻尾]
    '止': ['iɨii', 'j'], '流': ['ɨɨɨɨ', 'w'], '遇': ['ɨɨɨɨ', ''],
    '蟹': ['eəæɑ', 'j'], '效': ['eəæɑ', 'w'], '假': ['æɑæɑ', ''], '果': ['æɑæɑ', ''],
    '臻': ['iɨiɨ', 'n'], '深': ['iɨiɨ', 'm'], '曾': ['ɨɨɨɨ', 'ŋ'], '通': ['ɨɨɨɨ', 'wŋ'],
    '山': ['eəæɑ', 'n'], '咸': ['eəæɑ', 'm'], '梗': ['ææææ', 'ŋ'], '江': ['ææææ', 'wŋ'], '宕': ['ɑɑɑɑ', 'ŋ'],
  };
  const index = {
    '四': 0,
    '三': !選項.BC合併 && is`C類 非 之韻` || is`果攝` ? 1 : 0,
    '二': 2,
    '一': 3,
  }[韻圖等];
  let 韻基 = 韻基字典[音韻地位.攝][0][index] + 韻基字典[音韻地位.攝][1];
  韻基 = when([
    // 超出攝的韻基的處理
    [!選項.覃談合併 && '覃韻', 'əm'],
    ['鍾韻', 'uŋ'], // 即 /wɨwŋ/
    [!選項.東一冬合併 && '冬韻', 'uŋ'],
    [選項.輕脣東鍾合併 && '通攝 幫組 C類', 'uŋ'],
    ['支韻', 'i'],
    [選項.支脂合併 && '止攝', 韻基.replace('ij', 'i')],
    [!選項.咍泰合併 && '咍灰韻', 'əj'],
    ['青韻', 'eŋ'],
    [選項.A4合併 && '梗攝', 'eŋ'],
    [選項.BC合併 && '臻攝 (C類 非 開口 或 B類 合口)', 'un'],
    [!選項.BC合併 && '臻攝 一等', 'ən'],
    ['止遇攝 非 開口 或 文韻', 韻基.replace('ɨ', 'u')],
    ['', 韻基],
  ]);
  韻基 = 韻基.replace(/ɨ(?=$|[^j])/, 選項.後高元音.split(',')[+is`魚韻`]); // 微韻被排除
  if (選項.BC合併) 韻基 = 韻基.replace('e', 'ɛ');
  韻基 = 韻基.replace('æ', 選項.低元音.split(',')[0]);
  韻基 = 韻基.replace('ɑ', 選項.低元音.split(',')[1]);
  if (is`入聲`) [...'mnŋɴ'].forEach((v, i) => { 韻基 = 韻基.replace(v, 'ptkq'[i]); });
  return 韻基;
}

function get聲調() {
  const is陰 = is`全清 或 次清 或 次濁 上入聲`;
  return {
    五度符號: is陰 ?
      { 平: '˦˨', 上: '˦˥', 去: '˧˨˦', 入: '˦' } :
      { 平: '˨˩', 上: '˨˦', 去: '˨˨˦', 入: '˨' },
    附加符號: { 平: '̀', 上: '́', 去: '̌', 入: '' },
    調類數字: { 平: '¹', 上: '²', 去: '³', 入: '⁴' },
  }[選項.聲調][選項.全濁上歸去 && is`全濁 上聲` ? '去' : 音韻地位.聲];
}

function get音節() {
  const 音節 = {
    聲母: get聲母(),
    介音: get合口介音(),
    韻基: get韻基(),
    聲調: get聲調(),
  };
  if (選項.等類記法.includes('j')) { // 視作介音
    音節.介音 = get等類記法() + 音節.介音;
  } else { // 視作聲母的一部分
    音節.聲母 += get等類記法();
    音節.聲母 = 音節.聲母.replace(/ʰ([ʲˠˤ])/, '$1ʰ');
    if (!選項.見組小舌音簡寫作軟腭音 && is`見組 或 曉匣母`) 音節.聲母 = 音節.聲母.replace('ˤ', '');
    if (音節.聲母 === 'ɣˠ') 音節.聲母 = 'ɣ';
    if (音節.聲母 === 'ˠ') 音節.聲母 = 音節.介音 ? '' : 'ɰ';
  }
  if (音節.韻基[0] === 'u') 音節.介音 = 音節.介音.replace('w', '');
  if (音節.韻基[0] === 'i') 音節.介音 = 音節.介音.replace('j', '');
  音節.韻母 = 音節.介音 + 音節.韻基;
  音節.帶調韻母 = 選項.聲調 === '附加符號' ?
    音節.介音 + 音節.韻基[0] + 音節.聲調 + 音節.韻基.slice(1) :
    音節.韻母 + 音節.聲調;
  return 音節;
}

const 音節 = get音節();
return 音節.聲母 + 音節.帶調韻母;
