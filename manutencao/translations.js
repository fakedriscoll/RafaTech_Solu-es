// Sistema de traduções para RafaTech
const translations = {
    pt: {
        // Header/Navigation
        'nav-inicio': 'Início',
        'nav-servicos': 'Serviços',
        'nav-acessorios': 'Acessórios',
        'nav-sobre': 'Sobre',
        'nav-contato': 'Contato',
        'nav-login': 'Login',
        
        // Hero Section
        'hero-title': 'Soluções Tecnológicas Completas',
        'hero-subtitle': 'Manutenção especializada para celulares, tablets, notebooks e serviços de eletrônica',
        'hero-cta': 'Fale Conosco',
        
        // Services Section
        'services-title': 'Nossos',
        'services-title-highlight': 'Serviços',
        'service-category-celulares': 'Celulares',
        'service-category-tablets': 'Tablets',
        'service-category-notebooks': 'Notebooks',
        'service-category-eletronicos': 'Eletrônicos',
        
        // Celulares Services
        'celulares-services-title': 'Serviços para',
        'celulares-services-highlight': 'Celulares',
        'service-manutencao-geral': 'Manutenção Geral',
        'service-manutencao-geral-desc': 'Conserto de placas, substituição de componentes, e solução para todos os tipos de problemas técnicos em celulares.',
        'service-troca-tela': 'Troca de Tela',
        'service-troca-tela-desc': 'Substituição profissional de telas quebradas ou danificadas com peças originais ou de alta qualidade.',
        'service-troca-bateria': 'Troca de Bateria',
        'service-troca-bateria-desc': 'Substituição de baterias desgastadas, recuperando a autonomia original do seu dispositivo.',
        'service-recuperacao-liquido': 'Recuperação Pós-Líquido',
        'service-recuperacao-liquido-desc': 'Tratamento especializado para dispositivos que sofreram contato com líquidos.',
        'service-desbloqueio': 'Desbloqueio',
        'service-desbloqueio-desc': 'Desbloqueio de operadoras e remoção de contas Google/Apple ID com procedimento seguro.',
        'service-recuperacao-dados': 'Recuperação de Dados',
        'service-recuperacao-dados-desc': 'Recuperamos seus dados, fotos e informações importantes mesmo em casos complexos.',
        
        // Tablets Services
        'tablets-services-title': 'Serviços para',
        'tablets-services-highlight': 'Tablets',
        'service-manutencao-tablets': 'Manutenção de Tablets',
        'service-manutencao-tablets-desc': 'Reparo completo para tablets de todas as marcas, incluindo problemas de software e hardware.',
        'service-troca-tela-tablets': 'Troca de Tela',
        'service-troca-tela-tablets-desc': 'Substituição de telas quebradas ou com defeito em tablets, com garantia de qualidade.',
        'service-troca-bateria-tablets': 'Troca de Bateria',
        'service-troca-bateria-tablets-desc': 'Substituição de baterias para tablets com baixa autonomia ou que não carregam mais.',
        'service-recuperacao-dados-tablets': 'Recuperação de Dados',
        'service-recuperacao-dados-tablets-desc': 'Recuperação de fotos, documentos e arquivos importantes de tablets com problemas.',
        
        // Notebooks Services
        'notebooks-services-title': 'Serviços para',
        'notebooks-services-highlight': 'Notebooks',
        'service-manutencao-notebooks': 'Manutenção Geral',
        'service-manutencao-notebooks-desc': 'Diagnóstico e reparo de problemas em notebooks, incluindo falhas de hardware e software.',
        'service-upgrade-hardware': 'Upgrade de Hardware',
        'service-upgrade-hardware-desc': 'Aumento de memória RAM, troca de HD para SSD e outras melhorias para aumentar o desempenho.',
        'service-limpeza-manutencao': 'Limpeza e Manutenção',
        'service-limpeza-manutencao-desc': 'Limpeza interna, troca de pasta térmica e manutenção preventiva para evitar superaquecimento.',
        'service-recuperacao-dados-notebooks': 'Recuperação de Dados',
        'service-recuperacao-dados-notebooks-desc': 'Recuperação de arquivos de HDs danificados ou com problemas de sistema.',
        'service-instalacao-sistemas': 'Instalação de Sistemas',
        'service-instalacao-sistemas-desc': 'Instalação e configuração de sistemas operacionais e programas essenciais.',
        
        // Eletrônicos Services
        'eletronicos-services-title': 'Serviços',
        'eletronicos-services-highlight': 'Eletrônicos',
        'service-detectores-tensao': 'Detectores de Tensão',
        'service-detectores-tensao-desc': 'Venda, manutenção e calibração de detectores de tensão para uso profissional.',
        'service-projetos-eletronicos': 'Projetos Eletrônicos',
        'service-projetos-eletronicos-desc': 'Desenvolvimento de projetos eletrônicos personalizados para necessidades específicas.',
        'service-automacao-residencial': 'Automação Residencial',
        'service-automacao-residencial-desc': 'Soluções de automação para residências, incluindo controle de iluminação e segurança.',
        'service-projetos-iot': 'Projetos IoT',
        'service-projetos-iot-desc': 'Desenvolvimento de soluções de Internet das Coisas para conectar dispositivos e automatizar tarefas.',
        'service-consultoria-tecnica': 'Consultoria Técnica',
        'service-consultoria-tecnica-desc': 'Consultoria especializada para projetos eletrônicos e escolha de equipamentos adequados.',
        
        'btn-solicitar-orcamento': 'Solicitar Orçamento',
        
        // Accessories Section
        'accessories-title': 'Acessórios',
        'accessories-title-highlight': 'Disponíveis',
        'accessory-fones': 'Fones de Ouvido',
        'accessory-fones-desc': 'Variedade de modelos com ou sem fio',
        'accessory-capas': 'Capas Protetoras',
        'accessory-capas-desc': 'Proteção de alta qualidade para seu dispositivo',
        'accessory-carregadores': 'Carregadores',
        'accessory-carregadores-desc': 'Originais e compatíveis',
        'accessory-peliculas': 'Películas',
        'accessory-peliculas-desc': 'Proteção para tela em vidro temperado',
        'price-from': 'A partir de',
        'btn-ver-opcoes': 'Ver Opções',
        'btn-consultar-disponibilidade': 'Consultar Disponibilidade',
        
        // About Section
        'about-title': 'Sobre o',
        'about-title-highlight': 'Rafael Vieira',
        'about-text-1': 'A RafaTech nasceu do talento e da paixão de Rafael Vieira por tecnologia. Com vasta experiência e dedicação, Rafael se tornou referência na manutenção de celulares, tablets, notebooks, detectores de tensão, além da criação e desenvolvimento de projetos eletrônicos personalizados.',
        'about-text-2': 'Desde cedo, Rafael demonstrou interesse por desmontar, entender e consertar equipamentos eletrônicos. Essa curiosidade se transformou em vocação e, com o tempo, em um compromisso sólido com a qualidade e a inovação. Hoje, ele oferece um atendimento técnico completo, unindo conhecimento, ferramentas modernas e um olhar atento às necessidades de cada cliente.',
        'about-text-3': 'Na RafaTech, cada serviço é executado com precisão, responsabilidade e peças de qualidade, garantindo confiabilidade e durabilidade. Seja para um simples reparo, uma manutenção preventiva ou um projeto eletrônico sob medida, Rafael está sempre pronto para entregar soluções eficientes.',
        'about-text-4': 'Aqui, tecnologia é tratada com seriedade, respeito e paixão. E isso faz toda a diferença.',
        'about-feature-1': 'Atendimento Personalizado',
        'about-feature-1-desc': 'Analisamos cada caso individualmente para oferecer a melhor solução.',
        'about-feature-2': 'Garantia nos Serviços',
        'about-feature-2-desc': 'Todos os nossos serviços possuem garantia, para sua total tranquilidade.',
        'about-feature-3': 'Honestidade e Transparência',
        'about-feature-3-desc': 'Diagnóstico honesto e orçamento claro antes de qualquer intervenção.',
        
        // Stats
        'stats-experience': 'Anos de Experiência',
        'stats-devices': 'Dispositivos Reparados',
        'stats-satisfaction': 'Clientes Satisfeitos',
        'stats-warranty': 'Garantia Express',
        
        // Contact Section
        'contact-title': 'Entre em',
        'contact-title-highlight': 'Contato',
        'contact-form-name': 'Seu Nome',
        'contact-form-email': 'Seu E-mail',
        'contact-form-phone': 'Telefone/Celular',
        'contact-form-subject': 'Assunto',
        'contact-form-subject-select': 'Selecione',
        'contact-form-subject-orcamento': 'Orçamento',
        'contact-form-subject-duvida': 'Dúvida',
        'contact-form-subject-reclamacao': 'Reclamação',
        'contact-form-subject-elogio': 'Elogio',
        'contact-form-subject-outro': 'Outro',
        'contact-form-message': 'Mensagem',
        'contact-form-submit': 'Enviar Mensagem',
        'contact-info-title': 'Informações de Contato',
        'contact-info-address': 'Endereço',
        'contact-info-phone': 'Telefone',
        'contact-info-email': 'E-mail',
        'contact-info-hours': 'Horário de Atendimento',
        'contact-info-hours-weekdays': 'Segunda a Sexta: 8h às 18h',
        'contact-info-hours-saturday': 'Sábado: 8h às 13h',
        'contact-social-title': 'Nos Siga nas Redes Sociais',
        
        // Footer
        'footer-about-title': 'Sobre Nós',
        'footer-about-text': 'A RafaTech oferece soluções tecnológicas completas, com foco em qualidade e atendimento personalizado.',
        'footer-links-title': 'Links Rápidos',
        'footer-contact-title': 'Contato',
        'footer-social-title': 'Redes Sociais',
        'footer-copyright': '© 2023 RafaTech Soluções Tecnológicas. Todos os direitos reservados.',
        
        // Modal
        'modal-orcamento-title': 'Solicitar Orçamento',
        'modal-orcamento-text': 'Preencha o formulário para orçamento:',
        'modal-acessorios-title': 'Consultar Disponibilidade',
        'modal-acessorios-text': 'Informe o acessório que você procura:',
        'modal-form-nome': 'Nome',
        'modal-form-telefone': 'Telefone',
        'modal-form-servico': 'Serviço',
        'modal-form-servico-select': 'Selecione',
        'modal-form-servico-celular': 'Manutenção de Celular',
        'modal-form-servico-tablet': 'Manutenção de Tablet',
        'modal-form-servico-notebook': 'Manutenção de Notebook',
        'modal-form-servico-eletronico': 'Serviço Eletrônico',
        'modal-form-descricao': 'Descrição',
        'modal-form-acessorio': 'Acessório',
        'modal-form-acessorio-fone': 'Fone de Ouvido',
        'modal-form-acessorio-capa': 'Capas Protetoras',
        'modal-form-acessorio-carregador': 'Carregador',
        'modal-form-acessorio-pelicula': 'Película',
        'modal-form-acessorio-outro': 'Outro',
        'modal-form-modelo': 'Modelo do Dispositivo',
        'modal-form-modelo-placeholder': 'Ex: iPhone 13, Galaxy S21',
        'modal-btn-whatsapp': 'Enviar para WhatsApp',
        'modal-btn-cancelar': 'Cancelar',
        
        // Language selector
        'language-selector': 'Idioma'
    },
    
    en: {
        // Header/Navigation
        'nav-inicio': 'Home',
        'nav-servicos': 'Services',
        'nav-acessorios': 'Accessories',
        'nav-sobre': 'About',
        'nav-contato': 'Contact',
        'nav-login': 'Login',
        
        // Hero Section
        'hero-title': 'Complete Technology Solutions',
        'hero-subtitle': 'Specialized maintenance for smartphones, tablets, laptops and electronic services',
        'hero-cta': 'Contact Us',
        
        // Services Section
        'services-title': 'Our',
        'services-title-highlight': 'Services',
        'service-category-celulares': 'Smartphones',
        'service-category-tablets': 'Tablets',
        'service-category-notebooks': 'Laptops',
        'service-category-eletronicos': 'Electronics',
        
        // Celulares Services
        'celulares-services-title': 'Services for',
        'celulares-services-highlight': 'Smartphones',
        'service-manutencao-geral': 'General Maintenance',
        'service-manutencao-geral-desc': 'Board repair, component replacement, and solutions for all types of technical problems in smartphones.',
        'service-troca-tela': 'Screen Replacement',
        'service-troca-tela-desc': 'Professional replacement of broken or damaged screens with original or high-quality parts.',
        'service-troca-bateria': 'Battery Replacement',
        'service-troca-bateria-desc': 'Replacement of worn batteries, restoring the original autonomy of your device.',
        'service-recuperacao-liquido': 'Liquid Damage Recovery',
        'service-recuperacao-liquido-desc': 'Specialized treatment for devices that have suffered liquid contact.',
        'service-desbloqueio': 'Unlocking',
        'service-desbloqueio-desc': 'Carrier unlocking and Google/Apple ID removal with secure procedure.',
        'service-recuperacao-dados': 'Data Recovery',
        'service-recuperacao-dados-desc': 'We recover your data, photos and important information even in complex cases.',
        
        // Tablets Services
        'tablets-services-title': 'Services for',
        'tablets-services-highlight': 'Tablets',
        'service-manutencao-tablets': 'Tablet Maintenance',
        'service-manutencao-tablets-desc': 'Complete repair for tablets of all brands, including software and hardware problems.',
        'service-troca-tela-tablets': 'Screen Replacement',
        'service-troca-tela-tablets-desc': 'Replacement of broken or defective screens in tablets, with quality guarantee.',
        'service-troca-bateria-tablets': 'Battery Replacement',
        'service-troca-bateria-tablets-desc': 'Battery replacement for tablets with low autonomy or that no longer charge.',
        'service-recuperacao-dados-tablets': 'Data Recovery',
        'service-recuperacao-dados-tablets-desc': 'Recovery of photos, documents and important files from tablets with problems.',
        
        // Notebooks Services
        'notebooks-services-title': 'Services for',
        'notebooks-services-highlight': 'Laptops',
        'service-manutencao-notebooks': 'General Maintenance',
        'service-manutencao-notebooks-desc': 'Diagnosis and repair of laptop problems, including hardware and software failures.',
        'service-upgrade-hardware': 'Hardware Upgrade',
        'service-upgrade-hardware-desc': 'RAM memory increase, HD to SSD replacement and other improvements to increase performance.',
        'service-limpeza-manutencao': 'Cleaning and Maintenance',
        'service-limpeza-manutencao-desc': 'Internal cleaning, thermal paste replacement and preventive maintenance to avoid overheating.',
        'service-recuperacao-dados-notebooks': 'Data Recovery',
        'service-recuperacao-dados-notebooks-desc': 'Recovery of files from damaged HDs or with system problems.',
        'service-instalacao-sistemas': 'System Installation',
        'service-instalacao-sistemas-desc': 'Installation and configuration of operating systems and essential programs.',
        
        // Eletrônicos Services
        'eletronicos-services-title': 'Electronic',
        'eletronicos-services-highlight': 'Services',
        'service-detectores-tensao': 'Voltage Detectors',
        'service-detectores-tensao-desc': 'Sale, maintenance and calibration of voltage detectors for professional use.',
        'service-projetos-eletronicos': 'Electronic Projects',
        'service-projetos-eletronicos-desc': 'Development of custom electronic projects for specific needs.',
        'service-automacao-residencial': 'Home Automation',
        'service-automacao-residencial-desc': 'Automation solutions for homes, including lighting and security control.',
        'service-projetos-iot': 'IoT Projects',
        'service-projetos-iot-desc': 'Development of Internet of Things solutions to connect devices and automate tasks.',
        'service-consultoria-tecnica': 'Technical Consulting',
        'service-consultoria-tecnica-desc': 'Specialized consulting for electronic projects and choosing appropriate equipment.',
        
        'btn-solicitar-orcamento': 'Request Quote',
        
        // Accessories Section
        'accessories-title': 'Available',
        'accessories-title-highlight': 'Accessories',
        'accessory-fones': 'Headphones',
        'accessory-fones-desc': 'Variety of wired and wireless models',
        'accessory-capas': 'Protective Cases',
        'accessory-capas-desc': 'High quality protection for your device',
        'accessory-carregadores': 'Chargers',
        'accessory-carregadores-desc': 'Original and compatible',
        'accessory-peliculas': 'Screen Protectors',
        'accessory-peliculas-desc': 'Tempered glass screen protection',
        'price-from': 'From',
        'btn-ver-opcoes': 'View Options',
        'btn-consultar-disponibilidade': 'Check Availability',
        
        // About Section
        'about-title': 'About',
        'about-title-highlight': 'Rafael Vieira',
        'about-text-1': 'RafaTech was born from Rafael Vieira\'s talent and passion for technology. With vast experience and dedication, Rafael has become a reference in the maintenance of smartphones, tablets, laptops, voltage detectors, in addition to creating and developing custom electronic projects.',
        'about-text-2': 'From an early age, Rafael showed interest in dismantling, understanding and fixing electronic equipment. This curiosity became a vocation and, over time, a solid commitment to quality and innovation. Today, he offers complete technical service, combining knowledge, modern tools and a careful look at each client\'s needs.',
        'about-text-3': 'At RafaTech, each service is performed with precision, responsibility and quality parts, ensuring reliability and durability. Whether for a simple repair, preventive maintenance or a custom electronic project, Rafael is always ready to deliver efficient solutions.',
        'about-text-4': 'Here, technology is treated with seriousness, respect and passion. And that makes all the difference.',
        'about-feature-1': 'Personalized Service',
        'about-feature-1-desc': 'We analyze each case individually to offer the best solution.',
        'about-feature-2': 'Service Warranty',
        'about-feature-2-desc': 'All our services have warranty, for your complete peace of mind.',
        'about-feature-3': 'Honesty and Transparency',
        'about-feature-3-desc': 'Honest diagnosis and clear budget before any intervention.',
        
        // Stats
        'stats-experience': 'Years of Experience',
        'stats-devices': 'Devices Repaired',
        'stats-satisfaction': 'Satisfied Customers',
        'stats-warranty': 'Express Warranty',
        
        // Contact Section
        'contact-title': 'Get in',
        'contact-title-highlight': 'Touch',
        'contact-form-name': 'Your Name',
        'contact-form-email': 'Your Email',
        'contact-form-phone': 'Phone/Mobile',
        'contact-form-subject': 'Subject',
        'contact-form-subject-select': 'Select',
        'contact-form-subject-orcamento': 'Quote',
        'contact-form-subject-duvida': 'Question',
        'contact-form-subject-reclamacao': 'Complaint',
        'contact-form-subject-elogio': 'Compliment',
        'contact-form-subject-outro': 'Other',
        'contact-form-message': 'Message',
        'contact-form-submit': 'Send Message',
        'contact-info-title': 'Contact Information',
        'contact-info-address': 'Address',
        'contact-info-phone': 'Phone',
        'contact-info-email': 'Email',
        'contact-info-hours': 'Business Hours',
        'contact-info-hours-weekdays': 'Monday to Friday: 8am to 6pm',
        'contact-info-hours-saturday': 'Saturday: 8am to 1pm',
        'contact-social-title': 'Follow Us on Social Media',
        
        // Footer
        'footer-about-title': 'About Us',
        'footer-about-text': 'RafaTech offers complete technology solutions, focusing on quality and personalized service.',
        'footer-links-title': 'Quick Links',
        'footer-contact-title': 'Contact',
        'footer-social-title': 'Social Media',
        'footer-copyright': '© 2023 RafaTech Technology Solutions. All rights reserved.',
        
        // Modal
        'modal-orcamento-title': 'Request Quote',
        'modal-orcamento-text': 'Fill out the form for a quote:',
        'modal-acessorios-title': 'Check Availability',
        'modal-acessorios-text': 'Tell us which accessory you are looking for:',
        'modal-form-nome': 'Name',
        'modal-form-telefone': 'Phone',
        'modal-form-servico': 'Service',
        'modal-form-servico-select': 'Select',
        'modal-form-servico-celular': 'Smartphone Maintenance',
        'modal-form-servico-tablet': 'Tablet Maintenance',
        'modal-form-servico-notebook': 'Laptop Maintenance',
        'modal-form-servico-eletronico': 'Electronic Service',
        'modal-form-descricao': 'Description',
        'modal-form-acessorio': 'Accessory',
        'modal-form-acessorio-fone': 'Headphones',
        'modal-form-acessorio-capa': 'Protective Case',
        'modal-form-acessorio-carregador': 'Charger',
        'modal-form-acessorio-pelicula': 'Screen Protector',
        'modal-form-acessorio-outro': 'Other',
        'modal-form-modelo': 'Device Model',
        'modal-form-modelo-placeholder': 'Ex: iPhone 13, Galaxy S21',
        'modal-btn-whatsapp': 'Send to WhatsApp',
        'modal-btn-cancelar': 'Cancel',
        
        // Language selector
        'language-selector': 'Language'
    }
};

// Função para obter o idioma atual
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'pt';
}

// Função para definir o idioma
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    translatePage(lang);
}

// Função para traduzir a página
function translatePage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Atualizar o atributo lang do HTML
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    
    // Atualizar o título da página
    if (lang === 'en') {
        document.title = 'RafaTech - Complete Technology Solutions';
    } else {
        document.title = 'RafaTech - Soluções Tecnológicas Completas';
    }
}

// Inicializar tradução quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    translatePage(currentLang);
    
    // Atualizar o seletor de idioma se existir
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLang;
    }
});

