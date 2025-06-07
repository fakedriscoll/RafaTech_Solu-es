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

// Verificar estado de autenticação
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const currentUser = JSON.parse(localStorage.getItem('rafatech_current_user'));
    
    // Atualizar links de login/logout
    const loginLinks = document.querySelectorAll('.login-link');
    
    if (currentUser && currentUser.loggedIn) {
        // Usuário está logado
        loginLinks.forEach(link => {
            // Modificar o link para mostrar o nome do usuário
            link.innerHTML = `<span class="flex items-center"><span class="mr-1">${currentUser.displayName || currentUser.email.split('@')[0]}</span> <i class="fas fa-chevron-down text-xs ml-1"></i></span>`;
            link.href = '#';
            link.classList.add('user-profile-link');
            
            // Adicionar menu dropdown para perfil
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
                
                // Verificar se o usuário tem foto de perfil
                const userPhoto = currentUser.photoURL || 'img/default-avatar.png';
                
                dropdown.innerHTML = `
                    <div class="px-4 py-3 border-b border-gray-200 flex items-center">
                        <div class="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200">
                            <img src="${userPhoto}" alt="Foto de perfil" class="w-full h-full object-cover" id="profile-photo">
                        </div>
                        <div>
                            <p class="font-semibold text-sm">${currentUser.displayName || currentUser.email.split('@')[0]}</p>
                            <p class="text-xs text-gray-600">${currentUser.email}</p>
                        </div>
                    </div>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-100" id="seu-perfil">
                        <i class="fas fa-user mr-2"></i> Seu Perfil
                    </a>
                    <a href="avaliacoes.html" class="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-100">
                        <i class="fas fa-star mr-2"></i> Minhas Avaliações
                    </a>
                    <a href="#" id="logout-btn" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                        <i class="fas fa-sign-out-alt mr-2"></i> Sair
                    </a>
                `;

                
                
                // Posicionar dropdown
                const rect = link.getBoundingClientRect();
                dropdown.style.position = 'absolute';
                dropdown.style.top = `${rect.bottom}px`;
                dropdown.style.right = `${window.innerWidth - rect.right}px`;
                
                // Adicionar ao body
                document.body.appendChild(dropdown);
                
                // Adicionar evento para abrir perfil
                document.getElementById('seu-perfil').addEventListener('click', function(e) {
                    e.preventDefault();
                    openProfileModal();
                    dropdown.remove();
                });
                
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
                    if (!dropdown.contains(e.target) && !link.contains(e.target)) {
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

// Função para abrir o modal de perfil
function openProfileModal() {
    const currentUser = JSON.parse(localStorage.getItem('rafatech_current_user'));
    if (!currentUser) return;
    
    // Criar modal de perfil
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.id = 'profile-modal';
    
    const userPhoto = currentUser.photoURL || 'img/default-avatar.png';
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-800">Seu Perfil</h3>
                <button id="close-profile-modal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mb-6 text-center">
                <div class="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200 relative group">
                    <img src="${userPhoto}" alt="Foto de perfil" class="w-full h-full object-cover" id="profile-photo-large">
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" id="change-photo-btn">
                        <i class="fas fa-camera text-white text-xl"></i>
                    </div>
                </div>
                <h4 class="text-lg font-semibold">${currentUser.displayName || currentUser.email.split('@')[0]}</h4>
                <p class="text-gray-600">${currentUser.email}</p>
                
                <input type="file" id="photo-upload" accept="image/*" class="hidden">
            </div>
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-1">Nome</label>
                    <input type="text" id="profile-name" class="w-full px-3 py-2 border border-gray-300 rounded-lg" value="${currentUser.displayName || ''}">
                </div>
                <div>
                    <label class="block text-gray-700 mb-1">E-mail</label>
                    <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" value="${currentUser.email}" disabled>
                </div>
            </div>
            <div class="flex justify-end mt-6">
                <button id="save-profile" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Salvar Alterações</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal
    document.getElementById('close-profile-modal').addEventListener('click', function() {
        modal.remove();
    });
    
    // Clicar fora para fechar
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Botão para trocar foto
    document.getElementById('change-photo-btn').addEventListener('click', function() {
        document.getElementById('photo-upload').click();
    });
    
    // Upload de foto
    document.getElementById('photo-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoUrl = e.target.result;
            document.getElementById('profile-photo-large').src = photoUrl;
            
            // Atualizar o usuário no localStorage com a nova foto
            const user = JSON.parse(localStorage.getItem('rafatech_current_user'));
            user.photoURL = photoUrl;
            localStorage.setItem('rafatech_current_user', JSON.stringify(user));
            
            // Atualizar foto no dropdown se estiver aberto
            const profilePhoto = document.getElementById('profile-photo');
            if (profilePhoto) {
                profilePhoto.src = photoUrl;
            }
        };
        reader.readAsDataURL(file);
    });
    
    // Salvar alterações
    document.getElementById('save-profile').addEventListener('click', function() {
        const newName = document.getElementById('profile-name').value;
        
        // Atualizar o usuário no localStorage
        const user = JSON.parse(localStorage.getItem('rafatech_current_user'));
        user.displayName = newName;
        localStorage.setItem('rafatech_current_user', JSON.stringify(user));
        
        // Atualizar a interface
        document.querySelector('.user-profile-link').innerHTML = `<span class="flex items-center"><span class="mr-1">${newName || user.email.split('@')[0]}</span> <i class="fas fa-chevron-down text-xs ml-1"></i></span>`;
        
        // Fechar o modal
        modal.remove();
        
        // Mostrar mensagem de sucesso
        alert('Perfil atualizado com sucesso!');
    });
}

