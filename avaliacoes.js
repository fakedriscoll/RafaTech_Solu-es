// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBXOABPeUk6wV6yF6d8JoL2f0h1Rm4cjio",
    authDomain: "rafatech-solucoes.firebaseapp.com",
    projectId: "rafatech-solucoes",
    storageBucket: "rafatech-solucoes.firebasestorage.app",
    messagingSenderId: "95771610184",
    appId: "1:95771610184:web:b13d24bb55392e4d3f0119"
};

// Inicializar o Firebase se ainda não estiver inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Referência ao Firestore
const db = firebase.firestore();
const avaliacoesRef = db.collection('avaliacoes');

// Variáveis globais
let myChart = null;
let avaliacoes = [];

// Função para mostrar mensagem de status
function showStatusMessage(message, isError = false) {
    const statusElement = document.getElementById('status-message');
    if (!statusElement) return;
    
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

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });
    }
    
    // Carregar avaliações do Firestore
    loadAvaliacoes();
    
    // Funcionalidade para filtrar avaliações
    const filterButtons = document.querySelectorAll('.filter-btn');
    
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
            const avaliacaoCards = document.querySelectorAll('.avaliacao-card');
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
    setupStarRating();
    
    // Envio do formulário de avaliação
    const avaliacaoForm = document.getElementById('avaliacao-form');
    if (avaliacaoForm) {
        avaliacaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificar se o usuário está logado
            const currentUser = JSON.parse(localStorage.getItem('rafatech_current_user'));
            if (!currentUser || !currentUser.loggedIn) {
                showStatusMessage('Você precisa estar logado para enviar uma avaliação. Redirecionando para a página de login...', true);
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
                return;
            }
            
            // Validar campos
            const nome = document.getElementById('avaliacao-nome')?.value;
            const titulo = document.getElementById('avaliacao-titulo')?.value;
            const rating = document.getElementById('avaliacao-rating')?.value;
            const comentario = document.getElementById('avaliacao-comentario')?.value;
            const servico = document.getElementById('avaliacao-servico')?.value;
            
            if (!nome || !titulo || rating === '0' || !comentario || !servico) {
                showStatusMessage('Por favor, preencha todos os campos e selecione uma classificação.', true);
                return;
            }
            
            // Determinar a categoria com base no serviço selecionado
            let categoria = 'celulares';
            if (servico.includes('Tablet')) {
                categoria = 'tablets';
            } else if (servico.includes('Notebook')) {
                categoria = 'notebooks';
            } else if (servico.includes('Detector') || servico.includes('Projeto') || servico.includes('Automação') || servico.includes('IoT') || servico.includes('Consultoria')) {
                categoria = 'eletronicos';
            }
            
            // Criar a data atual formatada
            const dataAtual = new Date();
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            const ano = dataAtual.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;
            
            // Criar objeto de avaliação para salvar no Firestore
            const novaAvaliacaoData = {
                nome: nome,
                titulo: titulo,
                rating: parseInt(rating),
                comentario: comentario,
                servico: servico,
                categoria: categoria,
                data: dataFormatada,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userId: currentUser.uid
            };
            
            // Salvar no Firestore
            avaliacoesRef.add(novaAvaliacaoData)
                .then((docRef) => {
                    // Adicionar ID do documento ao objeto
                    novaAvaliacaoData.id = docRef.id;
                    
                    // Adicionar a nova avaliação à página
                    addAvaliacaoToPage(novaAvaliacaoData);
                    
                    // Adicionar à lista global de avaliações
                    avaliacoes.push(novaAvaliacaoData);
                    
                    // Mostrar mensagem de sucesso
                    showStatusMessage('Sua avaliação foi enviada com sucesso! Obrigado pelo feedback.');
                    
                    // Limpar o formulário
                    avaliacaoForm.reset();
                    resetStarRating();
                    
                    // Atualizar o gráfico
                    updateChartForAllCategories();
                })
                .catch((error) => {
                    console.error("Erro ao salvar avaliação: ", error);
                    showStatusMessage('Erro ao enviar avaliação. Por favor, tente novamente.', true);
                });
        });
    }
    
    // Criar o elemento para o gráfico de pizza
    createChartSection();
    
    // Inicializar o gráfico de pizza
    initializeChart();
});

