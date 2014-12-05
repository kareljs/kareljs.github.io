function compilar() {
  var fonte = document.getElementById('codigo-fonte');
  var objeto = document.getElementById('codigo-objeto');
  var alert = document.getElementById('error-alert');

  if (fonte.value) {
    var buffer = '';

    begin(fonte.value);

    if (errorDisplayed === false) {
      for (e in execOut) {
        buffer += execOut[e] + '\n';
      }

      objeto.innerHTML = buffer;
    } else {
      for (r in errorOut) {
        buffer += errorOut[r] + '\n';
      }

      alert.innerHTML = buffer;
    }
  } else {
    alert.innerHTML = 'Por favor insira um código fonte';
  }
}

function demo() {
  var fonte = document.getElementById('codigo-fonte');
  var demo = 'INICIO-DO-PROGRAMA\n' +
    '\tDEFINA-INSTRUCAO viredireita COMO\n' + 
    '\t\tINICIO\n' + 
    '\t\t\tREPITA 3 VEZES\n' + 
    '\t\t\t\tvireesquerda\n' + 
    '\t\tFIM;\n' + 
    '\tDEFINA-INSTRUCAO bipefrente COMO\n' + 
    '\t\tINICIO\n' + 
    '\t\t\tENQUANTO nao-proximo-a-bipe FACA\n' + 
    '\t\t\t\tINICIO\n' + 
    '\t\t\t\t\tSE frente-livre ENTAO\n' + 
    '\t\t\t\t\t\tmova\n' + 
    '\t\t\t\tFIM;\n' + 
    '\t\t\tSE proximo-a-bipe ENTAO\n' + 
    '\t\t\t\tpegabipe\n' + 
    '\t\tFIM;\n' + 
    '\tDEFINA-INSTRUCAO buscabipe COMO\n' + 
    '\t\tENQUANTO nao-existem-bipes-na-bolsa FACA\n' + 
    '\t\t\tINICIO\n' + 
    '\t\t\t\tbipefrente;\n' + 
    '\t\t\t\tviredireita;\n' + 
    '\t\t\t\tSE frente-livre ENTAO\n' + 
    '\t\t\t\t\tINICIO\n' + 
    '\t\t\t\t\t\tmova;\n' + 
    '\t\t\t\t\t\tvireesquerda\n' + 
    '\t\t\t\t\tFIM\n' + 
    '\t\t\t\tSENAO\n' + 
    '\t\t\t\t\tviredireita\n' + 
    '\t\t\tFIM;\n' + 
    '\tINICIO-DE-EXECUCAO\n' + 
    '\t\tvireesquerda;\n' + 
    '\t\tbuscabipe;\n' + 
    '\t\tdesliga\n' + 
    '\tFIM-DE-EXECUCAO\n' + 
    'FIM-DO-PROGRAMA\n';
  fonte.value = demo;
}

function gerarDownload(data) {
  window.URL = window.URL || window.webkitURL;
  var blob = new Blob([data], {type: 'application/octet-stream'});
  return window.URL.createObjectURL(blob);
}

function downloadFonte() {
  var fonte = document.getElementById('codigo-fonte');
  var botao = document.getElementById('salvar-codigo');
  var alert = document.getElementById('error-alert');

  if (fonte.value) {
    var nome = prompt('Insira um nome para o arquivo a ser salvo: ');
    botao.download = (nome) ? nome + '.karel' : 'codigoFonte.karel';
    botao.href = gerarDownload(fonte.value);
  } else {
    alert.innerHTML = 'Para baixar um código fonte você precisa ter inserido um código fonte na caixa de texto acima ;D';
  }
}
