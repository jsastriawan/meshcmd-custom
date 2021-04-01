var fs = require('fs');
var path = require('path')

const exeJavaScriptGuid = 'B996015880544A19B7F7E9BE44914C18';

function escapeCodeString(str) {
    const escapeCodeStringTable = { '\'': '\\\'', '\"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t' };
    var r = '', c, cr, table;
    for (var i = 0; i < str.length; i++) {
        c = str[i];
        table = escapeCodeStringTable[c];
        if (table != null) {
            r += table;
        } else {
            cr = c.charCodeAt(0);
            if ((cr >= 32) && (cr <= 127)) { r += c; }
        }
    }
    return r;
}

var meshcmd = 'meshcmd.js';
var file_array = fs.readdirSync(__dirname);
// construct embedded javascripts
moduleAdditions = ['var addedModules = [];\r\n']
var mods = {}
for (i=0;i<=file_array.length;i++) {
    if (file_array[i]!=null && file_array[i]!=meshcmd 
        && file_array[i].endsWith('.js') && file_array[i]!=__filename) {
            // get the js modules name by stripping js
            var mname = file_array[i].substring(0,file_array[i].length -3);
            // cut .min for minimized modules
            if (mname.endsWith('.min')) { mname = mname.substring(0,-4);}
            mods[mname]=file_array[i];
            // append into moduleAdditions
            moduleAdditions.push('try { addModule("', mname, '", "', escapeCodeString(fs.readFileSync(path.join(__dirname, file_array[i])).toString('binary')), '"); addedModules.push("', mname, '"); } catch (e) { }\r\n');
    }    
}
moduleAdditions.push(fs.readFileSync(path.join(__dirname,meshcmd)));
var emb_js = moduleAdditions.join('');
var exe_out = fs.openSync(path.join(__dirname,'MeshCmd.exe'),'w');
// first write the original exe
fs.writeSync(exe_out,fs.readFileSync(path.join(__dirname,'MeshService64.exe')));
// append the JS
fs.writeSync(exe_out, emb_js)
// append size in 
var sz = Buffer.alloc(4)
sz.writeUInt32BE(emb_js.length)
fs.writeSync(exe_out,sz);
// append exeJavascriptGUID
fs.writeSync(exe_out,Buffer.from(exeJavaScriptGuid,'hex'));