// Função para configurar o sistema de estrelas
function setupStarRating() {
    const starRatings = document.querySelectorAll('.star-rating');
    const ratingInput = document.getElementById('avaliacao-rating');
    
    if (starRatings.length > 0 && ratingInput) {
        starRatings.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingInput.value = rating;
                
                // Atualizar visual das estrelas
                updateStarsDisplay(rating);
            });
            
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                
                // Efeito hover nas estrelas
                starRatings.forEach(s => {
                    const sRating = parseInt(s.getAttribute('data-rating'));
                    if (sRating <= rating) {
                        s.classList.add('text-yellow-300');
                        s.classList.remove('text-gray-300');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                const currentRating = parseInt(ratingInput.value) || 0;
                
                // Restaurar estado das estrelas após hover
                starRatings.forEach(s => {
                    const sRating = parseInt(s.getAttribute('data-rating'));
                    s.classList.remove('text-yellow-300');
                    
                    if (currentRating > 0 && sRating <= currentRating) {
                        s.classList.add('text-yellow-400');
                        s.classList.remove('text-gray-300');
                    } else {
                        s.classList.add('text-gray-300');
                        s.classList.remove('text-yellow-400');
                    }
                });
            });
        });
    }
}

// Função para atualizar a exibição das estrelas
function updateStarsDisplay(rating) {
    const starRatings = document.querySelectorAll('.star-rating');
    
    starRatings.forEach(s => {
        const sRating = parseInt(s.getAttribute('data-rating'));
        if (sRating <= rating) {
            s.classList.remove('text-gray-300', 'text-yellow-300');
            s.classList.add('text-yellow-400');
        } else {
            s.classList.remove('text-yellow-400', 'text-yellow-300');
            s.classList.add('text-gray-300');
        }
    });
}

// Função para resetar a classificação por estrelas
function resetStarRating() {
    const starRatings = document.querySelectorAll('.star-rating');
    const ratingInput = document.getElementById('avaliacao-rating');
    
    if (ratingInput) {
        ratingInput.value = '0';
    }
    
    starRatings.forEach(s => {
        s.classList.remove('text-yellow-400', 'text-yellow-300');
        s.classList.add('text-gray-300');
    });
}

// Função para carregar avaliações do Firestore
function loadAvaliacoes() {
    // Referência ao indicador de carregamento
    const loadingIndicator = document.querySelector('.avaliacao-loading');
    
    // Buscar avaliações do Firestore, ordenadas por timestamp (mais recentes primeiro)
    avaliacoesRef.orderBy('timestamp', 'desc').get()
        .then((querySnapshot) => {
            // Limpar a lista global de avaliações
            avaliacoes = [];
            
            // Remover o indicador de carregamento
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
            
            // Limpar o container de avaliações (exceto o indicador de carregamento)
            const avaliacoesContainer = document.getElementById('avaliacoes-container');
            if (!avaliacoesContainer) return;
            
            const avaliacaoCards = document.querySelectorAll('.avaliacao-card');
            avaliacaoCards.forEach(card => card.remove());
            
            // Se não houver avaliações, mostrar mensagem
            if (querySnapshot.empty) {
                const noAvaliacoesMsg = document.createElement('div');
                noAvaliacoesMsg.className = 'col-span-full text-center py-8 text-gray-500';
                noAvaliacoesMsg.textContent = 'Ainda não há avaliações. Seja o primeiro a avaliar!';
                avaliacoesContainer.appendChild(noAvaliacoesMsg);
                return;
            }
            
            // Adicionar cada avaliação à página e à lista global
            querySnapshot.forEach((doc) => {
                const avaliacaoData = doc.data();
                avaliacaoData.id = doc.id;
                avaliacoes.push(avaliacaoData);
                addAvaliacaoToPage(avaliacaoData);
            });
            
            // Atualizar o gráfico
            updateChartForAllCategories();
        })
        .catch((error) => {
            console.error("Erro ao carregar avaliações: ", error);
            
            // Remover o indicador de carregamento
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
            
            // Mostrar mensagem de erro
            showStatusMessage('Erro ao carregar avaliações. Por favor, recarregue a página.', true);
        });
}

