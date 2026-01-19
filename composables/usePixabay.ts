export const usePixabay = () => {
  const fetchImgData = async (key: string, txt: string, page: string) => {
    const response = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${txt}&page=${page}`
    );
    const data = await response.json();
    let maxTotal = 500;
    return {
      resultListsData: data.hits.map(e => ({
        id: e.id,
        preview: e.previewURL,
        imgSrc: e.largeImageURL,
        width: e.imageWidth,
        height: e.imageHeight,
        alt: e.tags
      })),
      safeTotalContData: Math.min(data.totalHits, maxTotal),

      
      // data
    }
  }
  return { fetchImgData }
}