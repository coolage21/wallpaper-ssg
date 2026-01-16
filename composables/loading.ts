import { ref } from 'vue';

const isLoading = ref(false);

const showLoading  = () => { 
  isLoading.value = true
}

const hideLoading  = () => (isLoading.value = false)

export const useLoading = () => {
  return {
    isLoading,
    showLoading,
    hideLoading,
  }
}