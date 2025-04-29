// Arquivo de funcionalidades melhoradas para o site JAFETECH
// Este arquivo contém melhorias de funcionalidade para o formulário de contato,
// validação de campos, feedback visual e outras interações

// Validação aprimorada do formulário de contato
$(function() {
  // Quando o DOM estiver pronto
  
  // Função para validar e-mail
  function isValidEmail(email) {
    var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return pattern.test(email);
  }
  
  // Função para validar telefone brasileiro
  function isValidPhone(phone) {
    // Remove caracteres não numéricos
    phone = phone.replace(/\D/g, '');
    // Verifica se tem entre 10 e 11 dígitos (com ou sem DDD)
    return phone.length >= 10 && phone.length <= 11;
  }
  
  // Validação em tempo real dos campos
  $('#name').on('blur', function() {
    var name = $(this).val().trim();
    if (name.length < 3) {
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(this).next('.help-block').text('Por favor, digite um nome válido com pelo menos 3 caracteres.');
    } else {
      $(this).addClass('is-valid').removeClass('is-invalid');
      $(this).next('.help-block').text('');
    }
  });
  
  $('#email').on('blur', function() {
    var email = $(this).val().trim();
    if (!isValidEmail(email)) {
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(this).next('.help-block').text('Por favor, digite um e-mail válido.');
    } else {
      $(this).addClass('is-valid').removeClass('is-invalid');
      $(this).next('.help-block').text('');
    }
  });
  
  $('#phone').on('blur', function() {
    var phone = $(this).val().trim();
    if (!isValidPhone(phone)) {
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(this).next('.help-block').text('Por favor, digite um telefone válido com DDD.');
    } else {
      $(this).addClass('is-valid').removeClass('is-invalid');
      $(this).next('.help-block').text('');
    }
  });
  
  $('#message').on('blur', function() {
    var message = $(this).val().trim();
    if (message.length < 10) {
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(this).next('.help-block').text('Por favor, digite uma mensagem com pelo menos 10 caracteres.');
    } else {
      $(this).addClass('is-valid').removeClass('is-invalid');
      $(this).next('.help-block').text('');
    }
  });
  
  // Máscara para o campo de telefone
  $('#phone').on('input', function() {
    var phone = $(this).val().replace(/\D/g, '');
    var formatted = '';
    
    if (phone.length > 0) {
      formatted = '(' + phone.substring(0, 2);
      
      if (phone.length > 2) {
        formatted += ') ' + phone.substring(2, 7);
        
        if (phone.length > 7) {
          formatted += '-' + phone.substring(7, 11);
        }
      }
    }
    
    $(this).val(formatted);
  });
  
  // Envio do formulário com feedback visual
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    // Verifica se todos os campos estão válidos
    var isValid = true;
    
    $('#name, #email, #phone, #message').each(function() {
      $(this).trigger('blur');
      if ($(this).hasClass('is-invalid')) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // Desabilita o botão durante o envio
      $('#sendMessageButton').prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...');
      
      // Simulação de envio (em um site real, isso seria substituído por AJAX)
      setTimeout(function() {
        $('#success').html('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                          '<strong>Mensagem enviada com sucesso!</strong> Entraremos em contato em breve.' +
                          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                          '<span aria-hidden="true">&times;</span></button></div>');
        
        // Limpa o formulário
        $('#contactForm').trigger('reset');
        $('.form-control').removeClass('is-valid');
        
        // Reativa o botão
        $('#sendMessageButton').prop('disabled', false).html('Enviar');
      }, 1500);
    } else {
      $('#success').html('<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                        '<strong>Ops!</strong> Por favor, corrija os erros no formulário antes de enviar.' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span></button></div>');
    }
  });
  
  // Limpa mensagens quando o modal é fechado
  $('.close').click(function() {
    $('#success').html('');
  });
});

// Melhorias na navegação
$(function() {
  // Destaque do item de menu ativo durante a rolagem
  $(window).on('scroll', function() {
    var scrollDistance = $(window).scrollTop();
    
    // Mostra ou esconde o botão de voltar ao topo com animação suave
    if (scrollDistance > 200) {
      $('.back-to-top').fadeIn();
    } else {
      $('.back-to-top').fadeOut();
    }
    
    // Destaca o item de menu correspondente à seção visível
    $('section').each(function(i) {
      if ($(this).position().top <= scrollDistance + 100) {
        $('.navbar-nav .nav-item .nav-link.active').removeClass('active');
        $('.navbar-nav .nav-item .nav-link').eq(i).addClass('active');
      }
    });
  }).scroll();
  
  // Animação suave ao clicar nos links de navegação
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });
});

// Funcionalidade aprimorada para o banner de cookies
$(function() {
  // Verifica se os cookies já foram aceitos
  if (localStorage.getItem('cookiesAceitos') === 'true') {
    $('#cookie-banner').hide();
  } else {
    $('#cookie-banner').show();
  }
  
  // Função para aceitar cookies
  window.aceitarCookies = function() {
    localStorage.setItem('cookiesAceitos', 'true');
    $('#cookie-banner').fadeOut(300);
  };
});

// Carregamento otimizado de imagens
$(function() {
  // Pré-carrega imagens importantes
  const preloadImages = [
    'img/optimized/logo.png',
    'img/optimized/Outro2.png'
  ];
  
  preloadImages.forEach(function(src) {
    const img = new Image();
    img.src = src;
  });
});

// Inicialização aprimorada das animações AOS
$(function() {
  // Inicializa AOS com opções personalizadas
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 50
  });
  
  // Reinicializa AOS quando a janela é redimensionada
  $(window).on('resize', function() {
    AOS.refresh();
  });
});

// Funcionalidade para o botão de WhatsApp
$(function() {
  $('.whatsapp-icon').hover(
    function() {
      $('.mensagem-ajuda').fadeIn(200);
    },
    function() {
      $('.mensagem-ajuda').fadeOut(200);
    }
  );
});

// Detecção de modo escuro do sistema e ajuste automático
$(function() {
  // Verifica se o sistema está em modo escuro
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Adiciona uma classe ao body para possíveis ajustes CSS
    $('body').addClass('dark-mode-detected');
  }
  
  // Monitora mudanças no modo de cor do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (e.matches) {
      $('body').addClass('dark-mode-detected');
    } else {
      $('body').removeClass('dark-mode-detected');
    }
  });
});

// Melhorias de acessibilidade
$(function() {
  // Adiciona atributos ARIA para melhorar a acessibilidade
  $('.nav-link').attr('role', 'menuitem');
  $('.navbar-nav').attr('role', 'menubar');
  $('#contactForm input, #contactForm textarea').attr('aria-required', 'true');
  
  // Melhora a acessibilidade do botão de voltar ao topo
  $('.back-to-top').attr({
    'aria-label': 'Voltar ao topo da página',
    'role': 'button'
  });
  
  // Melhora a acessibilidade do botão de WhatsApp
  $('.whatsapp-icon').attr({
    'aria-label': 'Contato via WhatsApp',
    'role': 'button'
  });
});

// Feedback visual para interações do usuário
$(function() {
  // Adiciona efeito de hover nos cards de serviços
  $('.service-icon').parent().hover(
    function() {
      $(this).find('.service-icon').css('transform', 'scale(1.1)');
    },
    function() {
      $(this).find('.service-icon').css('transform', 'scale(1)');
    }
  );
  
  // Adiciona efeito de hover nos cards de benefícios
  $('.benefit-item').hover(
    function() {
      $(this).css('transform', 'translateY(-10px)');
    },
    function() {
      $(this).css('transform', 'translateY(0)');
    }
  );
});
