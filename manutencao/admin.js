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
async function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpar lista existente

    try {
        const snapshot = await db.collection("products").get();
        snapshot.forEach(doc => {
            const product = doc.data();
            const productId = doc.id;
            const productCard = `
                <div class="bg-gray-50 rounded-lg shadow-md p-6 border border-gray-200">
                    <img src="${product.imageUrl || 'https://via.placeholder.com/150'}" alt="${product.name}" class="w-full h-32 object-cover rounded-md mb-4">
                    <h4 class="text-xl font-semibold mb-2 text-gray-800">${product.name}</h4>
                    <p class="text-gray-600 mb-2">${product.description}</p>
                    <p class="text-green-600 font-medium mb-2"><i class="fas fa-map-marker-alt mr-1"></i>Localização: ${product.location || 'Não informada'}</p>
                    <p class="text-blue-600 font-bold text-lg">R$ ${product.price.toFixed(2)}</p>
                    <div class="mt-4 flex space-x-2">
                        <button data-id="${productId}" class="edit-product-btn bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition flex-1">
                            <i class="fas fa-edit mr-1"></i>Editar
                        </button>
                        <button data-id="${productId}" class="delete-product-btn bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition flex-1">
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
        alert("Erro ao carregar produtos.");
    }
}

// Função para adicionar produto
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const location = document.getElementById("product-location").value;
    const imageUrl = document.getElementById("product-image-url").value;

    if (!name || !description || isNaN(price) || !location) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        await db.collection("products").add({
            name,
            description,
            price,
            location,
            imageUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Produto adicionado com sucesso!");
        document.getElementById("add-product-form").reset(); // Limpar formulário
        loadProducts(); // Recarregar lista de produtos
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        alert("Erro ao adicionar produto.");
    }
});

// Função para remover produto
async function deleteProduct(productId) {
    if (confirm("Tem certeza que deseja remover este produto?")) {
        try {
            await db.collection("products").doc(productId).delete();
            alert("Produto removido com sucesso!");
            loadProducts(); // Recarregar lista de produtos
        } catch (error) {
            console.error("Erro ao remover produto:", error);
            alert("Erro ao remover produto.");
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
            document.getElementById("edit-product-image-url").value = product.imageUrl || '';
            
            // Mostrar o modal
            document.getElementById("edit-modal").classList.remove("hidden");
        } else {
            alert("Produto não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao carregar produto para edição:", error);
        alert("Erro ao carregar produto para edição.");
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
    const imageUrl = document.getElementById("edit-product-image-url").value;

    if (!name || !description || isNaN(price) || !location) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const editBtn = document.getElementById("edit-btn-text");
    const editSpinner = document.getElementById("edit-spinner");
    
    try {
        // Mostrar loading
        editBtn.textContent = "Salvando...";
        editSpinner.classList.remove("hidden");

        await db.collection("products").doc(productId).update({
            name,
            description,
            price,
            location,
            imageUrl,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Produto atualizado com sucesso!");
        document.getElementById("edit-modal").classList.add("hidden");
        loadProducts(); // Recarregar lista de produtos
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto.");
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

