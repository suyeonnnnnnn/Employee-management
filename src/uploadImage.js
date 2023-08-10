import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

const addForm = document.querySelector(".form-add");
const editForm = document.querySelector(".form-edit");
const addUserBtn = document.querySelector(".header__btn-add-user");
addUserBtn.addEventListener("click", () => {
  addForm.classList.remove("hidden");
});

const closeInputBtn = document.querySelector(".close-btn");
closeInputBtn.addEventListener("click", () => {
  addForm.classList.add("hidden");
  if (editForm) {
    editForm.classList.add("hidden");
  }
});

export function uploadImageToStorage(imageFile) {
  return new Promise((resolve, reject) => {
    const uniqueImageUrl = new Date().getTime() + "-" + imageFile.name;

    const storageRef = ref(storage, "profile_images/" + uniqueImageUrl);
    // 스토리지에 이미지 업로드 및 URL 생성
    uploadBytes(storageRef, imageFile)
      .then(async (snapshot) => {
        console.log("Uploaded successfully");
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("Download URL:", downloadURL);
          resolve(downloadURL);
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

// 데이터베이스에 데이터 저장
export async function uploadInfoToDatabase(userData) {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    console.log("Added successfully");
    return docRef.id;
  } catch (err) {
    console.error(err);
  }
}
