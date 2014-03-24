require(['node_modules/mocha/mocha'], function() {
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
