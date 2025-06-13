// Configuração do Firebase (use as mesmas configurações do login.js)
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
const db = firebase.firestore();
const storage = firebase.storage();

// Verificar se o usuário está logado e é um administrador
auth.onAuthStateChanged(user => {
    if (user) {
        // Usuário logado, verificar se é admin
        if (user.email === 'teste.admin@rafatech.com') {
            console.log("Usuário logado e é admin:", user.email);
            loadProducts();
        } else {
            console.log("Usuário logado, mas não é admin:", user.email);
            alert("Você não tem permissão para acessar esta página.");
            window.location.href = "login.html";
        }
    } else {
        // Usuário não logado, redirecionar para a página de login
        window.location.href = "login.html";
    }
});

// Função para carregar produtos do Firestore
async function loadProducts(filters = {}) {
    const productList = document.getElementById("product-list");
    const loadingDiv = document.getElementById("loading-products");
    const noProductsDiv = document.getElementById("no-products");
    
    // Mostrar loading
    loadingDiv.classList.remove("hidden");
    productList.innerHTML = "";
    noProductsDiv.classList.add("hidden");

    try {
        let query = db.collection("products");
        
        // Aplicar filtros de categoria
        if (filters.category) {
            query = query.where("category", "==", filters.category);
        }
        
        const snapshot = await query.get();
        let products = [];
        
        snapshot.forEach(doc => {
            const product = doc.data();
            products.push({
                id: doc.id,
                ...product
            });
        });
        
        // Aplicar filtros de nome e preço no lado cliente
        if (filters.name) {
            products = products.filter(product => 
                product.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        
        if (filters.priceMin !== undefined && filters.priceMin !== '') {
            products = products.filter(product => product.price >= parseFloat(filters.priceMin));
        }
        
        if (filters.priceMax !== undefined && filters.priceMax !== '') {
            products = products.filter(product => product.price <= parseFloat(filters.priceMax));
        }
        
        // Ocultar loading
        loadingDiv.classList.add("hidden");
        
        if (products.length === 0) {
            noProductsDiv.classList.remove("hidden");
            return;
        }
        
        products.forEach(product => {
            const stockStatus = product.stock > 0 ? 
                `<p class="text-green-600 font-medium mb-2"><i class="fas fa-boxes mr-1"></i>Estoque: ${product.stock} unidades</p>` :
                `<p class="text-red-600 font-medium mb-2"><i class="fas fa-exclamation-triangle mr-1"></i>Sem estoque</p>`;
            
            const categoryDisplay = product.category ? 
                `<p class="text-purple-600 font-medium mb-2"><i class="fas fa-tag mr-1"></i>Categoria: ${getCategoryName(product.category)}</p>` :
                '';
            
            const productCard = `
                <div class="bg-gray-50 rounded-lg shadow-md p-6 border border-gray-200">
                    <img src="${product.imageUrl || 'https://via.placeholder.com/150'}" alt="${product.name}" class="w-full h-32 object-cover rounded-md mb-4">
                    <h4 class="text-xl font-semibold mb-2 text-gray-800">${product.name}</h4>
                    <p class="text-gray-600 mb-2">${product.description}</p>
                    <p class="text-green-600 font-medium mb-2"><i class="fas fa-map-marker-alt mr-1"></i>Localização: ${product.location || 'Não informada'}</p>
                    ${categoryDisplay}
                    ${stockStatus}
                    <p class="text-blue-600 font-bold text-lg">R$ ${product.price.toFixed(2)}</p>
                    <div class="mt-4 flex space-x-2">
                        <button data-id="${product.id}" class="edit-product-btn bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition flex-1">
                            <i class="fas fa-edit mr-1"></i>Editar
                        </button>
                        <button data-id="${product.id}" class="delete-product-btn bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition flex-1">
                            <i class="fas fa-trash mr-1"></i>Remover
                        </button>
                    </div>
                </div>
            `;
            productList.innerHTML += productCard;
        });

        // Adicionar event listeners aos botões de remover
        document.querySelectorAll(".delete-product-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.dataset.id;
                deleteProduct(productId);
            });
        });

        // Adicionar event listeners aos botões de editar
        document.querySelectorAll(".edit-product-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.dataset.id;
                editProduct(productId);
            });
        });

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        loadingDiv.classList.add("hidden");
        showNotification("Erro ao carregar produtos.", "error");
    }
}

// Função auxiliar para obter o nome da categoria
function getCategoryName(categoryValue) {
    const categories = {
        'Fones de ouvido': 'Fones de ouvido',
        'Capas protetoras': 'Capas protetoras',
        'Película': 'Película',
        'outros': 'Outros'
    };
    return categories[categoryValue] || categoryValue;
}

