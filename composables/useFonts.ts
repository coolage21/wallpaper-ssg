import { ref } from 'vue'

export const useFonts = () => {
  const fonts = ref([
    { label: '프리텐다드체', value: 'Pretendard', weight: [ 300, 400, 500, 600, 700 ] },
    { label: '마루부리체', value: 'MaruBuri', weight: [300, 400, 500, 700] },
    { label: '대구북성로체', value: 'DeaguBukseongro', weight: [300, 800] },
    { label: '조선천년체', value: 'ChosunCentennial', weight: [400] },
  ])
  const selectedFont = ref('Pretendard')

  return { fonts, selectedFont }
}