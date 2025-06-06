// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Service category tabs
const categoryButtons = document.querySelectorAll('.service-category-btn');
const serviceCategories = document.querySelectorAll('.service-category');

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Remove active class from all buttons
        categoryButtons.forEach(btn => {
            btn.classList.remove('active', 'bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'hover:bg-blue-600', 'hover:text-white');
        });
        
        // Add active class to clicked button
        this.classList.add('active', 'bg-blue-600', 'text-white');
        this.classList.remove('bg-gray-200', 'hover:bg-blue-600', 'hover:text-white');
        
        // Hide all service categories
        serviceCategories.forEach(cat => {
            cat.classList.add('hidden');
        });
        
        // Show selected category
        document.getElementById(`${category}-services`).classList.remove('hidden');
    });
});

// Modal functionality
function openModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalAction = document.getElementById('modal-action');
    
    if (type === 'orçamento') {
        modalTitle.textContent = 'Solicitar Orçamento';
        modalContent.innerHTML = `
            <p class="mb-4">Preencha o formulário abaixo para receber um orçamento personalizado:</p>
            <form id="orcamento-form" class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-1">Nome</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-1">E-mail</label>
                    <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-1">Telefone</label>
                    <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-1">Serviço</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                        <option value="">Selecione um serviço</option>
                        <option value="celular">Manutenção de Celular</option>
                        <option value="tablet">Manutenção de Tablet</option>
                        <option value="notebook">Manutenção de Notebook</option>
                        <option value="eletronico">Serviço Eletrônico</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 mb-1">Descrição</label>
                    <textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="3" required></textarea>
                </div>
            </form>
        `;
        modalAction.textContent = 'Enviar';
    } else if (type === 'acessorios') {
        modalTitle.textContent = 'Consultar Disponibilidade';
        modalContent.innerHTML = `
            <p class="mb-4">Informe o acessório que você está procurando:</p>
            <form id="acessorio-form" class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-1">Nome</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-1">E-mail</label>
                    <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-1">Telefone</label>
                    <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-1">Acessório</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                        <option value="">Selecione um acessório</option>
                        <option value="fone">Fone de Ouvido</option>
                        <option value="capa">Capa Protetora</option>
                        <option value="carregador">Carregador</option>
                        <option value="pelicula">Película</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 mb-1">Modelo do Dispositivo</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Ex: iPhone 13, Samsung Galaxy S21" required>
                </div>
            </form>
        `;
        modalAction.textContent = 'Consultar';
    }
    
    modal.classList.remove('hidden');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('div');
    
    if (event.target === modal) {
        closeModal();
    }
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você adicionaria o código para enviar o formulário
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Ver Opções para Acessórios
document.querySelectorAll('.bg-blue-500.hover\\:bg-blue-600.text-white.text-xs.px-3.py-1.rounded-full').forEach(button => {
    button.addEventListener('click', function() {
        const acessorioCard = this.closest('.bg-white.rounded-lg');
        
        // Verificar se já existe uma seção de opções
        let opcoesSection = acessorioCard.querySelector('.opcoes-section');
        
        if (opcoesSection) {
            // Se já existe, alternar visibilidade
            opcoesSection.classList.toggle('hidden');
            return;
        }
        
        // Criar a seção de opções
        opcoesSection = document.createElement('div');
        opcoesSection.className = 'opcoes-section mt-4 pt-4 border-t border-gray-200';
        
        // Determinar o tipo de acessório
        const acessorioTitulo = acessorioCard.querySelector('h3').textContent;
        let opcoes = [];
        
        if (acessorioTitulo.includes('Fones')) {
            opcoes = [
                { nome: 'Fone Bluetooth TWS', preco: 'R$89,90' },
                { nome: 'Fone com Fio Estéreo', preco: 'R$45,00' },
                { nome: 'Headphone Over-ear', preco: 'R$129,90' },
                { nome: 'Fone Esportivo', preco: 'R$69,90' }
            ];
        } else if (acessorioTitulo.includes('Capas')) {
            opcoes = [
                { nome: 'Capa Anti-impacto', preco: 'R$49,90' },
                { nome: 'Capa Transparente', preco: 'R$35,00' },
                { nome: 'Capa Carteira', preco: 'R$59,90' },
                { nome: 'Capa Personalizada', preco: 'R$45,00' }
            ];
        } else if (acessorioTitulo.includes('Carregadores')) {
            opcoes = [
                { nome: 'Carregador Rápido', preco: 'R$59,90' },
                { nome: 'Carregador Wireless', preco: 'R$89,90' },
                { nome: 'Carregador Veicular', preco: 'R$45,00' },
                { nome: 'Cabo USB Reforçado', preco: 'R$30,00' }
            ];
        } else if (acessorioTitulo.includes('Películas')) {
            opcoes = [
                { nome: 'Película de Vidro', preco: 'R$29,90' },
                { nome: 'Película Privacidade', preco: 'R$39,90' },
                { nome: 'Película Hidrogel', preco: 'R$49,90' },
                { nome: 'Película Câmera', preco: 'R$20,00' }
            ];
        }
        
        // Criar o HTML das opções
        let opcoesHTML = '<h4 class="font-semibold mb-3">Opções Disponíveis:</h4><ul class="space-y-2">';
        
        opcoes.forEach(opcao => {
            opcoesHTML += `
                <li class="flex justify-between items-center">
                    <span>${opcao.nome}</span>
                    <span class="font-semibold text-blue-600">${opcao.preco}</span>
                </li>
            `;
        });
        
        opcoesHTML += '</ul>';
        opcoesSection.innerHTML = opcoesHTML;
        
        // Adicionar a seção ao card
        acessorioCard.querySelector('.p-4').appendChild(opcoesSection);
    });
});

