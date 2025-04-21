import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCodmRs47TZ54rIl3ZUtNPKle_3XPGws6Y",
  authDomain: "cadastro-alunos-55c29.firebaseapp.com",
  projectId: "cadastro-alunos-55c29",
  storageBucket: "cadastro-alunos-55c29.appspot.com",
  messagingSenderId: "544995398645",
  appId: "1:544995398645:web:d3502682491da59ce586bc",
  measurementId: "G-S7YBWXDHC7"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elementos
const loginBtn = document.getElementById("loginBtn");
const emailLogin = document.getElementById("emailLogin");
const senhaLogin = document.getElementById("senhaLogin");
const loginForm = document.getElementById("loginForm");
const infoAlunoDiv = document.getElementById("informacoesAluno");
const loader = document.getElementById("loader");

const emailSpan = document.getElementById("emailAluno");
const telefoneSpan = document.getElementById("telefoneAluno");
const enderecoSpan = document.getElementById("enderecoAluno");
const nascimentoSpan = document.getElementById("dataNascimentoAluno");
const cursosUl = document.getElementById("cursosAluno");

// Evento de login
loginBtn.addEventListener("click", async () => {
  const email = emailLogin.value.trim();
  const senha = senhaLogin.value.trim();

  loader.style.display = "block";
  loginForm.style.display = "none";

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const uid = userCredential.user.uid;

    const docRef = doc(db, "alunos", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const aluno = docSnap.data();

      // Preenche os dados
      emailSpan.textContent = aluno.email;
      telefoneSpan.textContent = aluno.telefone;
      nascimentoSpan.textContent = aluno.dataNascimento;
      enderecoSpan.textContent = `${aluno.endereco.rua}, ${aluno.endereco.numero}, ${aluno.endereco.cidade}`;

      // Lista cursos
      cursosUl.innerHTML = "";
      aluno.cursos.forEach((curso) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${curso.nome}</strong><br>
          Carga Horária: ${curso.cargaHoraria}<br>
          Nota: ${curso.nota}<br>
          ${curso.certificado ? `<a href="${curso.certificado}" target="_blank">Ver Certificado</a>` : ""}
        `;
        cursosUl.appendChild(li);
      });

      loader.style.display = "none";
      infoAlunoDiv.style.display = "block";
    } else {
      alert("Dados do aluno não encontrados.");
      loader.style.display = "none";
      loginForm.style.display = "block";
    }

  } catch (error) {
    alert("Erro no login: " + error.message);
    loader.style.display = "none";
    loginForm.style.display = "block";
  }
});
