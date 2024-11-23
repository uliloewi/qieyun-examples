/* 推導南京話
 *
 * https://zhuanlan.zhihu.com/p/391166351
 *
 * 國際音標綜合1993《南京方言志》、1993《南京方言詞典》、1929《南京音系》
 * 南京話拼音方案：https://zh.wikipedia.org/wiki/%E5%8D%97%E4%BA%AC%E8%A9%B1%E6%8B%89%E4%B8%81%E5%8C%96%E6%96%B9%E6%A1%88#%E8%BC%B8%E5%85%A5%E6%B3%95%E6%96%B9%E6%A1%88
 *
 * @author uliloewi
 */

/** @type { 音韻地位['屬於'] } */
const is = (x) => 音韻地位.屬於(x);
/** @type { 音韻地位['判斷'] } */
const when = (...x) => 音韻地位.判斷(...x);

if (!音韻地位) return [
  //['$legacy', true],
  ['標調方式', [1, '數字', '附標']],
  ['書寫系統', [1, '拼音方案', '國際音標']],
];

const 音標表 = {
  b: 'p', p: 'pʰ', m: 'm', f: 'f',
  d: 't', t: 'tʰ', l: 'l', n: 'n',
  g: 'k', k: 'kʰ', h: 'x',
  j: 'tɕ', q: 'tɕʰ', x: 'ɕ',
  z: 'ts', c: 'tsʰ', s: 's', r: 'ʐ',
  // 元音表 
  u: 'u', i: 'i',  o: 'o', ü: 'y', y: 'ɿ', e: 'e', a: 'a', ä: 'ɛ',
};

const 次序標調 = {
  '陰平': '¹',
  '陽平': '²',
  '上聲': '³',
  '去聲': '⁴',
  '入聲': '⁵',
};

const 附標標調 = {
  '陰平': '̄',
  '陽平': '́',
  '上聲': '̌',
  '去聲': '̀',
  '入聲': '̂',
};

const 調值標調 = {
  '陰平':'˧˩',
  '陽平':'˩˧',
  '上聲':'˨˩˨',
  '去聲':'˦˦',
  '入聲':'˥',
};

let 真韻 = '真';
let 殷韻 = '殷';
let 重紐 = '';
let 丙類 = 'C類';

if (window.location.href.includes('qieyun'))
{//舊版
  真韻 = '眞';
  殷韻 = '欣';
  重紐 = '重紐';
  丙類 = '東韻 三等 或 鍾微虞廢文元陽尤凡韻';
}

const 不顎化 = { // 見溪羣曉匣母不顎化條件
  一: true,
  二: '合口 或 庚耕韻',
  三: '(合口 祭微陽支脂凡廢韻 或 通攝) 舒聲',
  四: '合口 齊韻',
}[音韻地位.等];

const 南京型莊組變翹 = '宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等'

