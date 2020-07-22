# apostrophe-login-recaptcha

## Usage

```javascript
const apos = require('apostrophe')({
  modules: {
    'apostrophe-login-recaptcha': {
      recaptchaSite: 'site-key-from-recaptcha',
      recaptchaSecret: 'site-secret-from-recaptcha'
    }
  }
});
```

## Benefits

The login page will always display a [reCAPTCHA](https://developers.google.com/recaptcha/docs/display) prompt, requiring the user to prove they are human before logging in.

## Warnings

If you have extensively overridden the `login.html` template in your project in the past, this module will make a good faith attempt to figure it out. However, if it does not work, you may need to add a `data-apos-login-form` attribute to the form and a `data-apos-login-submit-button` attribute to the submit button. Future overrides will likely include these since they are now in the `loginBase.html` template of Apostorphe.

