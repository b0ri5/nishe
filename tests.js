require.config({
  paths: {
    'chai': 'node_modules/chai/chai',
    'mocha': 'node_modules/mocha/mocha'
  },
  shim: {
    'mocha': {
      init: function() {
        'use strict';
        this.mocha.setup('bdd');
        return this.mocha;
      }
    }
  }
});
require(['mocha'], function() {
  'use strict';
  mocha.setup('bdd');
  require(['nishe_test'], function() {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.checkLeaks();
      mocha.run();
    }
  });
});