// Função para adicionar uma avaliação à página
function addAvaliacaoToPage(avaliacaoData) {
    const avaliacoesContainer = document.getElementById('avaliacoes-container');
    if (!avaliacoesContainer) return;
    
    // Criar um novo elemento de avaliação
    const novaAvaliacao = document.createElement('div');
    novaAvaliacao.className = 'avaliacao-card bg-white p-6 rounded-lg shadow-md';
    novaAvaliacao.setAttribute('data-categoria', avaliacaoData.categoria);
    novaAvaliacao.setAttribute('data-id', avaliacaoData.id);
    
    // Criar o HTML das estrelas
    let estrelas = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= avaliacaoData.rating) {
            estrelas += '<i class="fas fa-star text-yellow-400"></i>';
        } else if (i - 0.5 <= avaliacaoData.rating) {
            estrelas += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
        } else {
            estrelas += '<i class="far fa-star text-gray-300"></i>';
        }
    }
    
    // Criar o HTML da avaliação
    novaAvaliacao.innerHTML = `
        <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden flex items-center justify-center">
                <i class="fas fa-user text-2xl text-gray-500"></i>
            </div>
            <div>
                <h4 class="font-semibold">${avaliacaoData.nome}</h4>
                <div class="flex text-sm">
                    ${estrelas}
                </div>
            </div>
        </div>
        <h5 class="font-semibold mb-2">${avaliacaoData.titulo}</h5>
        <p class="text-gray-600 mb-3">"${avaliacaoData.comentario}"</p>
        <div class="text-sm text-gray-500">
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">${avaliacaoData.servico}</span>
            <span class="ml-2">${avaliacaoData.data}</span>
        </div>
    `;
    
    // Verificar se o usuário atual é o autor da avaliação
    const currentUser = JSON.parse(localStorage.getItem('rafatech_current_user'));
    if (currentUser && currentUser.uid === avaliacaoData.userId) {
        // Adicionar botões de editar e excluir
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'flex justify-end mt-3 space-x-2';
        
        // Botão de editar
        const editButton = document.createElement('button');
        editButton.className = 'text-blue-600 hover:text-blue-800';
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => editAvaliacao(avaliacaoData.id));
        
        // Botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.className = 'text-red-600 hover:text-red-800';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener('click', () => deleteAvaliacao(avaliacaoData.id));
        
        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);
        novaAvaliacao.appendChild(actionsDiv);
    }
    
    // Adicionar a nova avaliação ao container (no início)
    avaliacoesContainer.prepend(novaAvaliacao);
    
    // Verificar se há um filtro ativo
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) {
        const filter = activeFilter.getAttribute('data-filter');
        if (filter !== 'todos' && avaliacaoData.categoria !== filter) {
            novaAvaliacao.style.display = 'none';
        }
    }
}