const 聲母規則 = () => when([
  ['幫母', [[丙類, 'f'], ['', 'b']]],
  ['滂母', [[丙類, 'f'], ['', 'p']]],
  ['並母', [[丙類, 'f'], ['平聲', 'p'], ['', 'b']]],
  ['明母', [['東尤韻', 'm'], [丙類, ''], ['', 'm']]],
  ['端母', 'd'],
  ['透母', 't'],
  ['定母', [['平聲', 't'], ['', 'd']]],
  ['泥來孃母', 'l'],
  ['精母', 'z'],
  ['清母', 'c'],
  ['從母', [['二等', 'ch'], ['平聲', 'c'], ['', 'z']]], // 平送氣仄不送氣
  ['心母', 's'],
  ['邪母', [['平聲 尤之陽鹽侵魚韻', 'c'], ['', 's']]],
  ['知母', [['麻韻 三等', 'd'], ['庚耕韻', 'z'], ['', 'zh']]], // 知組平翹律
  ['徹母', [['庚耕韻', 'c'], ['', 'ch']]], // 知組平翹律
  ['澄母', [['庚耕韻 平聲', 'c'], ['庚耕韻 ', 'z'], ['平聲', 'ch'], ['', 'zh']]], // 平送氣仄不送氣
  ['莊母', [[南京型莊組變翹, 'zh'], ['', 'z']]], // 莊組平翹律
  ['初母', [[南京型莊組變翹, 'ch'], ['', 'c']]], // 莊組平翹律
  ['崇母', [
    [南京型莊組變翹, [['平聲', 'ch'], ['', 'zh']]],
    ['之韻', 's'], 
    ['平聲', 'c'], 
    ['', 'z']
  ]],
  ['生母', [[南京型莊組變翹, 'sh'], ['', 's']]], // 莊組平翹律
  ['俟母', [['平聲', 'c'], ['', 's']]], // 平送氣仄不送氣
  ['章母', 'zh'],
  ['昌母', 'ch'],
  ['常母', [['曾攝 入聲', 'zh'], [真韻 + '齊侵清仙鹽陽尤魚虞蒸支鍾韻 平聲 或 一等', 'ch'], ['', 'sh']]],
  ['船書母', [['平聲 通攝 或 平聲 合口 山攝', 'ch'], ['', 'sh']]], // 章組擦音分化律
  ['日母', [['四等', 'l'], [真韻 + '侵韻 入聲 或 支之脂韻 開口', ''], ['', 'r']]],
  ['見母', [[不顎化, 'g'], ['', 'j']]],
  ['溪母', [[不顎化, 'k'], ['', 'q']]],
  ['羣母', [
    [重紐 + 'A類 宵韻', 'q'], 
    ['平聲 三等 合口 山陽脂韻','k'], 
    ['平聲','q'], [不顎化, 'g'], 
    ['', 'j']
  ]],
  ['疑母', [['之韻 上聲', 'l'], ['一二等', ''], ['尤蒸齊韻 平聲 或 先仙陽庚韻 入聲', 'l'], ['', '']]],
  ['曉母', [['三等 通攝', 'x'], [不顎化, 'h'], ['', 'x']]],
  ['匣母', [['開口 耕韻 舒聲', 'x'], [不顎化, 'h'], ['', 'x']]], 
  ['以母', [['合口 祭韻', 'r'], ['', '']]],
  ['影母', ''],
  ['云母', [['舒聲 通攝', 'x'], ['', '']]],
], '無聲母規則');

