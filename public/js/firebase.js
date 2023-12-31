const firebaseConfig = {
    apiKey: "AIzaSyCIwWG1nwrROZ-ZmSq47DEQ9UMJNIZQPys",
    authDomain: "employee-management-d1bad.firebaseapp.com",
    projectId: "employee-management-d1bad",
    storageBucket: "employee-management-d1bad.appspot.com",
    messagingSenderId: "386195527226",
    appId: "1:386195527226:web:948bf0058e117d7d418703"
};
  firebase.initializeApp(firebaseConfig);
  

const db = firebase.firestore();
const storage = firebase.storage();


db.collection('employee').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        var row = `
        <tr>
            <td>
                <span class="custom-checkbox">
                    <input type="checkbox" id="checkbox${doc.id}" name="options[]" value="${doc.id}">
                    <label for="checkbox${doc.id}"></label>
                </span>
            </td>
            <td data-label="사진"><a href="/profile.html?id=${doc.id}"><img class="img" src="${doc.data().image}" alt="Employee Photo"></a></td>
            <td data-label="이름"><a href="/profile.html?id=${doc.id}">${doc.data().name}</a></td>
            <td data-label="이메일">${doc.data().email}</td>
            <td data-label="전화번호">${doc.data().phone}</td>
            <td data-label="직책">${doc.data().position}</td>
            <td>
                
                <a href="/edit.html?id=${doc.id}" class="button--state-edit"> 수정 </a>
                <button class="button button--state-delete2" data-id="${doc.id}">삭제</button>
            </td>
        </tr>`;
        document.querySelector('tbody').insertAdjacentHTML('beforeend', row);
    });
    

   ////////////////모달 창 내부 버튼 이벤트 리스터 추가//////////////

    // 삭제 버튼에 이벤트 리스너 추가
    let deleteButtons2 = document.querySelectorAll('.button--state-delete2');
    deleteButtons2.forEach(function(button) {
        button.addEventListener('click', function() {
            let modal = document.querySelector('.modal--delete2');
            modal.classList.remove('hidden');
        });
    });

    let deleteButton = document.querySelectorAll('.button--state-delete');
    deleteButton.forEach(function(button) {
        button.addEventListener('click', function() {
            let modal = document.querySelector('.modal--delete');
            modal.classList.remove('hidden');
        });
    });


    // 수정 버튼에 이벤트 리스너 추가
    let editButtons = document.querySelectorAll('.button--state-edit');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let modal = document.querySelector('.modal--edit');
            modal.classList.remove('hidden');
        });
    });

    // 취소 버튼에 이벤트 리스너 추가
    let cancelButtons = document.querySelectorAll('.button--state-cancel');
    cancelButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            hideAllModals();
        });
    });


});

document.addEventListener('DOMContentLoaded', function() {
    // 'send' 버튼에 이벤트 리스너 추가 (등록)
    let sendButton = document.getElementById('send');
    if(sendButton) { // sendButton이 존재하면 이벤트 리스너를 추가
        sendButton.addEventListener('click', function() {
            // 'image' 엘리먼트를 찾고 파일을 가져옴
            let imageInput = document.getElementById('input-file');
            if (imageInput && imageInput.files.length > 0) { // imageInput이 존재하고, 선택된 파일이 있으면 다음을 실행
                let file = imageInput.files[0];
                let storageRef = firebase.storage().ref();
                let filePath = 'image/' + file.name;
                let uploadTask = storageRef.child(filePath).put(file);

                uploadTask.on('state_changed', null, function(error) {
                    console.error('Upload failed:', error);
                }, function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                        let employeeData = {
                            name: document.getElementById('name').value,
                            phone: document.getElementById('phone').value,
                            email: document.getElementById('email').value,
                            position: document.getElementById('position').value,
                            image: url
                        };
                        firebase.firestore().collection('employee').add(employeeData).then(function(result){
                            console.log(result);
                            window.location.href = "/index.html";
                        }).catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
                    });
                });
            } else {
                console.error('No files selected or image input does not exist');
            }
        });
    } else {
        console.error('Send button does not exist');
    }
});


// 프로필 페이지에 데이터 출력
document.addEventListener('DOMContentLoaded', function() {
    // URL의 쿼리 스트링에서 docId를 추출
   const queryString = new URLSearchParams(window.location.search);
   const docId = queryString.get('id');
   const db = firebase.firestore();

   // Firestore에서 해당하는 직원의 데이터를 가져옴
   db.collection('employee').doc(docId).get().then((result) => {
       const data = result.data();
   // HTML에 직원의 데이터를 동적으로 추가
       document.getElementById('name').textContent = data.name;
       document.getElementById('email').textContent = data.email;
       document.getElementById('phone').textContent = data.phone;
       document.getElementById('position').textContent = data.position;
       document.getElementById('photo').innerHTML = '<img src="' + data.image + '" alt="Photo">';
   });
});
