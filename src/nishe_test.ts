///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
///<reference path="../typings/jasmine/jasmine.d.ts" />

import nishe = require('nishe');
import Immutable = require('immutable');

describe('Partition', () => {
  describe('domain', () => {
    it('matches constructor', () => {
      var p = new nishe.Partition(Immutable.Map({ 'a': 'a' }));
      expect(p.domain().toArray()).toEqual(['a']);
    });
  });
});
