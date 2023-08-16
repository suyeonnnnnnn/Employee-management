import { storage, db } from './firebase.js';

// firebase에서 image,profile 가져와서 직원리스트 생성
const table = document.querySelector('.employees__table');
db.collection('profile')
  .get()
  .then((res) => {
    res.forEach((item) => {
      const storageRef = storage.ref();
      const profile = storageRef.child('image/' +item.data().employeeId+'.jpg');
      profile.getDownloadURL().then((res) => {
        table.insertAdjacentHTML(
          'beforeend',
          `
  <tr  class="employees__table__row">
    <td><input type="checkbox" class="checkbox" id="profile" /></td>
    <td><img  class="table__row__img"  src="${res}"></td>
    <td>${item.data().name}</td>
    <td class="employeeId">${item.data().employeeId}</td>
    <td>${item.data().position}</td>
    <td>${item.data().phonenum}</td>
    <td>${item.data().email}</td>
    </label>
    
  </tr>
`
        );
      });
    });
  });
  function deleteFirestore (collection,doc){
    const docRef = db.collection(collection).doc(doc);
    docRef.delete()
}
// 직원 추가페이지 이동
document.querySelector('.btn__add').addEventListener('click',()=>{window.location.href = '/employee_add.html'})

// 직원 삭제
function getCheckEmployeeId (){
    const rows = document.querySelectorAll('.checkbox:checked');
    const employeeIds = [];
    
    rows.forEach(row=>{
        let employeeId = row.closest('.employees__table__row').querySelector('.employeeId');
        employeeIds.push(employeeId.textContent)
    })
    return employeeIds;
}
document.querySelector('.btn__del').addEventListener('click',()=>{
    const userConfirmed = confirm(`직원 0명을 삭제하시겠습니까?`)
    if (userConfirmed) {
        console.log("사용자가 확인을 선택했습니다.");
        let checkIds = getCheckEmployeeId();
        console.log(checkIds);
        checkIds.forEach(checkId=>{
            deleteFirestore('profile',checkId)
            setTimeout(()=>window.location.href = "/index.html",500)
            
        })
    } else {
        
    }
})

async function renderTotalEmployees () {
    let totalEmployees = 0;
    const test = await db.collection('profile').get();
    
    test.forEach(()=>{
        totalEmployees++;
    })
    document.querySelector('.search__total').innerHTML += totalEmployees    
}

renderTotalEmployees();
const tableRow = document.querySelectorAll('.employees__table__row')
// 직원 상세페이지
tableRow.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        console.log(e.currentTarget);
    })
})


table.addEventListener('click',(e)=>{
  let selectEmployee = e.target.parentNode.querySelector('.employeeId')
  localStorage.setItem('selectEmployee',selectEmployee.innerHTML);
  setTimeout(()=>window.location.href = "/employee_detail.html",500)
});

