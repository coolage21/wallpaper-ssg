import { defineStore } from 'pinia'
import { ref } from 'vue'

// redo undo
const MAX_HISTORY = 20

interface HistoryAction {
  type: string
  before: Record<string, any>
  after: Record<string, any>
}

// 데이터
export const useEditorStore = defineStore('editor', () => {
  // 실행취소, 되돌리기
  // Undo / Redo
  const past = ref<HistoryAction[]>([]) // before, after가 있는 배열
  const future = ref<HistoryAction[]>([]) // before, after가 있는 배열
  const isRestoring = ref(false)
    // 임시저장
    const saveData = ref('');
    // 해상도
    const ratioData = ref([]);
    const selectedRatio = ref('');
    // 배경색
    const bgColor = ref('#ffffff');
    const isShowBgColor = ref(false);
    // 이미지
    const imgSize = ref('row'); //row, col, all
    const imgPosition = ref('top'); // top, bottom, center
    const imgRepeat = ref(false);
    const imgDesignBlur = ref(false);
    const imgDesignCenter = ref('none'); // white, black, none
    const landscape = ref(true);
    // 폰트
    const font = ref([]);
    const selectedFont = ref('');
    const fontSize = ref('16');
    const selectedFontWeight = ref(''); // 폰트에 따라 상이
    const fontColor = ref('#000000');
    const fontBgColor = ref('#ffffff');
    const fontBgColorOpacity = ref('100'); // 0 ~ 100
    const isShowFontBgColor = ref(false);
    const fontItalic = ref(false);
    const fontUnderLine = ref(false);
    // 네모박스
    const addBox = ref(false);
    const boxColor = ref('#ffffff');
    const boxColorOpacity = ref('100'); // 0 ~ 100
    const boxWidth = ref('800');
    const boxHeight = ref('400');
    const boxRounding = ref('0');

    // 해상도 데이터
    ratioData.value = [
      '일반pc (1920px x 1080px)',
      'ppt5/4 (1600px x 1200x)',
      '아이패드4:3 (2048px x 1536px)',
      '갤럭시탭16:10 (1920px x 1200px)',
      '모바일9:20 (1080px x 2400px)',
    ]
    // 선택된 해상도
    selectedRatio.value = ratioData.value[0]

    // 폰트 데이터
    font.value = [
    { label: '프리텐다드체', value: 'Pretendard', weight: [
      { value: 300, label: 'Light' },  { value: 400, label: 'Regular' }, { value: 500, label: 'Medium' }, { value: 700, label: 'Semi Bold' },   { value: 700, label: 'Bold' }, ] },
    { label: '마루부리체', value: 'MaruBuri', weight: [  { value: 300, label: 'Light' },
      { value: 400, label: 'Regular' },
      { value: 500, label: 'Medium' },
      { value: 700, label: 'Bold' },] },
    { label: '대구북성로체', value: 'DeaguBukseongro', weight: [  { value: 300, label: 'Light' },
      { value: 800, label: 'ExtraBold' },] },
    { label: '조선천년체', value: 'ChosunCentennial', weight: [{ value: 400, label: 'Regular' },] },
    ]

    // 선택된 폰트
    selectedFont.value = font.value[0].value;
    // 선택된 폰트 굵기
    selectedFontWeight.value = font.value[0].weight[0];

    // 이미지 url
    const imgUrl = ref('');
    // 텍스트
    const quoteData = ref([]);
    // 보여줄 영역 설정을 위한 변수
    const isShowEditorCanvas = ref(false);
    const currentSearchImgSection = ref(0);

  // ========================
  // undo (실행취소, 다시실행)
  // ========================
  const storeRefs: Record<string, any> = {
    selectedRatio,
    // 배경
    bgColor,
    isShowBgColor,
    // 이미지
    imgSize,
    imgPosition,
    imgRepeat,
    imgDesignBlur,
    imgDesignCenter,
    // 폰트
    selectedFont,
    fontSize,
    selectedFontWeight,
    fontColor,
    fontBgColor,
    fontBgColorOpacity,
    isShowFontBgColor,
    fontItalic,
    fontUnderLine,
    // 네모박스
    addBox,
    boxColor,
    boxColorOpacity,
    boxWidth,
    boxHeight,
    boxRounding,
    // 데이터
    imgUrl,
    quoteData,
    // 보여줄 영역 설정을 위한 변수
    isShowEditorCanvas,
    currentSearchImgSection
  }

  const apply = (payload: Record<string, any>) => {
    Object.keys(payload).forEach((key) => {
      if (storeRefs[key]) {
        storeRefs[key].value = payload[key]
      }
    })
  }

  const commit = (action: HistoryAction) => {
    if (isRestoring.value) return   // 🔴 핵심!!!

    apply(action.after) // 값 적용

    past.value.push(action) // past에 저장
    if (past.value.length > MAX_HISTORY) past.value.shift() // 20개가 넘어가면 삭제

    future.value = [] // 새로운게 작업 시작되면 다시실행될것은 없어져야함
  }

  const undo = () => {
    const action = past.value.pop()
    if (!action) return
    if(action.before.imgUrl != 'undefined'){
      if(action.before.imgUrl == ''){
        currentSearchImgSection.value = 0;
        isShowEditorCanvas.value = false;
      } 
    };

    isRestoring.value = true
    try {
      apply(action.before)
    } finally {
      isRestoring.value = false
    }
    future.value.unshift(action)
  }

  const redo = () => {
    const action = future.value.shift()
    if (!action) return
    // 다시실행시 이미지가 없다가 있게되는 경우에 에디터캔버스 컴포넌트 보이도록 처리
    if(action.before.imgUrl != 'undefined'){
      if(action.before.imgUrl == ''){
        // currentSearchImgSection.value = 1;
        isShowEditorCanvas.value = true;
      } 
    }
    isRestoring.value = true
    try {
      apply(action.after)
    } finally {
      isRestoring.value = false
    }
    past.value.push(action)
  }

  const commitField = <K extends keyof typeof storeRefs>(
    key: K,
    newValue: typeof storeRefs[K]['value'],
    type?: string
  ) => {
    if (isRestoring.value) return
    const oldValue = storeRefs[key].value
    if (oldValue === newValue) return

    commit({
      type: type || String(key),
      before: { [key]: oldValue },
      after: { [key]: newValue }
    })
  }

  // ========================
  // snapshot (임시저장용)
  // ========================

  const getSnapshot = (): EditorSnapshot => ({
    selectedRatio: selectedRatio.value,

    bgColor: bgColor.value,
    isShowBgColor: isShowBgColor.value,

    imgSize: imgSize.value,
    imgPosition: imgPosition.value,
    imgRepeat: imgRepeat.value,
    imgDesignBlur: imgDesignBlur.value,
    imgDesignCenter: imgDesignCenter.value,

    selectedFont: selectedFont.value,
    fontSize: fontSize.value,
    selectedFontWeight: selectedFontWeight.value,
    fontColor: fontColor.value,
    fontBgColor: fontBgColor.value,
    fontBgColorOpacity: fontBgColorOpacity.value,
    isShowFontBgColor: isShowFontBgColor.value,
    fontItalic: fontItalic.value,
    fontUnderLine: fontUnderLine.value,

    addBox: addBox.value,
    boxColor: boxColor.value,
    boxColorOpacity: boxColorOpacity.value,
    boxWidth: boxWidth.value,
    boxHeight: boxHeight.value,
    boxRounding: boxRounding.value,

    imgUrl: imgUrl.value,
    quoteData: quoteData.value,
    isShowEditorCanvas: isShowEditorCanvas.value,
    currentSearchImgSection: currentSearchImgSection.value,
  })

  const restoreSnapshot = (snapshot: EditorSnapshot) => {
    isRestoring.value = true
    try {
      apply(snapshot);
      past.value = []
      future.value = [] 
    } finally {
      isRestoring.value = false
    }
  }
  // ========================
  // draft persistence
  // ========================

  const saveDraft = () => {
    localStorage.setItem(
      'editor:draft',
      JSON.stringify({
        ...getSnapshot(),
        images: [] // ❌ 이미지 제거
      })
    )
  }

  const loadDraft = () => {
    const raw = localStorage.getItem('editor:draft');
    restoreSnapshot(JSON.parse(raw))
  }

  return {
    saveData, // 임시저장
    ratioData, // 해상도
    selectedRatio,
    // 배경
    bgColor,
    isShowBgColor,
    // 이미지
    imgSize,
    imgPosition,
    imgRepeat,
    imgDesignBlur,
    imgDesignCenter,
    landscape,
    // 폰트
    font,
    selectedFont,
    fontSize,
    selectedFontWeight,
    fontColor,
    fontBgColor,
    fontBgColorOpacity,
    isShowFontBgColor,
    fontItalic,
    fontUnderLine,
    // 네모박스
    addBox,
    boxColor,
    boxColorOpacity,
    boxWidth,
    boxHeight,
    boxRounding,
    // 데이터
    imgUrl,
    quoteData,
    // redo, undo
    commit,
    commitField,
    undo,
    redo,
    past,
    future,
    isRestoring,
    // snapshot
    getSnapshot,
    restoreSnapshot,
    // draft
    saveDraft,
    loadDraft,
    //
    isShowEditorCanvas,
    currentSearchImgSection
  }
  
})

// 임시저장용 데이터
export interface EditorSnapshot {
  selectedRatio: string
  bgColor: string
  isShowBgColor: boolean

  imgSize: string
  imgPosition: string
  imgRepeat: boolean
  imgDesignBlur: boolean
  imgDesignCenter: string

  selectedFont: string
  fontSize: string
  selectedFontWeight: any
  fontColor: string
  fontBgColor: string
  fontBgColorOpacity: string
  isShowFontBgColor: boolean
  fontItalic: boolean
  fontUnderLine: boolean

  addBox: boolean
  boxColor: string
  boxColorOpacity: string
  boxWidth: string
  boxHeight: string
  boxRounding: string

  imgUrl: string
  quoteData: any[]
  
  isShowEditorCanvas:boolean
  currentSearchImgSection:string
}