// Função para adicionar produto
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const location = document.getElementById("product-location").value;
    const category = document.getElementById("product-category").value;
    const stock = parseInt(document.getElementById("product-stock").value);
    const imageUrlInput = document.getElementById("product-image-upload");
    const imageFile = imageUrlInput.files[0];

    if (!name || !description || isNaN(price) || !location || !category || isNaN(stock)) {
        showNotification("Por favor, preencha todos os campos obrigatórios.", "error");
        return;
    }

    const addBtn = document.getElementById("add-btn-text");
    const addSpinner = document.getElementById("add-spinner");
    
    try {
        // Mostrar loading
        addBtn.textContent = "Adicionando...";
        addSpinner.classList.remove("hidden");

        let imageUrl = '';
        if (imageFile) {
            // Validar tipo de ficheiro
            if (!imageFile.type.startsWith('image/')) {
                showNotification("Por favor, selecione apenas ficheiros de imagem.", "error");
                return;
            }

            // Validar tamanho do ficheiro (máximo 5MB)
            if (imageFile.size > 5 * 1024 * 1024) {
                showNotification("O ficheiro de imagem deve ter no máximo 5MB.", "error");
                return;
            }

            addBtn.textContent = "Fazendo upload da imagem...";
            
            // Criar nome único para o ficheiro
            const timestamp = Date.now();
            const fileName = `${timestamp}_${imageFile.name}`;
            const storageRef = storage.ref('product_images/' + fileName);
            const uploadTask = storageRef.put(imageFile);

            await uploadTask;
            imageUrl = await storageRef.getDownloadURL();
        }

        addBtn.textContent = "Salvando produto...";

        await db.collection("products").add({
            name,
            description,
            price,
            location,
            category,
            stock,
            imageUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showNotification(`Produto "${name}" adicionado com sucesso!`, "success");
        document.getElementById("add-product-form").reset(); // Limpar formulário
        loadProducts(); // Recarregar lista de produtos
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        showNotification("Erro ao adicionar produto: " + error.message, "error");
    } finally {
        // Restaurar botão
        addBtn.textContent = "Adicionar Produto";
        addSpinner.classList.add("hidden");
    }
});

// Função para remover produto
async function deleteProduct(productId) {
    if (confirm("Tem certeza que deseja remover este produto?")) {
        try {
            await db.collection("products").doc(productId).delete();
            showNotification("Produto removido com sucesso!", "success");
            loadProducts(); // Recarregar lista de produtos
        } catch (error) {
            console.error("Erro ao remover produto:", error);
            showNotification("Erro ao remover produto.", "error");
        }
    }
}

// Logout
document.getElementById("logout-button").addEventListener("click", () => {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Erro ao fazer logout:", error);
        alert("Erro ao fazer logout.");
    });
});



// Função para editar produto
async function editProduct(productId) {
    try {
        const doc = await db.collection("products").doc(productId).get();
        if (doc.exists) {
            const product = doc.data();
            
            // Preencher o modal com os dados do produto
            document.getElementById("edit-product-id").value = productId;
            document.getElementById("edit-product-name").value = product.name;
            document.getElementById("edit-product-price").value = product.price;
            document.getElementById("edit-product-description").value = product.description;
            document.getElementById("edit-product-location").value = product.location || '';
            document.getElementById("edit-product-category").value = product.category || '';
            document.getElementById("edit-product-stock").value = product.stock || 0;
            
            // Limpar o campo de upload de imagem ao abrir o modal
            document.getElementById("edit-product-image-upload").value = "";
            
            // Mostrar o modal
            document.getElementById("edit-modal").classList.remove("hidden");
        } else {
            showNotification("Produto não encontrado.", "error");
        }
    } catch (error) {
        console.error("Erro ao carregar produto para edição:", error);
        showNotification("Erro ao carregar produto para edição.", "error");
    }
}

// Event listeners para o modal de edição
document.getElementById("close-edit-modal").addEventListener("click", () => {
    document.getElementById("edit-modal").classList.add("hidden");
});

document.getElementById("cancel-edit").addEventListener("click", () => {
    document.getElementById("edit-modal").classList.add("hidden");
});

// Fechar modal ao clicar fora dele
document.getElementById("edit-modal").addEventListener("click", (e) => {
    if (e.target.id === "edit-modal") {
        document.getElementById("edit-modal").classList.add("hidden");
    }
});

