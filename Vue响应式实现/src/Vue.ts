import { VueOptions } from './VueOptions.js';
import { observe, compile } from './utils.js';

export default class Vue {
    $el: string;
    [key: string]: any;
    constructor(options: VueOptions) {
        this.$el = options.el;
        observe(this, options.data);
        compile(this);
    }
}