import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEditorStore = defineStore('editor', () => {
    // 실행취소, 되돌리기
    
    // 임시저장
    const saveData = ref('');
    // 해상도
    const ratioData = ref([]);
    const selectedRatio = ref('');
    // 배경색
    const bgColor = ref('');
    const isShowBgColor = ref(false);
    // 이미지
    const imgSize = ref('row'); //row, col, all
    const imgPosition = ref('top'); // top, bottom, center
    const imgRepeat = ref(false);
    const imgDesignBlur = ref(false);
    const imgDesignCenter = ref('none'); // white, black, none
    // 폰트
    const font = ref([]);
    const selectedFont = ref('');
    const fontSize = ref('16');
    const selectedFontWeight = ref(''); // 폰트에 따라 상이
    const fontColor = ref('#000000');
    const fontBgColor = ref('');
    const fontBgColorOpacity = ref(''); // 0 ~ 100
    const isShowFontBgColor = ref(false);
    const fontItalic = ref(false);
    const fontUnderLine = ref(false);
    // 네모박스
    const addBox = ref(false);
    const boxColor = ref('#fff');
    const boxColorOpacity = ref('100'); // 0 ~ 100
    const boxWidth = ref('100');
    const boxHeight = ref('100');
    const boxRounding = ref('0');

    // 받아오는 것 (해상도)
    ratioData.value = [
      '일반pc (1920px x 1080px)',
      'ppt5/4 (1600px x 1200x)',
      '아이패드4:3 (2048px x 1536px)',
      '갤럭시탭16:10 (1920px x 1200px)',
      '모바일9:20 (1080px x 2400px)',
    ]
    // 받아오는 것 (폰트, 폰트에 따른 굵기)
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

    selectedFont.value = font.value[0].value;
    selectedFontWeight.value = font.value[0].weight[0];
    console.log(selectedFont.value)
    console.log(selectedFontWeight.value)
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
  }
})