document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    });
    
    // Funcionalidade para filtrar avaliações
    const filterButtons = document.querySelectorAll('.filter-btn');
    const avaliacaoCards = document.querySelectorAll('.avaliacao-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-200', 'hover:bg-blue-600', 'hover:text-white');
            });
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('bg-gray-200', 'hover:bg-blue-600', 'hover:text-white');
            
            // Filtrar avaliações
            avaliacaoCards.forEach(card => {
                if (filter === 'todos' || card.getAttribute('data-categoria') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Atualizar o gráfico se estiver filtrando
            if (filter !== 'todos') {
                updateChartForCategory(filter);
            } else {
                updateChartForAllCategories();
            }
        });
    });
    
    // Sistema de classificação por estrelas
    const starRatings = document.querySelectorAll('.star-rating');
    const ratingInput = document.getElementById('avaliacao-rating');
    
    if (starRatings.length > 0 && ratingInput) {
        starRatings.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingInput.value = rating;
                
                // Atualizar visual das estrelas
                starRatings.forEach(s => {
                    const sRating = parseInt(s.getAttribute('data-rating'));
                    if (sRating <= rating) {
                        s.classList.remove('text-gray-300');
                        s.classList.add('text-yellow-400');
                    } else {
                        s.classList.remove('text-yellow-400');
                        s.classList.add('text-gray-300');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                
                // Efeito hover nas estrelas
                starRatings.forEach(s => {
                    const sRating = parseInt(s.getAttribute('data-rating'));
                    if (sRating <= rating) {
                        s.classList.add('text-yellow-300');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                const currentRating = parseInt(ratingInput.value);
                
                // Restaurar estado das estrelas após hover
                starRatings.forEach(s => {
                    const sRating = parseInt(s.getAttribute('data-rating'));
                    s.classList.remove('text-yellow-300');
                    
                    if (currentRating > 0 && sRating <= currentRating) {
                        s.classList.add('text-yellow-400');
                    } else {
                        s.classList.add('text-gray-300');
                    }
                });
            });
        });
    }
    
    // Envio do formulário de avaliação
    const avaliacaoForm = document.getElementById('avaliacao-form');
    if (avaliacaoForm) {
        avaliacaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const nome = document.getElementById('avaliacao-nome')?.value;
            const titulo = document.getElementById('avaliacao-titulo')?.value;
            const rating = document.getElementById('avaliacao-rating')?.value;
            const comentario = document.getElementById('avaliacao-comentario')?.value;
            const servico = document.getElementById('avaliacao-servico')?.value;
            
            if (!nome || !titulo || rating === '0' || !comentario || !servico) {
                alert('Por favor, preencha todos os campos e selecione uma classificação.');
                return;
            }
            
            // Aqui você adicionaria o código para enviar a avaliação para o servidor
            // Por enquanto, vamos apenas mostrar uma mensagem de sucesso e adicionar a avaliação na página
            
            // Criar um novo elemento de avaliação
            const novaAvaliacao = document.createElement('div');
            novaAvaliacao.className = 'avaliacao-card bg-white p-6 rounded-lg shadow-md';
            
            // Determinar a categoria com base no serviço selecionado
            let categoria = 'celulares';
            if (servico.includes('Tablet')) {
                categoria = 'tablets';
            } else if (servico.includes('Notebook')) {
                categoria = 'notebooks';
            } else if (servico.includes('Detector') || servico.includes('Projeto') || servico.includes('Automação') || servico.includes('IoT') || servico.includes('Consultoria')) {
                categoria = 'eletronicos';
            }
            
            novaAvaliacao.setAttribute('data-categoria', categoria);
            
            // Criar a data atual formatada
            const dataAtual = new Date();
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            const ano = dataAtual.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;
            
            // Criar o HTML da avaliação
            let estrelas = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    estrelas += '<i class="fas fa-star"></i>';
                } else if (i - 0.5 <= rating) {
                    estrelas += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    estrelas += '<i class="far fa-star"></i>';
                }
            }
            
            novaAvaliacao.innerHTML = `
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden flex items-center justify-center">
                        <i class="fas fa-user text-2xl text-gray-500"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold">${nome}</h4>
                        <div class="flex text-yellow-400 text-sm">
                            ${estrelas}
                        </div>
                    </div>
                </div>
                <h5 class="font-semibold mb-2">${titulo}</h5>
                <p class="text-gray-600 mb-3">"${comentario}"</p>
                <div class="text-sm text-gray-500">
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">${servico}</span>
                    <span class="ml-2">${dataFormatada}</span>
                </div>
            `;
            
            // Adicionar a nova avaliação ao container
            const avaliacoesContainer = document.getElementById('avaliacoes-container');
            if (avaliacoesContainer) {
                avaliacoesContainer.prepend(novaAvaliacao);
            }
            
            // Mostrar mensagem de sucesso
            alert('Sua avaliação foi enviada com sucesso! Obrigado pelo feedback.');
            
            // Limpar o formulário
            this.reset();
            starRatings.forEach(s => {
                s.classList.remove('text-yellow-400');
                s.classList.add('text-gray-300');
            });
            ratingInput.value = '0';
            
            // Atualizar a exibição de avaliações se houver um filtro ativo
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter) {
                const filter = activeFilter.getAttribute('data-filter');
                if (filter !== 'todos' && categoria !== filter) {
                    novaAvaliacao.style.display = 'none';
                }
            }
            
            // Atualizar o gráfico
            updateChartForAllCategories();
        });
    }
    
    // Criar o elemento para o gráfico de pizza
    createChartSection();
    
    // Inicializar o gráfico de pizza
    initializeChart();
});

