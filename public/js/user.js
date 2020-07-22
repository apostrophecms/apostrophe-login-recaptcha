apos.define('apostrophe-login-recaptcha', {
  construct: function(self, options) {
    var $form = $('[data-apos-login-form]');

    if (!$form.length) {
      // Fallback for old templates
      $form = $('.apos-login-page form');
      if ($form.length) {
        if (!$form.attr('action').match(/\/login$/)) {
          $form = [];
        }
      }
    }
    if (!$form.length) {
      // Probably not a login page
      return;
    }
    
    var $button = $form.find('[data-apos-login-submit-button]');
    if (!$button.length) {
      // Fallback for old templates
      $button = $form.find('input[type="submit"]');
      if (!$button.length) {
        // Template is too far off our standard
        return;
      }
    }
    var $recaptcha = $('<div></div>');
    $recaptcha.attr('id', 'aposLoginRecaptcha');
    $recaptcha.attr('data-size', 'compact');
    $button.before($recaptcha);
  
    window.aposLoginRenderCaptcha = renderCaptcha;
    addRecaptchaScript();
  
    function addRecaptchaScript () {
      if (document.querySelector('[data-apos-recaptcha-script]')) {
        renderCaptcha();
        return;
      }
      var refreshable = document.querySelector('[data-apos-refreshable]');
      var recaptchaScript = document.createElement("script");
      recaptchaScript.src = "https://www.google.com/recaptcha/api.js?onload=aposLoginRenderCaptcha&render=explicit";
      recaptchaScript.setAttribute('data-apos-recaptcha-script', '');
      recaptchaScript.setAttribute('async', '');
      recaptchaScript.setAttribute('defer', '');
      refreshable.appendChild(recaptchaScript);
    }
  
    function renderCaptcha () {
      grecaptcha.render('aposLoginRecaptcha', {
        sitekey: options.recaptchaSite
      });
    }

  }
});
