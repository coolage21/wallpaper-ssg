export const useBible = () => {
  const fetchVerse = async (passage: string, version: 'web' | 'kjv') => {
    const data = await fetch(
      `https://bible-api.com/${passage}?translation=${version}`
    ).then(res => res.json())
    return {
      text: data.verses.map(v => v.text.trim()).join(''),
      reference: data.reference,
      // data
    }
  }

const bibleList = ref()

bibleList.value = [ {
  'version': '구약',
  'list': [
  { label: '창세기', value: 'Gen' },
  { label: '출애굽기', value: 'Exod' },
  { label: '레위기', value: 'Lev' },
  { label: '민수기', value: 'Num' },
  { label: '신명기', value: 'Deut' },
  { label: '여호수아', value: 'Josh' },
  { label: '사사기', value: 'Judg' },
  { label: '룻기', value: 'Ruth' },
  { label: '사무엘상', value: '1Sam' },
  { label: '사무엘하', value: '2Sam' },
  { label: '열왕기상', value: '1Kgs' },
  { label: '열왕기하', value: '2Kgs' },
  { label: '역대상', value: '1Chr' },
  { label: '역대하', value: '2Chr' },
  { label: '에스라', value: 'Ezra' },
  { label: '느헤미야', value: 'Neh' },
  { label: '에스더', value: 'Esth' },
  { label: '욥기', value: 'Job' },
  { label: '시편', value: 'Ps' },
  { label: '잠언', value: 'Prov' },
  { label: '전도서', value: 'Eccl' },
  { label: '아가', value: 'Song' },
  { label: '이사야', value: 'Isa' },
  { label: '예레미야', value: 'Jer' },
  { label: '예레미야애가', value: 'Lam' },
  { label: '에스겔', value: 'Ezek' },
  { label: '다니엘', value: 'Dan' },
  { label: '호세아', value: 'Hos' },
  { label: '요엘', value: 'Joel' },
  { label: '아모스', value: 'Amos' },
  { label: '오바댜', value: 'Obad' },
  { label: '요나', value: 'Jonah' },
  { label: '미가', value: 'Mic' },
  { label: '나훔', value: 'Nah' },
  { label: '하박국', value: 'Hab' },
  { label: '스바냐', value: 'Zeph' },
  { label: '학개', value: 'Hag' },
  { label: '스가랴', value: 'Zech' },
  { label: '말라기', value: 'Mal' },
  ]},
  {
  'version': '신약',
  'list': [
     { label: '마태복음', value: 'Matt' },
  { label: '마가복음', value: 'Mark' },
  { label: '누가복음', value: 'Luke' },
  { label: '요한복음', value: 'John' },
  { label: '사도행전', value: 'Acts' },
  { label: '로마서', value: 'Rom' },
  { label: '고린도전서', value: '1Cor' },
  { label: '고린도후서', value: '2Cor' },
  { label: '갈라디아서', value: 'Gal' },
  { label: '에베소서', value: 'Eph' },
  { label: '빌립보서', value: 'Phil' },
  { label: '골로새서', value: 'Col' },
  { label: '데살로니가전서', value: '1Thess' },
  { label: '데살로니가후서', value: '2Thess' },
  { label: '디모데전서', value: '1Tim' },
  { label: '디모데후서', value: '2Tim' },
  { label: '디도서', value: 'Titus' },
  { label: '빌레몬서', value: 'Phlm' },
  { label: '히브리서', value: 'Heb' },
  { label: '야고보서', value: 'Jas' },
  { label: '베드로전서', value: '1Pet' },
  { label: '베드로후서', value: '2Pet' },
  { label: '요한일서', value: '1John' },
  { label: '요한이서', value: '2John' },
  { label: '요한삼서', value: '3John' },
  { label: '유다서', value: 'Jude' },
  { label: '요한계시록', value: 'Rev' },
  ]}
]


  return { fetchVerse, bibleList }
}