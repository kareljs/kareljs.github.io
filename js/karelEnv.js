function compilar() {
  var fonte = document.getElementById('codigo-fonte');
  var objeto = document.getElementById('codigo-objeto');
  var alert = document.getElementById('error-alert');

  if (fonte.value) {
    var buffer = '';

    begin(fonte.value);

    if (errorDisplayed === false) {
      for (e in execOut) {
        buffer += execOut[e] + "\n";
      }

      objeto.innerHTML = buffer;
    } else {
      for (r in errorOut) {
        buffer += errorOut[r] + "\n";
      }

      alert.innerHTML = buffer;
    }
  } else {
    alert.innerHTML = 'Por favor insira um código fonte';
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
    "\tDEFINA-INSTRUCAO bipefrente COMO\n" + 
    "\t\tINICIO\n" + 
    "\t\t\tENQUANTO nao-proximo-a-bipe FACA\n" + 
    "\t\t\t\tINICIO\n" + 
    "\t\t\t\t\tSE frente-livre ENTAO\n" + 
    "\t\t\t\t\t\tmova\n" + 
    "\t\t\t\tFIM;\n" + 
    "\t\t\tSE proximo-a-bipe ENTAO\n" + 
    "\t\t\t\tpegabipe\n" + 
    "\t\tFIM;\n" + 
    "\tDEFINA-INSTRUCAO buscabipe COMO\n" + 
    "\t\tENQUANTO nao-existem-bipes-na-bolsa FACA\n" + 
    "\t\t\tINICIO\n" + 
    "\t\t\t\tbipefrente;\n" + 
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
    "\t\tbuscabipe;\n" + 
    "\t\tdesliga\n" + 
    "\tFIM-DE-EXECUCAO\n" + 
    "FIM-DO-PROGRAMA";
  fonte.value = demo;
}

function gerarDownload(data) {
  window.URL = window.URL || window.webkitURL;
  var blob = new Blob([data], {type: 'application/octet-stream'});
  return window.URL.createObjectURL(blob);
}

function downloadObjeto() {
  var objeto = document.getElementById('objeto');
  // .href = gerarDownload(objeto);
}
