// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBXOABPeUk6wV6yF6d0JoL2f0h1Rm4cjio",
  authDomain: "rafatech-solucoes.firebaseapp.com",
  projectId: "rafatech-solucoes",
  storageBucket: "rafatech-solucoes.firebasestorage.app",
  messagingSenderId: "957716101084",
  appId: "1:957716101084:web:b13d24bb55392efd3f0119"
};

// Inicializar o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Função para mostrar mensagem de status
function showStatusMessage(message, isError = false) {
    const statusElement = document.getElementById('status-message');
    statusElement.textContent = message;
    statusElement.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
    
    if (isError) {
        statusElement.classList.add('bg-red-100', 'text-red-800');
    } else {
        statusElement.classList.add('bg-green-100', 'text-green-800');
    }
    
    statusElement.classList.remove('hidden');
    
    // Esconder a mensagem após 5 segundos
    setTimeout(() => {
        statusElement.classList.add('hidden');
    }, 5000);
}

// Tabs functionality
document.getElementById('login-tab').addEventListener('click', function() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-tab').classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    document.getElementById('login-tab').classList.remove('text-gray-500');
    document.getElementById('register-tab').classList.add('text-gray-500');
    document.getElementById('register-tab').classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
});

document.getElementById('register-tab').addEventListener('click', function() {
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-tab').classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    document.getElementById('register-tab').classList.remove('text-gray-500');
    document.getElementById('login-tab').classList.add('text-gray-500');
    document.getElementById('login-tab').classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
});

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Login form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validação básica
    if (!email || !password) {
        showStatusMessage('Por favor, preencha todos os campos.', true);
        return;
    }
    
    // Autenticar com Firebase
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            const user = userCredential.user;
            
            // Salvar sessão do usuário
            localStorage.setItem('rafatech_current_user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || email.split('@')[0],
                loggedIn: true
            }));
            
            showStatusMessage('Login realizado com sucesso!');
            
            setTimeout(() => {
    if (user.email === 'teste.admin@rafatech.com') {
        window.location.href = 'admin.html?loggedIn=true';
    } else {
        window.location.href = 'index.html'; // ou outra página para usuários comuns
    }
}, 1000);

        })
        .catch((error) => {
            // Tratar erros de autenticação
            let errorMessage;
            
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'Usuário não encontrado.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Senha incorreta.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'E-mail inválido.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Usuário desativado.';
                    break;
                default:
                    errorMessage = 'Erro ao fazer login: ' + error.message;
            }
            
            showStatusMessage(errorMessage, true);
        });
});

// Register form submission
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Validação básica
    if (!name || !email || !password || !confirmPassword) {
        showStatusMessage('Por favor, preencha todos os campos.', true);
        return;
    }
    
    if (password !== confirmPassword) {
        showStatusMessage('As senhas não coincidem.', true);
        return;
    }
    
    if (password.length < 6) {
        showStatusMessage('A senha deve ter pelo menos 6 caracteres.', true);
        return;
    }
    
    // Criar usuário no Firebase
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Cadastro bem-sucedido
            const user = userCredential.user;
            
            // Atualizar o perfil do usuário com o nome
            return user.updateProfile({
                displayName: name
            }).then(() => {
                // Salvar sessão do usuário
                localStorage.setItem('rafatech_current_user', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    displayName: name,
                    loggedIn: true
                }));
                
                showStatusMessage('Cadastro realizado com sucesso!');
                
                setTimeout(() => {
    if (user.email === 'teste.admin@rafatech.com') {
        window.location.href = 'admin.html?loggedIn=true';
    } else {
        window.location.href = 'index.html'; // ou outra página para usuários comuns
    }
}, 1000);

            });
        })
        .catch((error) => {
            // Tratar erros de cadastro
            let errorMessage;
            
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Este e-mail já está em uso.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'E-mail inválido.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Senha muito fraca.';
                    break;
                default:
                    errorMessage = 'Erro ao criar conta: ' + error.message;
            }
            
            showStatusMessage(errorMessage, true);
        });
});

// Esqueceu a senha
document.getElementById('forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    
    if (!email) {
        showStatusMessage('Por favor, informe seu e-mail para recuperar a senha.', true);
        return;
    }
    
    auth.sendPasswordResetEmail(email)
        .then(() => {
            showStatusMessage('E-mail de recuperação de senha enviado. Verifique sua caixa de entrada.');
        })
        .catch((error) => {
            let errorMessage;
            
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'E-mail inválido.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Usuário não encontrado.';
                    break;
                default:
                    errorMessage = 'Erro ao enviar e-mail de recuperação: ' + error.message;
            }
            
            showStatusMessage(errorMessage, true);
        });
});

// Verificar estado de autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // Usuário está logado
            localStorage.setItem('rafatech_current_user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || user.email.split('@')[0],
                loggedIn: true
            }));
        } else {
            // Usuário não está logado
            localStorage.removeItem('rafatech_current_user');
        }
    });
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        const passwordField = this.parentElement.previousElementSibling.querySelector('input[type="password"]');
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});