const 韻母規則 = () => when([
  // 通攝
  ['東鍾韻', [
    ['入聲', [['三等 見溪羣曉匣疑以影云母', 'ü'], ['', 'u']]], 
    ['', [['三等 疑以影母', 'iong'], ['幫組', 'en'], ['', 'ong']]]
  ]],

  ['冬韻', [['入聲', 'u'], ['幫組', 'en'], ['', 'ong']]],

  // 江攝
  ['江韻', [
    ['入聲', [['疑母', 'io'], ['', 'o']]], 
    ['徹澄崇初生知母', 'uang'], 
    ['疑母', 'iang'], 
    ['', 'ang']
  ]],

  // 止攝
  ['止攝', [
    [重紐 + 'B類 支韻 幫母 或 ' + 
      重紐 + 'B類 支韻 並母 上去聲 或 ' + 
      重紐 + 'B類 脂韻 並滂母 或 ' + 
      重紐 + 'B類 脂韻 幫母 平聲', 
      'ei'],
    ['日母 開口', 'er'],
    ['崇初從精清生俟邪心莊母 開口', 'y'],//南京型平翹
    ['昌常徹澄船書章知母 開口', 'r'],//南京型平翹
    ['莊組 合口', 'uä'],
    ['幫並滂母 非 微韻 或 開口 或 支韻 明母', 'i'],
    ['脂韻 明母 或 微韻 幫並滂母', 'ei'],
    ['', 'uei']
  ]],

  // 遇攝
  ['模韻', [['明母', 'o'], ['', 'u']]],
  ['魚虞韻', [['從見精來孃清羣溪曉邪心疑以影云母', 'ü'], ['', 'u']]],

  // 蟹攝
  ['齊韻', [['合口 或 常母', 'uei'], ['', 'i']]], 

  ['廢祭灰泰韻', [
    ['祭韻 明母 或 幫組 非 祭韻', 'ei'],
    ['祭韻 幫組', 'i'],
    ['合口', 'uei'],
    ['廢祭韻 開口', [
      ['章知組', 'r'], //南京型平翹
      ['莊組', 'y'], //南京型平翹
      ['', 'i']
    ]], 
    ['灰泰韻 開口 以母', 'iä'],
    ['', 'ä']
  ]],

  ['佳皆夬韻', [    
    ['幫組', 'ä'],
    ['開口', [['疑母', 'iä'], ['', 'ä']]],
    ['合口', [['佳韻 見溪匣曉影母', 'ua'], ['', 'uä']]]
  ]],

  ['咍韻', [['合口', 'uei'], ['以母', 'iä'], ['', 'ä']]],

  // 臻攝
  [殷韻 + 真韻 + '臻文韻', [
    ['入聲', [
      ['幫組', [['文韻', 'u'], ['', 'i']]], 
      ['開口', [['莊組', 'ä'], ['章組 或 知徹澄日母', 'r'], ['', 'i']]],
      ['合口', [['莊組', 'o'], ['知章組', 'u'], ['', 'ü']]]
    ]],
    ['舒聲', [
      ['幫組', [[真韻 + '韻', 'in'], ['明母', 'uen'], ['', 'en']]], 
      ['開口', [['莊章組 或 日知徹澄母', 'en'], ['', 'in']]],
      ['合口',[['明母', 'uen'], ['來日書章知昌常徹澄船母 合口', 'uen'], ['', 'üin']]]
    ]]
  ]], 

  ['魂痕韻', [
    ['入聲', [['幫組 或 開口', 'o'], ['', 'u']]],
    ['舒聲', [
      ['幫組', 'en'],
      ['開口', [['端組', 'uen'], ['', 'en']]],
      ['合口', 'uen']
    ]]
  ]],

  // 山攝
  ['元仙先韻 入聲', [
      ['幫組', [['仙先韻', 'ie'], ['明母', 'ua'], ['', 'a']]], 
      ['開口', [['日母 或 知莊章組', 'ä'], ['見溪羣曉匣母', 'e'], ['', 'ie']]],
      ['合口', [['日母 或 知莊章組', 'o'], ['', 'üe']]]
  ]], 

  ['先韻 舒聲', [
    ['開口 或 幫組', [['崇母', 'uang'], ['見溪羣曉匣母', 'än'], ['', 'iän']]],
    ['合口', 'üän']
  ]],
  
  ['元仙韻 舒聲',[
    ['開口', [['日知徹澄母 或 莊章組', 'ang'], ['見溪羣曉匣母', 'än'], ['', 'iän']]],
    ['合口', [['日來母 或 知莊章組', 'uang'], ['', 'üän']]],
    ['元韻', [['明母', 'uang'], ['', 'ang']]],
    ['仙韻', 'iän']
  ]],
  
  ['刪山韻', [
    ['入聲', [['合口', 'ua'], ['疑影母', 'ia'], ['', 'a']]],
    ['舒聲', [
      ['幫組', 'ang'], 
      ['開口', [['影疑母', 'iän'], ['見溪羣曉匣母', 'än'], ['', 'ang']]],
      ['合口','uang']
    ]]
  ]], 

  ['寒韻', [
    ['入聲', [
      ['幫組','o'], 
      ['開口', [['見溪羣曉匣疑影母', 'o'], ['', 'a']]],
      ['合口', [['見組', 'uä'], ['', 'o']]]
    ]],
    ['舒聲', [['開口 或 幫組', 'ang'], ['', 'uang']]]
  ]], 

  // 效攝
  ['蕭宵韻', [['見溪羣曉匣日母 或 知章組', 'ao'], ['', 'iao']]],
  ['肴韻', [['疑母', 'iao'], ['', 'ao']]],
  ['豪韻', 'ao'],

  // 果攝
  ['歌韻', [['一等', 'o'], ['開口', 'e'], ['', 'üe']]],

  // 假攝
  ['麻韻', [
    ['二等', [['合口', 'ua'], ['疑影母', 'ia'], ['', 'a']]],
    ['三等', [['日母 或 章組', 'e'], ['', 'ie']]],
    ['四等', 'ie']
  ]],

  // 宕攝
  ['陽韻 入聲', [['心疑以影云來孃母 或 精組', 'io'], ['', 'o']]],
  ['唐韻 入聲', [['合口 見組', 'uä'], ['', 'o']]],

  ['宕攝 舒聲', [
    ['合口','uang'],
    ['陽韻', [['明母 或 莊組','uang'], ['來孃疑以影母 或 精組', 'iang'], ['','ang']]],
    ['','ang']
  ]], 

  // 梗攝
  ['庚韻 入聲', [
    ['二等',[['合口', 'uä'], ['', 'ä']]],
    ['三等', [['莊組', 'ä'], ['合口', 'ü'], ['', 'i']]]
  ]],

  ['庚韻 舒聲', [
    ['二等', [['合口', 'ong'], ['', 'en']]],
    ['三等', [
      ['幫組', 'in'], 
      ['開口', [['知莊章組', 'en'], ['', 'in']]], 
      ['合口', [['心以影母', 'in'], ['云影母', 'iong'], ['', 'ong']]]
    ]]
  ]],
  
  ['清青韻 入聲', [
    ['幫組', 'i'],
    ['開口', [['莊組', 'y'], ['知章組', 'r'], ['', 'i']]],
    ['合口', 'ü'],
  ]],

  ['清青韻 舒聲', [
    ['幫組', 'in'],
    ['開口', [['知莊章組', 'en'], ['', 'in']]],
    ['合口', [['心以影母', 'in'], ['云影母', 'iong'], ['', 'ong']]]
  ]],

  ['耕韻', [
    ['入聲', [['幫組 或 開口','ä'], ['合口','uä']]],
    ['舒聲', [
      ['幫組', 'en'], 
      ['開口', [['匣影母', 'in'], ['', 'en']]],
      ['合口', 'ong']
    ]]
  ]], 

  // 曾攝
  ['蒸韻', [
    ['入聲', [
      ['幫組', 'i'], 
      ['開口', [['莊組', 'ä'], ['知徹澄母 或 章組', 'r'], ['', 'i']]],
      ['合口', 'ü']
    ]],
    ['舒聲', [
      ['幫組', 'in'], 
      ['開口', [['見組 或 來曉以影母', 'in'], ['', 'en']]],
      ['合口', 'ong']
    ]]
  ]], 

  ['登韻', [
    ['入聲', [['幫組 或 開口', 'ä'], ['合口', 'uä']]],
    ['舒聲', [['幫組 或 開口', 'en'], ['合口', 'ong']]]
  ]],

  // 流攝
  ['幽韻', [['幫滂並母', 'iao'], ['見溪羣曉生母', 'ou'], ['', 'iou']]],
  ['尤韻', [['幫滂並母', 'u'], ['精組 或 疑以影云孃來母', 'iou'], ['', 'ou']]],
  ['侯韻', 'ou'],

  // 深攝
  ['侵韻', [
    ['入聲', [['莊組', 'ä'], ['章組 或 日知徹澄母', 'r'], ['', 'i']]],
    ['舒聲', [['章莊組 或 日知徹澄母', 'en'], ['', 'in']]]
  ]],

  // 咸攝
  ['添韻', [
    ['入聲', [['見溪羣曉匣母', 'e'], ['', 'ie']]],
    ['舒聲', [['見溪羣曉匣母', 'än'], ['', 'iän']]]
  ]],

  ['鹽嚴凡韻', [
    ['入聲', [
      ['幫組', 'a'],
      ['開口', [['莊章組 或 日知徹澄母', 'ä'], ['見溪羣曉匣母', 'e'], ['', 'ie']]],
      ['合口', [['徹孃母', 'ua'], ['', 'a']]]
    ]],
    ['舒聲', [
      ['幫組', [['鹽韻', 'iän'], ['明母', 'uang'], ['', 'ang']]],
      ['開口', [['日知徹澄母 或 莊章組', 'ang'], ['見溪羣曉匣母', 'än'], ['', 'iän']]],
      ['合口', 'uang']
    ]]
  ]],

  ['咸銜韻', [
    ['入聲', [['疑影母', 'ia'], ['', 'a']]],
    ['舒聲', [['來影疑母', 'iän'], ['見溪羣曉匣母', 'än'], ['', 'ang']]]
  ]],

  ['覃談韻', [
    ['入聲', [['見組 或 匣曉影母', 'o'], ['', 'a']]],
    ['舒聲', [['開口 或 幫組', 'ang'], ['', 'uang']]]
  ]],
], '無韻母規則');

