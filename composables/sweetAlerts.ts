  import Swal from 'sweetalert2/dist/sweetalert2.js'
  import 'sweetalert2/src/sweetalert2.scss'

  export const sweetAlert = () => {
    const showAlert = (ttl, txt, icon = 'info', showCancel = false) => {
      return Swal.fire({
        title: ttl,
        text: txt,
        icon: icon,
        showCancelButton: showCancel,
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      })
    }
    return {
      showAlert,
    }
  }