// Função para editar uma avaliação
function editAvaliacao(avaliacaoId) {
    // Buscar a avaliação no Firestore
    avaliacoesRef.doc(avaliacaoId).get()
        .then((doc) => {
            if (doc.exists) {
                const avaliacaoData = doc.data();
                
                // Preencher o formulário com os dados da avaliação
                document.getElementById('avaliacao-nome').value = avaliacaoData.nome;
                document.getElementById('avaliacao-titulo').value = avaliacaoData.titulo;
                document.getElementById('avaliacao-rating').value = avaliacaoData.rating;
                document.getElementById('avaliacao-comentario').value = avaliacaoData.comentario;
                document.getElementById('avaliacao-servico').value = avaliacaoData.servico;
                
                // Atualizar a exibição das estrelas
                updateStarsDisplay(avaliacaoData.rating);
                
                // Rolar até o formulário
                document.getElementById('avaliacao-form-container').scrollIntoView({ behavior: 'smooth' });
                
                // Modificar o botão de envio para atualizar
                const submitButton = document.querySelector('#avaliacao-form button[type="submit"]');
                submitButton.textContent = 'Atualizar Avaliação';
                submitButton.dataset.editing = avaliacaoId;
                
                // Adicionar botão de cancelar
                if (!document.getElementById('cancel-edit-button')) {
                    const cancelButton = document.createElement('button');
                    cancelButton.id = 'cancel-edit-button';
                    cancelButton.className = 'bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg w-full mt-4 transition';
                    cancelButton.textContent = 'Cancelar Edição';
                    cancelButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Restaurar o botão de envio
                        submitButton.textContent = 'Enviar Avaliação';
                        delete submitButton.dataset.editing;
                        
                        // Limpar o formulário
                        document.getElementById('avaliacao-form').reset();
                        resetStarRating();
                        
                        // Remover o botão de cancelar
                        this.remove();
                    });
                    
                    submitButton.parentNode.appendChild(cancelButton);
                }
                
                // Modificar o evento de envio do formulário
                const form = document.getElementById('avaliacao-form');
                const originalSubmitHandler = form.onsubmit;
                
                form.onsubmit = function(e) {
                    e.preventDefault();
                    
                    // Se estiver editando
                    if (submitButton.dataset.editing) {
                        const editId = submitButton.dataset.editing;
                        
                        // Obter os valores atualizados
                        const nome = document.getElementById('avaliacao-nome').value;
                        const titulo = document.getElementById('avaliacao-titulo').value;
                        const rating = document.getElementById('avaliacao-rating').value;
                        const comentario = document.getElementById('avaliacao-comentario').value;
                        const servico = document.getElementById('avaliacao-servico').value;
                        
                        // Validar campos
                        if (!nome || !titulo || rating === '0' || !comentario || !servico) {
                            showStatusMessage('Por favor, preencha todos os campos e selecione uma classificação.', true);
                            return;
                        }
                        
                        // Determinar a categoria com base no serviço selecionado
                        let categoria = 'celulares';
                        if (servico.includes('Tablet')) {
                            categoria = 'tablets';
                        } else if (servico.includes('Notebook')) {
                            categoria = 'notebooks';
                        } else if (servico.includes('Detector') || servico.includes('Projeto') || servico.includes('Automação') || servico.includes('IoT') || servico.includes('Consultoria')) {
                            categoria = 'eletronicos';
                        }
                        
                        // Atualizar no Firestore
                        avaliacoesRef.doc(editId).update({
                            nome: nome,
                            titulo: titulo,
                            rating: parseInt(rating),
                            comentario: comentario,
                            servico: servico,
                            categoria: categoria
                        })
                        .then(() => {
                            // Atualizar na página
                            const avaliacaoCard = document.querySelector(`.avaliacao-card[data-id="${editId}"]`);
                            if (avaliacaoCard) {
                                // Atualizar na lista global
                                const index = avaliacoes.findIndex(a => a.id === editId);
                                if (index !== -1) {
                                    avaliacoes[index].nome = nome;
                                    avaliacoes[index].titulo = titulo;
                                    avaliacoes[index].rating = parseInt(rating);
                                    avaliacoes[index].comentario = comentario;
                                    avaliacoes[index].servico = servico;
                                    avaliacoes[index].categoria = categoria;
                                }
                                
                                // Recarregar a página para mostrar as alterações
                                loadAvaliacoes();
                            }
                            
                            // Mostrar mensagem de sucesso
                            showStatusMessage('Avaliação atualizada com sucesso!');
                            
                            // Restaurar o botão de envio
                            submitButton.textContent = 'Enviar Avaliação';
                            delete submitButton.dataset.editing;
                            
                            // Limpar o formulário
                            form.reset();
                            resetStarRating();
                            
                            // Remover o botão de cancelar
                            document.getElementById('cancel-edit-button')?.remove();
                            
                            // Restaurar o evento de envio original
                            form.onsubmit = originalSubmitHandler;
                            
                            // Atualizar o gráfico
                            updateChartForAllCategories();
                        })
                        .catch((error) => {
                            console.error("Erro ao atualizar avaliação: ", error);
                            showStatusMessage('Erro ao atualizar avaliação. Por favor, tente novamente.', true);
                        });
                    } else {
                        // Se não estiver editando, usar o manipulador original
                        if (originalSubmitHandler) {
                            originalSubmitHandler.call(this, e);
                        }
                    }
                };
            } else {
                showStatusMessage('Avaliação não encontrada.', true);
            }
        })
        .catch((error) => {
            console.error("Erro ao buscar avaliação: ", error);
            showStatusMessage('Erro ao buscar avaliação. Por favor, tente novamente.', true);
        });
}

