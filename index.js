'use strict';

var fs = require('fs');

//default size unit
var sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB'
];


function prepareOpts(opts) {
    opts = opts || {};

    if (opts.shortUnit == null) {
        opts.shortUnit = true;
    }

    if (opts.nospace == null) {
        opts.nospace = true;
    }

    //check if has opts.file
    if (opts.file) {
        //TODO check file url exist
        opts.size = fs.statSync(opts.file).size;
    }


}

module.exports = function(opts) {

    var result;

    opts = prepareOpts(opts);

    var nospace = opts.nospace;

    sizes.forEach(function(f, index) {
        //check if use short unit
        if (opts.shortUnit) {
            f = f.slice(0,1);
        }

        var s = Math.pow(1024, index);
        var fixed;
        var size = opts.size;
        

        if (size >= s) {
            fixed = String((size / s).toFixed(1));
        
            if (fixed.indexOf('.0') === fixed.length - 2) {
                fixed = fixed.slice(0, -2);
            }

            result = fixed + (nospace ? '' : ' ') + f;
        }

    });

    if (!result) {
        var f = (opts.shortUnit ? sizes[0].slice(0, 1) : sizes[0]);

        result = '0' + (nospace ? '' + ' ') + f;
    }

    return result;

};
