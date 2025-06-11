        // Sample product data with stock information
        const products = [
            {
                id: 1,
                name: "Smartphone X1",
                price: 2499.99,
                image: "https://m.media-amazon.com/images/I/71XHqL4VwVL._AC_UF1000,1000_QL80_.jpg",
                description: "Smartphone de última geração com câmera de 48MP e bateria de longa duração.",
                category: "electronics",
                stock: 15
            },
            {
                id: 2,
                name: "Notebook Premium",
                price: 4299.99,
                image: "https://m.media-amazon.com/images/I/81fstJkUlaL._AC_UF1000,1000_QL80_.jpg",
                description: "Notebook potente para trabalho e jogos com processador i7 e tela Full HD.",
                category: "electronics",
                stock: 8
            },
            {
                id: 3,
                name: "Camiseta Básica",
                price: 59.90,
                image: "https://m.media-amazon.com/images/I/61-Gt5vQKBL._AC_UL1500_.jpg",
                description: "Camiseta de algodão 100% puro, disponível em várias cores.",
                category: "clothing",
                stock: 30
            },
            {
                id: 4,
                name: "Tênis Esportivo",
                price: 199.90,
                image: "https://m.media-amazon.com/images/I/71HpOE8QSvL._AC_UF1000,1000_QL80_.jpg",
                description: "Tênis confortável para atividades físicas com amortecimento premium.",
                category: "clothing",
                stock: 12
            },
            {
                id: 5,
                name: "Sofá 3 Lugares",
                price: 1799.00,
                image: "https://m.media-amazon.com/images/I/81+1V+q2DHL._AC_UF1000,1000_QL80_.jpg",
                description: "Sofá confortável em tecido resistente, perfeito para sua sala.",
                category: "home",
                stock: 5
            },
            {
                id: 6,
                name: "Jogo de Panelas",
                price: 299.90,
                image: "https://m.media-amazon.com/images/I/71x+TVnZ9WL._AC_UF1000,1000_QL80_.jpg",
                description: "Conjunto completo de panelas antiaderentes em aço inox.",
                category: "home",
                stock: 20
            },
            {
                id: 7,
                name: "Fone Bluetooth",
                price: 159.90,
                image: "https://m.media-amazon.com/images/I/61UY9tkQXfL._AC_UF1000,1000_QL80_.jpg",
                description: "Fone de ouvido sem fio com cancelamento de ruído e 20h de bateria.",
                category: "electronics",
                stock: 25
            },
            {
                id: 8,
                name: "Relógio Inteligente",
                price: 399.00,
                image: "https://m.media-amazon.com/images/I/61+Q6RhJD4L._AC_UF1000,1000_QL80_.jpg",
                description: "Monitor de atividades físicas, batimentos cardíacos e notificações.",
                category: "electronics",
                stock: 10
            }
        ];

        // Shopping cart
        let cart = [];
        
        // DOM elements
        const productGrid = document.getElementById('productGrid');
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const categoryButtons = document.querySelectorAll('.category-btn');
        const sortSelect = document.getElementById('sortSelect');
        const cartCount = document.getElementById('cartCount');
        const whatsappButton = document.getElementById('whatsappButton');
        const productModal = document.getElementById('productModal');
        const closeModal = document.getElementById('closeModal');
        const modalProductName = document.getElementById('modalProductName');
        const modalProductImage = document.getElementById('modalProductImage');
        const modalProductDescription = document.getElementById('modalProductDescription');
        const modalProductPrice = document.getElementById('modalProductPrice');
        const modalProductStock = document.getElementById('modalProductStock');
        const productQuantity = document.getElementById('productQuantity');
        const decreaseQuantity = document.getElementById('decreaseQuantity');
        const increaseQuantity = document.getElementById('increaseQuantity');
        const addToCartBtn = document.getElementById('addToCartBtn');
        const buyNowBtn = document.getElementById('buyNowBtn');

        // Current selected product for the modal
        let currentProduct = null;
        let currentQuantity = 1;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts(products);
            setupEventListeners();
        });

        // Render products to the grid
        function renderProducts(productsToRender) {
            productGrid.innerHTML = '';
            
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white rounded-lg shadow overflow-hidden product-hover animate-fadeIn hover:shadow-md transition duration-300 border border-gray-100';
                productCard.dataset.category = product.category;
                
                // Stock indicator color
                let stockColor = 'text-green-500';
                if (product.stock < 5) {
                    stockColor = 'text-red-500';
                } else if (product.stock < 15) {
                    stockColor = 'text-yellow-500';
                }
                
                productCard.innerHTML = `
                    <div class="p-4">
                        <div class="h-40 flex items-center justify-center mb-4 bg-gray-50">
                            <img src="${product.image}" alt="${product.name}" class="h-full object-contain">
                        </div>
                        <h3 class="font-semibold text-lg mb-1 text-gray-800">${product.name}</h3>
                        <p class="text-gray-500 text-sm mb-2 line-clamp-2">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-indigo-600">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                            <span class="text-xs ${stockColor}">
                                <i class="fas fa-box"></i> ${product.stock} disponíveis
                            </span>
                        </div>
                    </div>
                    <div class="px-4 pb-4 flex space-x-2">
                        <button class="view-detail-btn w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition" 
                                data-id="${product.id}">
                            Detalhes
                        </button>
                        <button class="add-to-cart-btn w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition" 
                                data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                `;
                
                productGrid.appendChild(productCard);
            });
        }

        // Set up event listeners
        function setupEventListeners() {
            // Search functionality
            searchInput.addEventListener('input', filterProducts);
            searchButton.addEventListener('click', filterProducts);
            
            // Category filtering
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    categoryButtons.forEach(btn => btn.classList.remove('bg-indigo-100', 'border-indigo-300'));
                    button.classList.add('bg-indigo-100', 'border-indigo-300');
                    
                    const category = button.dataset.category;
                    filterProducts();
                });
            });
            
            // Sorting
            sortSelect.addEventListener('change', sortProducts);
            
            // Modal events
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('view-detail-btn')) {
                    const productId = parseInt(e.target.dataset.id);
                    showProductModal(productId);
                }
                
                if (e.target.classList.contains('add-to-cart-btn')) {
                    const productId = parseInt(e.target.dataset.id);
                    addToCart(productId, 1);
                }
            });
            
            closeModal.addEventListener('click', () => {
                productModal.classList.add('hidden');
            });
            
            // Quantity controls
            decreaseQuantity.addEventListener('click', () => {
                if (currentQuantity > 1) {
                    currentQuantity--;
                    productQuantity.textContent = currentQuantity;
                }
            });
            
            increaseQuantity.addEventListener('click', () => {
                if (currentProduct && currentQuantity < currentProduct.stock) {
                    currentQuantity++;
                    productQuantity.textContent = currentQuantity;
                }
            });
            
            // Add to cart from modal
            addToCartBtn.addEventListener('click', () => {
                if (currentProduct) {
                    addToCart(currentProduct.id, currentQuantity);
                    productModal.classList.add('hidden');
                }
            });
            
            // Buy now from modal (direct to WhatsApp)
            buyNowBtn.addEventListener('click', () => {
                if (currentProduct) {
                    const message = `Olá, gostaria de comprar o produto:\n\n*${currentProduct.name}*\nQuantidade: ${currentQuantity}\nValor unitário: R$ ${currentProduct.price.toFixed(2)}\nTotal: R$ ${(currentProduct.price * currentQuantity).toFixed(2)}\n\nPode confirmar se tem disponível?`;
                    const encodedMessage = encodeURIComponent(message);
                    whatsappButton.href = `https://wa.me/5511999999999?text=${encodedMessage}`;
                    window.open(whatsappButton.href, '_blank');
                    productModal.classList.add('hidden');
                }
            });
            
            // WhatsApp cart button (update with current cart)
            document.addEventListener('click', (e) => {
                if (e.target.closest('#whatsappButton') && cart.length > 0) {
                    e.preventDefault();
                    sendCartToWhatsApp();
                }
            });
        }

        // Filter products by search and category
        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = document.querySelector('.category-btn.bg-indigo-100')?.dataset.category || 'all';
            
            let filtered = products;
            
            // Filter by category
            if (selectedCategory !== 'all') {
                filtered = filtered.filter(product => product.category === selectedCategory);
            }
            
            // Filter by search term
            if (searchTerm) {
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) || 
                    product.description.toLowerCase().includes(searchTerm)
                );
            }
            
            renderProducts(filtered);
        }

        // Sort products
        function sortProducts() {
            const sortValue = sortSelect.value;
            let sorted = [...products];
            
            switch (sortValue) {
                case 'price-asc':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    sorted.sort((a, b) => b.name.localeCompare(a.name));
                    break;
            }
            
            renderProducts(sorted);
        }

        // Show product modal
        function showProductModal(productId) {
            currentProduct = products.find(p => p.id === productId);
            currentQuantity = 1;
            
            if (currentProduct) {
                modalProductName.textContent = currentProduct.name;
                modalProductImage.src = currentProduct.image;
                modalProductImage.alt = currentProduct.name;
                modalProductDescription.textContent = currentProduct.description;
                modalProductPrice.textContent = `R$ ${currentProduct.price.toFixed(2).replace('.', ',')}`;
                
                // Stock indicator
                let stockText = '';
                if (currentProduct.stock > 10) {
                    stockText = `${currentProduct.stock} disponíveis`;
                } else if (currentProduct.stock > 0) {
                    stockText = `Apenas ${currentProduct.stock} restantes!`;
                } else {
                    stockText = 'FORA DE ESTOQUE';
                }
                modalProductStock.textContent = `Estoque: ${stockText}`;
                modalProductStock.className = currentProduct.stock > 0 ? 'text-sm text-green-500' : 'text-sm text-red-500';
                
                productQuantity.textContent = currentQuantity;
                productModal.classList.remove('hidden');
            }
        }

        // Add product to cart
        function addToCart(productId, quantity) {
            const product = products.find(p => p.id === productId);
            
            if (!product) return;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }
            
            updateCartCount();
            
            // Show notification
            showNotification(`${quantity}x ${product.name} adicionado ao carrinho!`);
        }

        // Update cart count display
        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update WhatsApp button with cart items
            if (totalItems > 0) {
                whatsappButton.classList.add('pulse-whatsapp');
            } else {
                whatsappButton.classList.remove('pulse-whatsapp');
            }
        }

        // Send cart to WhatsApp
        function sendCartToWhatsApp() {
            let message = "Olá, gostaria de comprar os seguintes itens:\n\n";
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                message += `*${item.name}*\nQuantidade: ${item.quantity}\nValor unitário: R$ ${item.price.toFixed(2)}\nTotal: R$ ${itemTotal.toFixed(2)}\n\n`;
                total += itemTotal;
            });
            
            message += `*Total da compra: R$ ${total.toFixed(2)}*\n\nPode confirmar a disponibilidade?`;
            
            const encodedMessage = encodeURIComponent(message);
            whatsappButton.href = `https://wa.me/5511999999999?text=${encodedMessage}`;
            window.open(whatsappButton.href, '_blank');
        }

        // Show notification
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded shadow-lg flex items-center animate-fadeIn';
            notification.innerHTML = `
                <i class="fas fa-check-circle mr-2"></i>
                ${message}
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                notification.classList.remove('animate-fadeIn');
                notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    