// Função para excluir uma avaliação
function deleteAvaliacao(avaliacaoId) {
    if (confirm('Tem certeza que deseja excluir esta avaliação?')) {
        // Excluir do Firestore
        avaliacoesRef.doc(avaliacaoId).delete()
            .then(() => {
                // Remover da página
                const avaliacaoCard = document.querySelector(`.avaliacao-card[data-id="${avaliacaoId}"]`);
                if (avaliacaoCard) {
                    avaliacaoCard.remove();
                }
                
                // Remover da lista global
                const index = avaliacoes.findIndex(a => a.id === avaliacaoId);
                if (index !== -1) {
                    avaliacoes.splice(index, 1);
                }
                
                // Mostrar mensagem de sucesso
                showStatusMessage('Avaliação excluída com sucesso!');
                
                // Atualizar o gráfico
                updateChartForAllCategories();
                
                // Se não houver mais avaliações, mostrar mensagem
                if (document.querySelectorAll('.avaliacao-card').length === 0) {
                    const avaliacoesContainer = document.getElementById('avaliacoes-container');
                    const noAvaliacoesMsg = document.createElement('div');
                    noAvaliacoesMsg.className = 'col-span-full text-center py-8 text-gray-500';
                    noAvaliacoesMsg.textContent = 'Ainda não há avaliações. Seja o primeiro a avaliar!';
                    avaliacoesContainer.appendChild(noAvaliacoesMsg);
                }
            })
            .catch((error) => {
                console.error("Erro ao excluir avaliação: ", error);
                showStatusMessage('Erro ao excluir avaliação. Por favor, tente novamente.', true);
            });
    }
}

// Função para criar a seção do gráfico
function createChartSection() {
    // Verificar se já existe uma seção de gráfico
    if (document.getElementById('chart-section')) return;
    
    // Criar a seção do gráfico
    const chartSection = document.createElement('div');
    chartSection.id = 'chart-section';
    chartSection.className = 'mb-12';
    
    // Criar o título
    const chartTitle = document.createElement('h3');
    chartTitle.className = 'text-2xl font-semibold mb-6 text-center text-gray-800';
    chartTitle.textContent = 'Distribuição das Avaliações';
    
    // Criar o container do gráfico
    const chartContainer = document.createElement('div');
    chartContainer.className = 'max-w-md mx-auto';
    
    // Criar o canvas para o gráfico
    const chartCanvas = document.createElement('canvas');
    chartCanvas.id = 'avaliacoes-chart';
    
    // Montar a estrutura
    chartContainer.appendChild(chartCanvas);
    chartSection.appendChild(chartTitle);
    chartSection.appendChild(chartContainer);
    
    // Adicionar à página antes do formulário de avaliação
    const formContainer = document.getElementById('avaliacao-form-container');
    if (formContainer) {
        formContainer.parentNode.insertBefore(chartSection, formContainer);
    }
}