// Função para criar a seção do gráfico
function createChartSection() {
    const avaliacoesContainer = document.querySelector('.container');
    if (!avaliacoesContainer) return;
    
    // Verificar se já existe uma seção de estatísticas
    let statsSection = document.getElementById('avaliacoes-stats');
    if (statsSection) return;
    
    // Criar a seção de estatísticas
    statsSection = document.createElement('div');
    statsSection.id = 'avaliacoes-stats';
    statsSection.className = 'mb-12 bg-white p-6 rounded-lg shadow-md';
    
    statsSection.innerHTML = `
        <h3 class="text-2xl font-semibold text-center mb-6 text-gray-800">Estatísticas de <span class="text-blue-600">Avaliações</span></h3>
        <div class="flex flex-col md:flex-row">
            <div class="md:w-1/2">
                <canvas id="avaliacoes-chart"></canvas>
            </div>
            <div class="md:w-1/2 flex items-center justify-center">
                <div class="stats-legend space-y-3">
                    <div class="flex items-center">
                        <div class="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                        <span>Ruim (1-2 estrelas)</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Médio (3 estrelas)</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                        <span>Bom (4 estrelas)</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span>Excelente (5 estrelas)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Inserir a seção após os filtros e antes do container de avaliações
    const filterSection = document.querySelector('.mb-8');
    if (filterSection) {
        filterSection.parentNode.insertBefore(statsSection, filterSection.nextSibling);
    } else {
        const avaliacoesContainer = document.getElementById('avaliacoes-container');
        if (avaliacoesContainer) {
            avaliacoesContainer.parentNode.insertBefore(statsSection, avaliacoesContainer);
        }
    }
}

// Função para inicializar o gráfico
function initializeChart() {
    const chartCanvas = document.getElementById('avaliacoes-chart');
    if (!chartCanvas) return;
    
    // Contar avaliações por categoria de estrelas
    updateChartForAllCategories();
}

// Função para atualizar o gráfico para todas as categorias
function updateChartForAllCategories() {
    const chartCanvas = document.getElementById('avaliacoes-chart');
    if (!chartCanvas) return;
    
    // Contar avaliações por categoria de estrelas
    const avaliacaoCards = document.querySelectorAll('.avaliacao-card');
    const ratings = countRatings(avaliacaoCards);
    
    // Criar ou atualizar o gráfico
    createOrUpdateChart(chartCanvas, ratings);
}

// Função para atualizar o gráfico para uma categoria específica
function updateChartForCategory(category) {
    const chartCanvas = document.getElementById('avaliacoes-chart');
    if (!chartCanvas) return;
    
    // Contar avaliações por categoria de estrelas apenas para a categoria selecionada
    const avaliacaoCards = document.querySelectorAll(`.avaliacao-card[data-categoria="${category}"]`);
    const ratings = countRatings(avaliacaoCards);
    
    // Criar ou atualizar o gráfico
    createOrUpdateChart(chartCanvas, ratings);
}

// Função para contar avaliações por categoria de estrelas
function countRatings(avaliacaoCards) {
    const ratings = {
        ruim: 0,
        medio: 0,
        bom: 0,
        excelente: 0
    };
    
    avaliacaoCards.forEach(card => {
        // Contar estrelas
        const stars = card.querySelectorAll('.fa-star, .fa-star-half-alt');
        const rating = stars.length;
        
        // Categorizar
        if (rating <= 2) {
            ratings.ruim++;
        } else if (rating === 3) {
            ratings.medio++;
        } else if (rating === 4) {
            ratings.bom++;
        } else if (rating === 5) {
            ratings.excelente++;
        }
    });
    
    return ratings;
}

// Função para criar ou atualizar o gráfico
function createOrUpdateChart(chartCanvas, ratings) {
    // Verificar se já existe um gráfico
    if (window.avaliacoesChart) {
        window.avaliacoesChart.destroy();
    }
    
    // Calcular o total de avaliações
    const total = ratings.ruim + ratings.medio + ratings.bom + ratings.excelente;
    
    // Calcular as porcentagens
    const percentRuim = total > 0 ? Math.round((ratings.ruim / total) * 100) : 0;
    const percentMedio = total > 0 ? Math.round((ratings.medio / total) * 100) : 0;
    const percentBom = total > 0 ? Math.round((ratings.bom / total) * 100) : 0;
    const percentExcelente = total > 0 ? Math.round((ratings.excelente / total) * 100) : 0;
    
    // Criar o gráfico
    window.avaliacoesChart = new Chart(chartCanvas, {
        type: 'pie',
        data: {
            labels: [
                `Ruim (1-2 estrelas): ${percentRuim}%`, 
                `Médio (3 estrelas): ${percentMedio}%`, 
                `Bom (4 estrelas): ${percentBom}%`, 
                `Excelente (5 estrelas): ${percentExcelente}%`
            ],
            datasets: [{
                data: [ratings.ruim, ratings.medio, ratings.bom, ratings.excelente],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',  // Vermelho
                    'rgba(245, 158, 11, 0.8)', // Amarelo
                    'rgba(59, 130, 246, 0.8)', // Azul
                    'rgba(34, 197, 94, 0.8)'   // Verde
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(34, 197, 94, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `${value} avaliações (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                        return percentage > 0 ? `${percentage}%` : '';
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 14
                    }
                }
            }
        },
        plugins: [{
            id: 'datalabels',
            beforeDraw: function(chart) {
                const ctx = chart.ctx;
                const data = chart.data.datasets[0].data;
                const total = data.reduce((a, b) => a + b, 0);
                
                if (total === 0) return;
                
                let angleOffset = 0;
                const halfRadius = chart.getDatasetMeta(0).data[0].outerRadius / 1.5;
                
                chart.data.datasets[0].data.forEach((value, i) => {
                    const percentage = Math.round((value / total) * 100);
                    if (percentage <= 0) return;
                    
                    // Calcular o ângulo médio para este segmento
                    const startAngle = chart.getDatasetMeta(0).data[i].startAngle;
                    const endAngle = chart.getDatasetMeta(0).data[i].endAngle;
                    const middleAngle = startAngle + (endAngle - startAngle) / 2;
                    
                    // Calcular a posição para o texto
                    const x = chart.getDatasetMeta(0).data[i].x + Math.cos(middleAngle) * halfRadius;
                    const y = chart.getDatasetMeta(0).data[i].y + Math.sin(middleAngle) * halfRadius;
                    
                    // Desenhar o texto
                    ctx.save();
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 14px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`${percentage}%`, x, y);
                    ctx.restore();
                });
            }
        }]
    });
}

