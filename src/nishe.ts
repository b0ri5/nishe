///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>

import Immutable = require('immutable');

'use strict';
export class Partition {
  private dom: Immutable.List<string>;

  constructor(private images: Immutable.Map<string, string>) {
    this.dom = images.keySeq().sort().toList();
    images.forEach((v: string, k: string) => {
      if (!images.has(v)) {
        throw new Error('The value ' + v + ' is not a key');
      }
    });
  }

  domain(): Immutable.List<string> {
    return this.dom;
  }
}