// Função para inicializar o gráfico
function initializeChart() {
    const ctx = document.getElementById('avaliacoes-chart');
    if (!ctx) return;
    
    // Dados iniciais
    const data = {
        labels: ['Ruim (1-2★)', 'Médio (3★)', 'Bom (4★)', 'Excelente (5★)'],
        datasets: [{
            data: [0, 0, 0, 0],
            backgroundColor: ['#f87171', '#fbbf24', '#60a5fa', '#34d399'],
            borderWidth: 0,
            hoverOffset: 10
        }]
    };
    
    // Opções do gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 14
                    },
                    generateLabels: function(chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            const dataset = data.datasets[0];
                            const total = dataset.data.reduce((acc, value) => acc + value, 0);
                            
                            return data.labels.map(function(label, i) {
                                const value = dataset.data[i];
                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                
                                return {
                                    text: `${label}: ${percentage}% (${value})`,
                                    fillStyle: dataset.backgroundColor[i],
                                    hidden: isNaN(dataset.data[i]) || dataset.data[i] === 0,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                        return `${label}: ${value} avaliações (${percentage}%)`;
                    }
                }
            }
        }
    };
    
    // Criar o gráfico
    myChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
}

// Função para atualizar o gráfico para todas as categorias
function updateChartForAllCategories() {
    if (!myChart) return;
    
    // Contar avaliações por classificação
    const counts = [0, 0, 0, 0]; // [Ruim, Médio, Bom, Excelente]
    
    avaliacoes.forEach(avaliacao => {
        const rating = avaliacao.rating;
        if (rating <= 2) {
            counts[0]++; // Ruim (1-2 estrelas)
        } else if (rating === 3) {
            counts[1]++; // Médio (3 estrelas)
        } else if (rating === 4) {
            counts[2]++; // Bom (4 estrelas)
        } else if (rating === 5) {
            counts[3]++; // Excelente (5 estrelas)
        }
    });
    
    // Atualizar dados do gráfico
    myChart.data.datasets[0].data = counts;
    
    // Calcular porcentagens para os rótulos
    const total = counts.reduce((acc, val) => acc + val, 0);
    const percentages = counts.map(count => total > 0 ? Math.round((count / total) * 100) : 0);
    
    // Atualizar o gráfico
    myChart.update();
}

// Função para atualizar o gráfico para uma categoria específica
function updateChartForCategory(category) {
    if (!myChart) return;
    
    // Filtrar avaliações pela categoria
    const filteredAvaliacoes = avaliacoes.filter(avaliacao => avaliacao.categoria === category);
    
    // Contar avaliações por classificação
    const counts = [0, 0, 0, 0]; // [Ruim, Médio, Bom, Excelente]
    
    filteredAvaliacoes.forEach(avaliacao => {
        const rating = avaliacao.rating;
        if (rating <= 2) {
            counts[0]++; // Ruim (1-2 estrelas)
        } else if (rating === 3) {
            counts[1]++; // Médio (3 estrelas)
        } else if (rating === 4) {
            counts[2]++; // Bom (4 estrelas)
        } else if (rating === 5) {
            counts[3]++; // Excelente (5 estrelas)
        }
    });
    
    // Atualizar dados do gráfico
    myChart.data.datasets[0].data = counts;
    
    // Calcular porcentagens para os rótulos
    const total = counts.reduce((acc, val) => acc + val, 0);
    const percentages = counts.map(count => total > 0 ? Math.round((count / total) * 100) : 0);
    
    // Atualizar o gráfico
    myChart.update();
}

