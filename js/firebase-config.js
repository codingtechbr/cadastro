import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

// Inicialize o Firebase Auth e Firestore
const auth = getAuth();
const db = getFirestore();

// Função de login
document.getElementById('loginBtn').addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    try {
        // Realiza o login com o e-mail e senha fornecidos
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Carrega as informações do aluno do Firestore
        const alunoRef = doc(db, "alunos", user.uid);
        const alunoDoc = await getDoc(alunoRef);

        if (alunoDoc.exists()) {
            const alunoData = alunoDoc.data();

            // Exibe as informações pessoais
            document.getElementById('emailAluno').textContent = alunoData.email;
            document.getElementById('telefoneAluno').textContent = alunoData.telefone;
            document.getElementById('enderecoAluno').textContent = `${alunoData.endereco.rua}, ${alunoData.endereco.numero}, ${alunoData.endereco.cidade}`;
            document.getElementById('dataNascimentoAluno').textContent = alunoData.dataNascimento;

            // Exibe os cursos
            const cursosList = document.getElementById('cursosAluno');
            alunoData.cursos.forEach(curso => {
                const listItem = document.createElement('li');
                listItem.textContent = `${curso.nome} - Nota: ${curso.nota}`;
                cursosList.appendChild(listItem);
            });

            // Exibe a área do aluno
            document.getElementById('informacoesAluno').style.display = 'block';
            document.getElementById('loginForm').style.display = 'none';
        } else {
            alert("Aluno não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao fazer login: ", error);
        alert("Erro ao fazer login: " + error.message);
    }
});
