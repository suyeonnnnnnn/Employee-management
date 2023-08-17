import { app } from "../utils/db.js";
import {
  getFirestore,
  collection,
  getDocs,
  query
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

async function Main() {
  const db = getFirestore(app);
  const q = await getDocs(collection(db, "employee"));

  const divApp = document.getElementById("app");
  divApp.innerHTML = "";

  const listContainer = document.createElement("ul");
  listContainer.setAttribute("class", "list-container");

  divApp.append(listContainer);

  // 데이터 받아와서 ul(list-container) > li(list-wrapper) > [ul > li]로 담아서 줌
  q.forEach(doc => {
    const listWrapper = document.createElement("li");
    listWrapper.setAttribute("class", "list-wrapper");
    listContainer.append(listWrapper);

    const listAnchor = document.createElement("a");
    listAnchor.setAttribute("class", "list-anchor");
    listAnchor.href = `/detail/${doc.id}`;

    listAnchor.innerHTML = `
          <img class="list-anchor__img" src="${doc.data().image}"/>
          <p class="list-anchor__name">${doc.data().name}</p>
          <p class="list-anchor__team">${doc.data().team}</p>
          <p class="list-anchor__position">${doc.data().position}</p>
    `;

    listWrapper.append(listAnchor);
  });
}

export default Main;