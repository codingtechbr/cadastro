// Importação dos módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCodmRs47TZ54rIl3ZUtNPKle_3XPGws6Y",
    authDomain: "cadastro-alunos-55c29.firebaseapp.com",
    projectId: "cadastro-alunos-55c29",
    storageBucket: "cadastro-alunos-55c29.appspot.com",
    messagingSenderId: "544995398645",
    appId: "1:544995398645:web:d3502682491da59ce586bc",
    measurementId: "G-S7YBWXDHC7"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para cadastrar o aluno
document.getElementById('formCadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coleta as informações pessoais
    const email = document.getElementById('emailAluno').value;
    const senha = document.getElementById('senhaAluno').value;
    const cpf = document.getElementById('cpfAluno').value;
    const telefone = document.getElementById('telefoneAluno').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const rua = document.getElementById('ruaAluno').value;
    const numero = document.getElementById('numeroAluno').value;
    const cidade = document.getElementById('cidadeAluno').value;

    // Coletando os cursos
    const cursos = Array.from(document.querySelectorAll('.curso')).map(curso => ({
        nome: curso.querySelector('[name="nomeCurso"]').value,
        cargaHoraria: curso.querySelector('[name="cargaHoraria"]').value,
        nota: curso.querySelector('[name="nota"]').value,
        certificado: curso.querySelector('[name="certificado"]').value
    }));

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
    
        console.log("Usuário criado:", user.uid);
    
        // Salvar no Firestore
        await setDoc(doc(db, "alunos", user.uid), {
            email,
            cpf,
            telefone,
            dataNascimento,
            endereco: {
                rua,
                numero,
                cidade
            },
            cursos
        });
    
        alert('Aluno cadastrado com sucesso!');
        window.location.href = "area-aluno.html";
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        alert("Erro ao cadastrar aluno: " + error.message);
    }
    

// Lógica para adicionar novos cursos
let cursoCount = 1; // Variável para contar o número de cursos adicionados

document.getElementById('addCurso').addEventListener('click', () => {
    const cursoDiv = document.createElement('div');
    cursoDiv.classList.add('curso');
    cursoDiv.innerHTML = `
        <h4>Curso ${cursoCount}</h4>
        <input type="text" name="nomeCurso" placeholder="Nome do Curso" required>
        <input type="text" name="cargaHoraria" placeholder="Carga Horária" required>
        <input type="text" name="nota" placeholder="Nota" required>
        <input type="text" name="certificado" placeholder="Link do Certificado (opcional)">
    `;
    document.getElementById('cursosContainer').appendChild(cursoDiv);
    cursoCount++; // Incrementa o contador para o próximo curso
});
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

const auth = getAuth();

const btnEnviarReset = document.getElementById("btnEnviarReset");
btnEnviarReset.addEventListener("click", async () => {
  const email = document.getElementById("emailAlunoReset").value;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("E-mail de redefinição de senha enviado com sucesso!");
  } catch (error) {
    alert("Erro ao enviar e-mail: " + error.message);
  }
});
