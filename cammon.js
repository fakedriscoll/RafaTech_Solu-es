// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBXOABPeUk6wV6yF6d8JoL2f0h1Rm4cjio",
    authDomain: "rafatech-solucoes.firebaseapp.com",
    projectId: "rafatech-solucoes",
    storageBucket: "rafatech-solucoes.firebasestorage.app",
    messagingSenderId: "95771610184",
    appId: "1:95771610184:web:b13d24bb55392e4d3f0119"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebase.auth();

// Verificar estado de autenticação
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const currentUser = JSON.parse(localStorage.getItem('rafatech_current_user'));
    
    // Atualizar links de login/logout
    const loginLinks = document.querySelectorAll('.login-link');
    
    if (currentUser && currentUser.loggedIn) {
        // Usuário está logado
        loginLinks.forEach(link => {
            link.textContent = 'Minha Conta';
            link.href = '#'; // Aqui você pode adicionar uma página de perfil
            
            // Adicionar menu dropdown para logout
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Verificar se já existe um dropdown
                const existingDropdown = document.querySelector('.account-dropdown');
                
                if (existingDropdown) {
                    existingDropdown.remove();
                    return;
                }
                
                // Criar dropdown
                const dropdown = document.createElement('div');
                dropdown.className = 'account-dropdown absolute bg-white shadow-md rounded-lg py-2 mt-1 w-48 z-50';
                dropdown.innerHTML = `
                    <div class="px-4 py-2 border-b border-gray-200">
                        <p class="font-semibold">${currentUser.displayName || currentUser.email}</p>
                        <p class="text-sm text-gray-600">${currentUser.email}</p>
                    </div>
                    <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-blue-100">Meu Perfil</a>
                    <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-blue-100">Minhas Avaliações</a>
                    <a href="#" id="logout-btn" class="block px-4 py-2 text-red-600 hover:bg-red-100">Sair</a>
                `;
                
                // Posicionar dropdown
                const rect = link.getBoundingClientRect();
                dropdown.style.position = 'absolute';
                dropdown.style.top = `${rect.bottom}px`;
                dropdown.style.left = `${rect.left}px`;
                
                // Adicionar ao body
                document.body.appendChild(dropdown);
                
                // Adicionar evento de logout
                document.getElementById('logout-btn').addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    auth.signOut().then(() => {
                        localStorage.removeItem('rafatech_current_user');
                        window.location.reload();
                    }).catch((error) => {
                        console.error('Erro ao fazer logout:', error);
                    });
                });
                
                // Fechar dropdown ao clicar fora
                document.addEventListener('click', function closeDropdown(e) {
                    if (!dropdown.contains(e.target) && e.target !== link) {
                        dropdown.remove();
                        document.removeEventListener('click', closeDropdown);
                    }
                });
            });
        });
    } else {
        // Usuário não está logado
        loginLinks.forEach(link => {
            link.textContent = 'Login';
            link.href = 'login.html';
        });
    }
});

