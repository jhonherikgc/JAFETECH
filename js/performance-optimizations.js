// Arquivo para otimização de desempenho do site JAFETECH
// Este script implementa técnicas de lazy loading, minificação e outras otimizações

// Lazy loading para imagens
document.addEventListener("DOMContentLoaded", function() {
  // Seleciona todas as imagens que não estão na viewport inicial
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  // Configura o Intersection Observer
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Quando a imagem entra na viewport
      if (entry.isIntersecting) {
        const img = entry.target;
        // Substitui o src pelo data-src
        img.src = img.dataset.src;
        // Remove o atributo data-src
        img.removeAttribute('data-src');
        // Para de observar a imagem
        observer.unobserve(img);
      }
    });
  });
  
  // Observa cada imagem
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
});

// Otimização de carregamento de recursos
document.addEventListener("DOMContentLoaded", function() {
  // Carrega scripts não críticos de forma assíncrona
  function loadScript(src, async = true, defer = true) {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    document.body.appendChild(script);
  }
  
  // Carrega o VLibras de forma assíncrona após 3 segundos
  setTimeout(() => {
    loadScript('https://vlibras.gov.br/app/vlibras-plugin.js');
    // Inicializa o VLibras após o carregamento
    setTimeout(() => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    }, 1000);
  }, 3000);
});

// Otimização de animações
document.addEventListener("DOMContentLoaded", function() {
  // Reduz a carga de animações em dispositivos móveis
  if (window.innerWidth < 768) {
    // Ajusta a duração das animações para dispositivos móveis
    if (window.AOS) {
      AOS.init({
        duration: 400, // Duração reduzida
        once: true,    // Animação ocorre apenas uma vez
        disable: 'phone' // Desativa em telefones muito pequenos
      });
    }
  }
});

// Otimização de eventos de scroll
document.addEventListener("DOMContentLoaded", function() {
  // Implementa debounce para eventos de scroll
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  // Aplica debounce ao evento de scroll
  const scrollHandler = debounce(function() {
    // Código para manipular o evento de scroll
    const scrollDistance = window.pageYOffset;
    
    // Mostra ou esconde o botão de voltar ao topo
    const backToTopBtn = document.getElementById('btnTop');
    if (backToTopBtn) {
      if (scrollDistance > 200) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }
  }, 10);
  
  // Adiciona o manipulador de eventos otimizado
  window.addEventListener('scroll', scrollHandler);
});

// Otimização de fontes
document.addEventListener("DOMContentLoaded", function() {
  // Adiciona preconnect para domínios de fontes
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com'
  ];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
});

// Otimização de cache
document.addEventListener("DOMContentLoaded", function() {
  // Verifica se o navegador suporta Service Worker
  if ('serviceWorker' in navigator) {
    // Registra o service worker para cache offline
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
});

// Otimização de formulários
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('contactForm');
  if (form) {
    // Implementa throttling para eventos de input
    const inputFields = form.querySelectorAll('input, textarea');
    
    inputFields.forEach(field => {
      let lastExecution = 0;
      const throttleTime = 100; // ms
      
      field.addEventListener('input', function(event) {
        const now = Date.now();
        
        if (now - lastExecution >= throttleTime) {
          lastExecution = now;
          // Executa a validação
          validateField(field);
        }
      });
    });
    
    function validateField(field) {
      // Lógica de validação simplificada para melhor desempenho
      const value = field.value.trim();
      const isValid = value.length > 0;
      
      if (isValid) {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
      }
    }
  }
});

// Otimização de imagens de fundo
document.addEventListener("DOMContentLoaded", function() {
  // Detecta a resolução da tela
  const width = window.innerWidth;
  
  // Seleciona a imagem de fundo apropriada com base na resolução
  const header = document.querySelector('header.masthead');
  if (header) {
    if (width <= 768) {
      // Dispositivos móveis - imagem menor
      header.style.backgroundImage = 'url(img/optimized/Outro2.png)';
    } else {
      // Desktop - imagem original
      header.style.backgroundImage = 'url(img/optimized/Outro2.png)';
    }
  }
});

// Otimização de interações de toque para dispositivos móveis
document.addEventListener("DOMContentLoaded", function() {
  // Verifica se é um dispositivo de toque
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    // Adiciona classe específica para dispositivos de toque
    document.body.classList.add('touch-device');
    
    // Otimiza áreas clicáveis para toque
    const clickableElements = document.querySelectorAll('a, button, .nav-link, .service-icon, .benefit-item');
    
    clickableElements.forEach(element => {
      // Aumenta ligeiramente a área de toque
      element.style.padding = getComputedStyle(element).padding;
      const currentPadding = parseInt(element.style.padding) || 0;
      if (currentPadding < 10) {
        element.style.padding = Math.max(currentPadding, 10) + 'px';
      }
    });
  }
});
