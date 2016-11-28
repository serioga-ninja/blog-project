import fs = require('fs');
import environment = require('../config/environment');
import path = require('path');
import _ = require('lodash');

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