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
            <p class="mb-2">Preencha o formulário para orçamento:</p>
            <form id="orcamento-form" class="space-y-2">
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="text-sm text-gray-700">Nome</label>
                        <input type="text" name="nome" class="w-full px-2 py-1 text-sm border border-gray-300 rounded" required>
                    </div>
                    <div>
                        <label class="text-sm text-gray-700">Telefone</label>
                        <input type="tel" name="telefone" class="w-full px-2 py-1 text-sm border border-gray-300 rounded" required>
                    </div>
                </div>
                <div>
                    <label class="text-sm text-gray-700">Serviço</label>
                    <select name="servico" class="w-full px-2 py-1 text-sm border border-gray-300 rounded" required>
                        <option value="">Selecione</option>
                        <option value="celular">Manutenção de Celular</option>
                        <option value="tablet">Manutenção de Tablet</option>
                        <option value="notebook">Manutenção de Notebook</option>
                        <option value="eletronico">Serviço Eletrônico</option>
                    </select>
                </div>
                <div>
                    <label class="text-sm text-gray-700">Descrição</label>
                    <textarea name="descricao" class="w-full px-2 py-1 text-sm border border-gray-300 rounded" rows="2" required></textarea>
                </div>
            </form>
        `;
        modalAction.textContent = 'Enviar para WhatsApp';
    } else if (type === 'acessorios') {
        modalTitle.textContent = 'Consultar Disponibilidade';
        modalContent.innerHTML = `
            <p class="mb-2">Informe o acessório que você procura:</p>
            <form id="acessorio-form" class="space-y-2">
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="text-sm text-gray-700">Nome</label>
                        <input type="text" name="nome" class="w-full px-2 py-1 text-sm border border-gray-300 rounded" required>
                    </div>
                    <div>
                        <label class="text-sm text-gray-700">Telefone</label>
                        <input type="tel" name="telefone" class="w-full px-2 py-1 text-sm border border-gray-300 rounded" required>
                    </div>
                </div>
                <div>
                    <label class="text-sm text-gray-700">Acessório</label>
                    <select name="acessorio" class="w-full px-2 py-1 text-sm border border-gray-300 rounded" required>
                        <option value="">Selecione</option>
                        <option value="fone">Fone de Ouvido</option>
                        <option value="capa">Capa Protetora</option>
                        <option value="carregador">Carregador</option>
                        <option value="pelicula">Película</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                <div>
                    <label class="text-sm text-gray-700">Modelo do Dispositivo</label>
                    <input type="text" name="modelo" class="w-full px-2 py-1 text-sm border border-gray-300 rounded" placeholder="Ex: iPhone 13, Galaxy S21" required>
                </div>
            </form>
        `;
        modalAction.textContent = 'Enviar para WhatsApp';
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
document.querySelectorAll('a[href^=""]').forEach(anchor => {
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


// Função para enviar dados para WhatsApp
function enviarParaWhatsApp() {
    // Número de telefone para enviar a mensagem (com código do país)
    const numeroWhatsApp = "5511998750637";
    
    // Identificar qual formulário está ativo
    const tipoFormulario = document.getElementById('modal-title').textContent;
    let formData = {};
    let mensagem = "";
    
    if (tipoFormulario === 'Solicitar Orçamento') {
        // Coletar dados do formulário de orçamento
        const form = document.getElementById('orcamento-form');
        const nome = form.querySelector('input[name="nome"]').value;
        const telefone = form.querySelector('input[name="telefone"]').value;
        const servico = form.querySelector('select[name="servico"]').value;
        const descricao = form.querySelector('textarea[name="descricao"]').value;
        
        // Formatar a mensagem
        mensagem = `*Solicitação de Orçamento*%0A%0A`;
        mensagem += `*Nome:* ${nome}%0A`;
        mensagem += `*Telefone:* ${telefone}%0A`;
        mensagem += `*Serviço:* ${servico}%0A`;
        mensagem += `*Descrição:* ${descricao}%0A`;
    } 
    else if (tipoFormulario === 'Consultar Disponibilidade') {
        // Coletar dados do formulário de acessórios
        const form = document.getElementById('acessorio-form');
        const nome = form.querySelector('input[name="nome"]').value;
        const telefone = form.querySelector('input[name="telefone"]').value;
        const acessorio = form.querySelector('select[name="acessorio"]').value;
        const modelo = form.querySelector('input[name="modelo"]').value;
        
        // Formatar a mensagem
        mensagem = `*Consulta de Disponibilidade*%0A%0A`;
        mensagem += `*Nome:* ${nome}%0A`;
        mensagem += `*Telefone:* ${telefone}%0A`;
        mensagem += `*Acessório:* ${acessorio}%0A`;
        mensagem += `*Modelo:* ${modelo}%0A`;
    }
    
    // Verificar se os campos obrigatórios foram preenchidos
    if (mensagem) {
        // Criar o link do WhatsApp
        const whatsappLink = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
        
        // Abrir o link em uma nova janela
        window.open(whatsappLink, '_blank');
        
        // Fechar o modal
        closeModal();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

// Adicionar validação de formulário antes de enviar
document.getElementById('modal-action').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Identificar qual formulário está ativo
    const tipoFormulario = document.getElementById('modal-title').textContent;
    let form;
    
    if (tipoFormulario === 'Solicitar Orçamento') {
        form = document.getElementById('orcamento-form');
    } else if (tipoFormulario === 'Consultar Disponibilidade') {
        form = document.getElementById('acessorio-form');
    }
    
    // Verificar se todos os campos obrigatórios foram preenchidos
    const camposObrigatorios = form.querySelectorAll('[required]');
    let todosPreenchidos = true;
    
    camposObrigatorios.forEach(campo => {
        if (!campo.value.trim()) {
            todosPreenchidos = false;
            campo.classList.add('border-red-500');
        } else {
            campo.classList.remove('border-red-500');
        }
    });
    
    if (todosPreenchidos) {
        enviarParaWhatsApp();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

