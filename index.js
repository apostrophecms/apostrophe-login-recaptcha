const request = require('request-promise');

module.exports = {
  afterConstruct: function(self) {
    self.pushAssets();
  },
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('script', 'user', {
        when: 'user'
      });
      self.pushAsset('stylesheet', 'user', {
        when: 'user'
      });
    };
    self.checkCaptcha = async function (req, recaptcha) {
      const recaptchaSecret = self.getOption(req, 'recaptchaSecret');
      if (!recaptchaSecret) {
        self.apos.utils.warnDev('You forgot to configure the recaptchaSecret option for the apostrophe-login-recaptcha module.');
      }
      if (!recaptcha) {
        throw 'Please check the box to confirm you are a human being.';
      }
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const recaptchaResponse = JSON.parse(await request({
        method: 'POST',
        uri: `${url}?secret=${recaptchaSecret}&response=${recaptcha}`
      }));

      if (!recaptchaResponse.success) {
        throw 'Please check the box to confirm you are a human being.';
      }
    };
    self.on('apostrophe-login:beforeLoginAttempt', 'checkCaptchaOnLoginAttempt', async function(req) {
      return self.checkCaptcha(req, req.body['g-recaptcha-response']);
    });
    self.on('apostrophe-pages:beforeSend', 'createLoginCaptchaSingleton', function(req) {
      self.pushCreateSingleton(req, 'user');
    });
    self.getCreateSingletonOptions = function(req) {
      return {
        recaptchaSite: self.options.recaptchaSite
      };
    };
  }
};
