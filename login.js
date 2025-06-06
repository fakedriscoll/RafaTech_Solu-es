<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - RafaTech</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" href="img/favicon.png" type="image/png">
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-auth-compat.js"></script>
</head>
<body class="font-sans bg-gray-50">
    <!-- Header/Navigation -->
    <header class="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center">
                <img src="img/favicon.png" alt="RafaTech Logo" class="h-8 mr-2">
                <h1 class="text-xl md:text-2xl font-bold">Rafa<span class="text-blue-300">Tech</span></h1>
            </div>
            
            <button id="mobile-menu-button" class="md:hidden text-white focus:outline-none">
                <i class="fas fa-bars text-xl"></i>
            </button>
            
            <nav class="hidden md:flex space-x-6">
                <a href="index.html#inicio" class="hover:text-blue-300 transition">Início</a>
                <a href="index.html#servicos" class="hover:text-blue-300 transition">Serviços</a>
                <a href="index.html#acessorios" class="hover:text-blue-300 transition">Acessórios</a>
                <a href="index.html#sobre" class="hover:text-blue-300 transition">Sobre</a>
                <a href="index.html#contato" class="hover:text-blue-300 transition">Contato</a>
                <a href="avaliacoes.html" class="hover:text-blue-300 transition">Avaliações</a>
                <a href="login.html" class="text-blue-300 transition">Login</a>
            </nav>
        </div>
        
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-blue-800 text-white py-3 px-4">
            <div class="flex flex-col space-y-3">
                <a href="index.html#inicio" class="hover:text-blue-300 transition">Início</a>
                <a href="index.html#servicos" class="hover:text-blue-300 transition">Serviços</a>
                <a href="index.html#acessorios" class="hover:text-blue-300 transition">Acessórios</a>
                <a href="index.html#sobre" class="hover:text-blue-300 transition">Sobre</a>
                <a href="index.html#contato" class="hover:text-blue-300 transition">Contato</a>
                <a href="avaliacoes.html" class="hover:text-blue-300 transition">Avaliações</a>
                <a href="login.html" class="text-blue-300 transition">Login</a>
            </div>
        </div>
    </header>

    <!-- Login Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-md mx-auto bg-gray-50 rounded-lg shadow-md p-8 border border-gray-200">
                <div class="text-center mb-8">
                    <img src="img/logo.png" alt="RafaTech Logo" class="h-24 mx-auto mb-4">
                    <h2 class="text-3xl font-bold text-gray-800">Acesso ao <span class="text-blue-600">Sistema</span></h2>
                    <p class="text-gray-600 mt-2">Entre com suas credenciais para acessar o sistema</p>
                </div>
                
                <!-- Tabs -->
                <div class="flex border-b border-gray-200 mb-6">
                    <button id="login-tab" class="flex-1 py-2 text-center text-blue-600 border-b-2 border-blue-600 font-medium">Login</button>
                    <button id="register-tab" class="flex-1 py-2 text-center text-gray-500 font-medium">Cadastro</button>
                </div>
                
                <!-- Login Form -->
                <form id="login-form" class="space-y-6">
                    <div>
                        <label for="login-email" class="block text-gray-700 mb-2">E-mail</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-envelope text-gray-400"></i>
                            </div>
                            <input type="email" id="login-email" name="email" class="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="seu@email.com" required>
                        </div>
                    </div>
                    
                    <div>
                        <label for="login-password" class="block text-gray-700 mb-2">Senha</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-lock text-gray-400"></i>
                            </div>
                            <input type="password" id="login-password" name="password" class="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required>
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <i class="fas fa-eye text-gray-400 cursor-pointer toggle-password"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input type="checkbox" id="remember" name="remember" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <label for="remember" class="ml-2 block text-sm text-gray-700">Lembrar-me</label>
                        </div>
                        <a href="#" id="forgot-password" class="text-sm text-blue-600 hover:text-blue-800">Esqueceu a senha?</a>
                    </div>
                    
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition">Entrar</button>
                </form>
                
                <!-- Register Form -->
                <form id="register-form" class="space-y-6 hidden">
                    <div>
                        <label for="register-name" class="block text-gray-700 mb-2">Nome Completo</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user text-gray-400"></i>
                            </div>
                            <input type="text" id="register-name" name="name" class="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Seu nome completo" required>
                        </div>
                    </div>
                    
                    <div>
                        <label for="register-email" class="block text-gray-700 mb-2">E-mail</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-envelope text-gray-400"></i>
                            </div>
                            <input type="email" id="register-email" name="email" class="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="seu@email.com" required>
                        </div>
                    </div>
                    
                    <div>
                        <label for="register-password" class="block text-gray-700 mb-2">Senha</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-lock text-gray-400"></i>
                            </div>
                            <input type="password" id="register-password" name="password" class="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required>
                        </div>
                    </div>
                    
                    <div>
                        <label for="register-confirm-password" class="block text-gray-700 mb-2">Confirmar Senha</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-lock text-gray-400"></i>
                            </div>
                            <input type="password" id="register-confirm-password" name="confirm-password" class="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required>
                        </div>
                    </div>
                    
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition">Cadastrar</button>
                </form>
                
                <!-- Status Messages -->
                <div id="status-message" class="mt-4 p-3 rounded-lg hidden"></div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-semibold mb-4">Sobre Nós</h3>
                    <p class="text-gray-400">A RafaTech oferece soluções tecnológicas completas, com foco em qualidade e atendimento personalizado.</p>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-4">Links Rápidos</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="index.html#inicio" class="hover:text-blue-300 transition">Início</a></li>
                        <li><a href="index.html#servicos" class="hover:text-blue-300 transition">Serviços</a></li>
                        <li><a href="index.html#acessorios" class="hover:text-blue-300 transition">Acessórios</a></li>
                        <li><a href="index.html#sobre" class="hover:text-blue-300 transition">Sobre</a></li>
                        <li><a href="index.html#contato" class="hover:text-blue-300 transition">Contato</a></li>
                        <li><a href="avaliacoes.html" class="hover:text-blue-300 transition">Avaliações</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-4">Contato</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><i class="fas fa-map-marker-alt mr-2 text-blue-300"></i> Rua Celulares, 123 - Centro</li>
                        <li><i class="fas fa-phone-alt mr-2 text-blue-300"></i> (11) 98765-4321</li>
                        <li><i class="fas fa-envelope mr-2 text-blue-300"></i> contato@rafatech.com.br</li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-4">Redes Sociais</h3>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-blue-300 transition text-2xl">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-blue-300 transition text-2xl">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-blue-300 transition text-2xl">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-blue-300 transition text-2xl">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2023 RafaTech Soluções Tecnológicas. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>

    <script src="login.js"></script>
</body>
</html>

