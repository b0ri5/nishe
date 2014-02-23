require(['third_party/mocha'], function() {
  mocha.setup('bdd');
  require(['nishe_test', 'nisheviz_test'], function() {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.checkLeaks();
      mocha.run();
    }
  });
});
