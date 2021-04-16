/*
    @fliptopbox
    @source https://gist.github.com/fliptopbox/6990878

    LZW Compression/Decompression for Strings
    Implementation of LZW algorithms from:
    http://rosettacode.org/wiki/LZW_compression#JavaScript

    Usage:
    let a = 'a very very long string to be squashed';
    let b = compress(a); // 'a veryāăąlong striċ to bečquashed'
    let c = uncompress(b); // 'a very very long string to be squashed'
    console.log(a === c); // True

    let d = compress(a, true); // return as Array
    console.log(d); // [97, 32, 118 .... 101, 100] an Array of ASCII codes

*/

const compress = (str, asArray) => {
    // Build the dictionary.
    let i,
        dict = {},
        uncompressed = str,
        c,
        wc,
        w = '',
        result = [],
        ASCII = '',
        dictSize = 256

    for (let i = 0; i < 256; i += 1) {
        dict[String.fromCharCode(i)] = i
    }

    for (let i = 0; i < uncompressed.length; i += 1) {
        c = uncompressed.charAt(i)
        wc = w + c
        // Do not use dict[wc] because javascript arrays
        // will return values for array['pop'], array['push'] etc
        // if (dict[wc]) {
        if (dict.hasOwnProperty(wc)) {
            w = wc
        }
        else {
            result.push(dict[w]);
            ASCII += String.fromCharCode(dict[w])
            // Add wc to the dictionary.
            dict[wc] = dictSize++
            w = String(c)
        }
    }

    // Output the code for w.
    if (w !== '') {
        result.push(dict[w])
        ASCII += String.fromCharCode(dict[w])
    }
    return asArray ? result : ASCII
};

const uncompress = str => {
    // Build the dictionary.
    let i, tmp = [],
        dict = [],
        compressed = str,
        w,
        result,
        k,
        entry = '',
        dictSize = 256

    for (let i = 0; i < 256; i += 1) {
        dict[i] = String.fromCharCode(i)
    }

    if (compressed && typeof compressed === 'string') {
        // convert string into Array.
        for(let i = 0; i < compressed.length; i += 1) {
            tmp.push(compressed[i].charCodeAt(0))
        }
        compressed = tmp
        tmp = null
    }

    w = String.fromCharCode(compressed[0])
    result = w

    for (let i = 1; i < compressed.length; i += 1) {
        k = compressed[i]
        if (dict[k]) {
            entry = dict[k]
        }
        else {
            if (k === dictSize) {
                entry = w + w.charAt(0)
            }
            else {
                return null
            }
        }

        result += entry

        // Add w+entry[0] to the dictionary.
        dict[dictSize++] = w + entry.charAt(0)

        w = entry
    }
    return result
}

export { compress, uncompress }
