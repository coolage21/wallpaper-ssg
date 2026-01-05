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
    const font = ref('');
    const fontSize = ref('');
    const fontWeight = ref(''); // 폰트에 따라 상이
    const fontColor = ref('');
    const fontBgColor = ref('');
    const fontBgColorOpacity = ref(''); // 0 ~ 100
    const isShowFontBgColor = ref(false);
    const fontItalic = ref(false);
    const fontUnderLine = ref(false);
    // 네모박스
    const addBox = ref(false);
    const boxColor = ref('');
    const boxColorOpacity = ref(''); // 0 ~ 100
    const boxWidth = ref('');
    const boxHeight = ref('');
    const boxRounding = ref('');

    // 받아오는 것 (해상도)
    ratioData.value = [
      '일반pc (1920px x 1080px)',
      'ppt4:5 (1600px x 1200x)',
      '아이패드4:3 (2048px x 1536px)',
      '갤럭시탭16:10 (1920px x 1200px)',
      '모바일9:20 (1080px x 2400)',
    ]
    // 받아오는 것 (폰트, 폰트에 따른 굵기)
    selectedRatio.value = ratioData.value[0]

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
    fontSize,
    fontWeight,
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