const 聲調規則 = () => when([
  ['平聲', [['清音', '陰平'], ['濁音', '陽平']]],
  ['全濁 上聲', '去聲'],
  ['', `${音韻地位.聲}聲`],
], '無聲調規則');

const 聲母 = 聲母規則();
const 韻母 = 韻母規則();
const 聲調 = 聲調規則();

function 字母轉音標(s) {
  var res = "";
  for (var i = 0; i < s.length; i++) {
      res += 音標表[s.charAt(i)];
  }
  res = res.replace('ao','ɔ').replace('ou','əɯ').replace('eʐ','ɚ').replace('en','ən')
  .replace('ei','əi').replace('nk','ŋ').replace('tsx','ʈʂ').replace('tsʰx','tʂʰ').replace('sx','ʂ');
  return res.endsWith('ʐ') ? res.replace('ʐ', 'ʅ'): res;
};

if (選項.書寫系統 !== '國際音標') {
  if (選項.標調方式 === '數字') return 聲母 + 韻母 + 次序標調[聲調];
  return 聲母 + (聲調 ? 韻母.replace(/.*[aä]|.*[eo]|.*[iuüyr]/, '$&' + 附標標調[聲調]) : 韻母);
} else {
   return 字母轉音標(聲母 + 韻母) + 調值標調[聲調];
}
