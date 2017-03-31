import * as fs from 'fs';
import {environment} from '../config/environment';
import * as path from 'path';
import * as _ from 'lodash';

export class _Vocabulary {
    vocabulary: Object = {};
    lang: string;

    constructor() {
        this.lang = environment.LANGUAGE;
        var usVocabulary = fs.readFileSync(path.join(process.cwd(), 'lang', 'US.json'));
        var currentVocabulary = fs.readFileSync(path.join(process.cwd(), 'lang', this.lang + '.json'));
        _.merge(this.vocabulary, usVocabulary, currentVocabulary);
    }

    public getWord(p: string):string | any {
        return _.get(this.vocabulary, p);
    }

}

export var Vocabulary = new _Vocabulary();
