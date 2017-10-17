import * as fs from 'fs';
import {variables} from '../config/variables';
import * as path from 'path';
import * as _ from 'lodash';

export class _Vocabulary {
  vocabulary: Object = {};
  lang: string;

  constructor() {
    this.lang = variables.LANGUAGE;
    let usVocabulary = fs.readFileSync(path.join(process.cwd(), 'lang', 'US.json'));
    let currentVocabulary = fs.readFileSync(path.join(process.cwd(), 'lang', this.lang + '.json'));
    _.merge(this.vocabulary, usVocabulary, currentVocabulary);
  }

  public getWord(p: string): string | any {
    return _.get(this.vocabulary, p);
  }

}

export let Vocabulary = new _Vocabulary();
