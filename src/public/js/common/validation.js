export function formValidation(formsSelector, callback) {
  const forms = document.querySelectorAll(formsSelector)

  Array.from(forms).forEach((form) => {
    ;(form.onsubmit = (event) => {
      let isValid = true // 초기값 설정
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        isValid = false // 폼 유효성 검사 실패 시 isValid 값을 false로 설정
      }
      form.classList.add('was-validated') // 피드백

      // 유효성 검사 결과값 전달
      callback(isValid)
    }),
      false
  })
}