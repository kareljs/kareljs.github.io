function compilar() {
  var fonte = document.getElementById('codigo-fonte');
  var objeto = document.getElementById('codigo-objeto');

  if (fonte.value) {
    var buffer = '';

    begin(fonte.value);

    if (errorDisplayed === false) {
      for (e in execOut) {
        buffer += execOut[e] + "\n";
      }
    }

    objeto.innerHTML = buffer;
  }
}

function demo() {
  var fonte = document.getElementById('codigo-fonte');
  var demo = "INICIO-DO-PROGRAMA\n" +
    "\tDEFINA-INSTRUCAO viredireita COMO\n" + 
    "\t\tINICIO\n" + 
    "\t\t\tREPITA 3 VEZES\n" + 
    "\t\t\t\tvireesquerda\n" + 
    "\t\tFIM;\n" + 
    "\tDEFINA-INSTRUCAO bipfrente COMO\n" + 
    "\t\tINICIO\n" + 
    "\t\t\tENQUANTO nao-proximo-a-bip FACA\n" + 
    "\t\t\t\tINICIO\n" + 
    "\t\t\t\t\tSE frente-livre ENTAO\n" + 
    "\t\t\t\t\t\tmova\n" + 
    "\t\t\t\tFIM;\n" + 
    "\t\t\tSE proximo-a-bip ENTAO\n" + 
    "\t\t\t\tpegabip\n" + 
    "\t\tFIM;\n" + 
    "\tDEFINA-INSTRUCAO buscabip COMO\n" + 
    "\t\tENQUANTO nao-existem-bips-na-bolsa FACA\n" + 
    "\t\t\tINICIO\n" + 
    "\t\t\t\tbipfrente;\n" + 
    "\t\t\t\tviredireita;\n" + 
    "\t\t\t\tSE frente-livre ENTAO\n" + 
    "\t\t\t\t\tINICIO\n" + 
    "\t\t\t\t\t\tmova;\n" + 
    "\t\t\t\t\t\tvireesquerda\n" + 
    "\t\t\t\t\tFIM\n" + 
    "\t\t\t\tSENAO\n" + 
    "\t\t\t\t\tviredireita\n" + 
    "\t\t\tFIM;\n" + 
    "\tINICIO-DE-EXECUCAO\n" + 
    "\t\tvireesquerda;\n" + 
    "\t\tbuscabip;\n" + 
    "\t\tdesliga\n" + 
    "\tFIM-DE-EXECUCAO\n" + 
    "FIM-DO-PROGRAMA";
  fonte.value = demo;
}

function download() {
  window.URL = window.URL || window.webkitURL;
  var objeto = document.getElementById('codigo-objeto');
  var blob = new Blob([objeto.value], {type: 'application/octet-binary'});
  location.href = window.URL.createObjectURL(blob);
}
