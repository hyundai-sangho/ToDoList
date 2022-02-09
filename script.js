// 모든 요소를 얻는 것
const inputBox = document.querySelector('.inputField input')
const addBtn = document.querySelector('.inputField button')
const todoList = document.querySelector('.todoList')
const pendingNumb = document.querySelector('.pendingNumb')
const deleteAllBtn = document.querySelector('.footer button')

inputBox.onkeyup = () => {
  // 사용자가 입력 한 값을 가져옵니다
  let userData = inputBox.value

  // 사용자 값이 공백뿐만 아니라면 //
  if (userData.trim() != 0) {
    // add 버튼 활성화
    addBtn.classList.add('active')
  } else {
    addBtn.classList.remove('active')
  }
}

// showTasks를 호출합니다
showTasks()

// 사용자가 추가 버튼을 클릭하면
addBtn.onclick = () => {
  // 사용자가 입력 한 값을 가져옵니다
  let userData = inputBox.value
  let getLocalStorage = localStorage.getItem('새로운 할 일')
  if (getLocalStorage == null) {
    // 빈 배열 생성
    listArr = []
  } else {
    // JSON 문자열을 JS 객체로 변환합니다
    listArr = JSON.parse(getLocalStorage)
  }
  pendingNumb.textContent = listArr.length + 1
  // 사용자 데이터를 푸시 또는 추가합니다
  listArr.push(userData)
  // JS 객체를 JSON 문자열로 변환합니다
  localStorage.setItem('새로운 할 일', JSON.stringify(listArr))
  // showTasks 함수 호출
  showTasks()
  addBtn.classList.remove('active')
}

// ul에 작업 목록을 추가하는 기능
function showTasks() {
  let getLocalStorage = localStorage.getItem('새로운 할 일')
  if (getLocalStorage == null) {
    // 빈 배열 생성
    listArr = []
  } else {
    // JSON 문자열을 JS 객체로 변환합니다
    listArr = JSON.parse(getLocalStorage)
  }

  if (listArr.length > 0) {
    deleteAllBtn.classList.add('active')
  } else {
    deleteAllBtn.classList.remove('active')
  }

  let newLiTag = ''
  listArr.forEach((element, index) => {
    newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
  })
  // ul 태그 내에 새로운 li 태그 추가
  todoList.innerHTML = newLiTag
  // 일단 작업이 추가되면 입력 필드를 검정색으로 둡니다
  inputBox.value = ''
}

// delete task function
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem('새로운 할 일')
  listArr = JSON.parse(getLocalStorage)
  //특정 인덱스 li를 삭제하거나 제거하십시오
  listArr.splice(index, 1)
  // LI를 다시 제거한 후 다시 로컬 저장소를 업데이트합니다.
  localStorage.setItem('새로운 할 일', JSON.stringify(listArr))
  pendingNumb.textContent = listArr.length
  showTasks()
}

// 모든 작업 기능을 삭제합니다
deleteAllBtn.onclick = () => {
  // 배열을 비우십시오
  listArr = []
  // LI 전체 목록을 제거한 후 다시 로컬 저장소를 업데이트합니다.
  localStorage.setItem('새로운 할 일', JSON.stringify(listArr))
  showTasks()
  pendingNumb.textContent = listArr.length
}