// Função para salvar alterações do produto
document.getElementById("edit-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const productId = document.getElementById("edit-product-id").value;
    const name = document.getElementById("edit-product-name").value;
    const description = document.getElementById("edit-product-description").value;
    const price = parseFloat(document.getElementById("edit-product-price").value);
    const location = document.getElementById("edit-product-location").value;
    const category = document.getElementById("edit-product-category").value;
    const stock = parseInt(document.getElementById("edit-product-stock").value);
    const imageUrlInput = document.getElementById("edit-product-image-upload");
    const imageFile = imageUrlInput.files[0];

    if (!name || !description || isNaN(price) || !location || !category || isNaN(stock)) {
        showNotification("Por favor, preencha todos os campos obrigatórios.", "error");
        return;
    }

    const editBtn = document.getElementById("edit-btn-text");
    const editSpinner = document.getElementById("edit-spinner");
    
    try {
        // Mostrar loading
        editBtn.textContent = "Salvando...";
        editSpinner.classList.remove("hidden");

        // Obter a URL da imagem atual do produto
        const currentDoc = await db.collection("products").doc(productId).get();
        let imageUrl = currentDoc.data().imageUrl || '';

        if (imageFile) {
            // Validar tipo de ficheiro
            if (!imageFile.type.startsWith('image/')) {
                showNotification("Por favor, selecione apenas ficheiros de imagem.", "error");
                return;
            }

            // Validar tamanho do ficheiro (máximo 5MB)
            if (imageFile.size > 5 * 1024 * 1024) {
                showNotification("O ficheiro de imagem deve ter no máximo 5MB.", "error");
                return;
            }

            editBtn.textContent = "Fazendo upload da nova imagem...";
            
            // Criar nome único para o ficheiro
            const timestamp = Date.now();
            const fileName = `${timestamp}_${imageFile.name}`;
            const storageRef = storage.ref("product_images/" + fileName);
            const uploadTask = storageRef.put(imageFile);

            await uploadTask;
            imageUrl = await storageRef.getDownloadURL();
        }

        editBtn.textContent = "Atualizando produto...";

        await db.collection("products").doc(productId).update({
            name,
            description,
            price,
            location,
            category,
            stock,
            imageUrl,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification(`Produto "${name}" atualizado com sucesso!`, "success");
        document.getElementById("edit-modal").classList.add("hidden");
        loadProducts(); // Recarregar lista de produtos
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        showNotification("Erro ao atualizar produto: " + error.message, "error");
    } finally {
        // Restaurar botão
        editBtn.textContent = "Salvar Alterações";
        editSpinner.classList.add("hidden");
    }
});

// Função para atualizar lista de produtos (botão refresh)
document.getElementById("refresh-products").addEventListener("click", () => {
    loadProducts();
});



// Função para exibir notificações
function showNotification(message, type = 'info') {
    const statusMessage = document.getElementById('status-message');
    
    // Definir classes baseadas no tipo
    let bgColor, textColor, icon;
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            icon = 'fas fa-check-circle';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            icon = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            textColor = 'text-white';
            icon = 'fas fa-exclamation-triangle';
            break;
        default:
            bgColor = 'bg-blue-500';
            textColor = 'text-white';
            icon = 'fas fa-info-circle';
    }
    
    // Configurar o elemento
    statusMessage.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm ${bgColor} ${textColor}`;
    statusMessage.innerHTML = `
        <div class="flex items-center">
            <i class="${icon} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Mostrar a notificação
    statusMessage.classList.remove('hidden');
    
    // Ocultar após 5 segundos
    setTimeout(() => {
        statusMessage.classList.add('hidden');
    }, 5000);
}

// Event listeners para filtros
document.getElementById('apply-filters').addEventListener('click', () => {
    const filters = {
        name: document.getElementById('search-name').value.trim(),
        category: document.getElementById('filter-category').value,
        priceMin: document.getElementById('filter-price-min').value,
        priceMax: document.getElementById('filter-price-max').value
    };
    
    loadProducts(filters);
});

document.getElementById('clear-filters').addEventListener('click', () => {
    document.getElementById('search-name').value = '';
    document.getElementById('filter-category').value = '';
    document.getElementById('filter-price-min').value = '';
    document.getElementById('filter-price-max').value = '';
    
    loadProducts();
});

// Busca em tempo real ao digitar no campo de nome
document.getElementById('search-name').addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    
    // Aplicar busca apenas se houver pelo menos 2 caracteres ou se o campo estiver vazio
    if (searchTerm.length >= 2 || searchTerm.length === 0) {
        const filters = {
            name: searchTerm,
            category: document.getElementById('filter-category').value,
            priceMin: document.getElementById('filter-price-min').value,
            priceMax: document.getElementById('filter-price-max').value
        };
        
        loadProducts(filters);
    }
});

