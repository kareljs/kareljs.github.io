function compilar() {
  var fonte = document.getElementById('codigo-fonte');
  var objeto = document.getElementById('codigo-objeto');
  var alert = document.getElementById('error-alert');

  if (fonte.value) {
    var buffer = '';
    alert.innerHTML = '';

    begin(fonte.value);

    if (errorDisplayed === false) {
      for (e in execOut) {
        buffer += execOut[e] + '\n';
      }

      objeto.innerHTML = buffer;
      resetMap(mapDefinition);
      Interpretador(buffer);
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
    '\t\t\t\t\tSENAO\n' + 
    '\t\t\t\t\t\tSE voltado-norte ENTAO\n' + 
    '\t\t\t\t\t\t\tINICIO\n' + 
    '\t\t\t\t\t\t\t\tviredireita;\n' + 
    '\t\t\t\t\t\t\t\tmova;\n' + 
    '\t\t\t\t\t\t\t\tviredireita\n' + 
    '\t\t\t\t\t\t\tFIM\n' + 
    '\t\t\t\t\t\tSENAO\n' + 
    '\t\t\t\t\t\t\tINICIO\n' + 
    '\t\t\t\t\t\t\t\tvireesquerda;\n' + 
    '\t\t\t\t\t\t\t\tmova;\n' + 
    '\t\t\t\t\t\t\t\tvireesquerda\n' + 
    '\t\t\t\t\t\t\tFIM\n' + 
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

function downloadMapa() {
  var botao = document.getElementById('salvar-mapa');
  var alert = document.getElementById('error-alert');

  try {
    mapDefinition = mapEditor.mapDefinition.map(function(arr) {
      return arr.slice();
    });
    var mapa = JSON.stringify(mapDefinition);
    var nome = prompt('Insira um nome para o arquivo a ser salvo: ');
    botao.download = (nome) ? nome + '.karelMapa' : 'mapa.karelMapa';
    botao.href = gerarDownload(mapa);
  } catch(e) {
    alert.innerHTML = 'Houve um problema para gerar o mapa.';
  }
}

function carregarCodigo() {
  var fonte = document.getElementById('codigo-fonte');
  var alert = document.getElementById('error-alert');
  var file = document.getElementById('carregar-codigo');
  file = file.files[0];

  if (file) {
    fileName = file.name || file.fileName;
    var ext = fileName.split('.').pop();

    if (ext == 'karel') {
      var reader = new FileReader();
      reader.onload = function() {
        fonte.value = reader.result;
      };
      reader.readAsText(file);
    } else {
      alert.innerHTML = 'Por favor selecione um arquivo com a extensão ".karel"!';
    }
  } else {
    alert.innerHTML = 'Por favor selecione um arquivo de código fonte.';
  }
}

function carregarMapa() {
  var alert = document.getElementById('error-alert');
  var file = document.getElementById('carregar-mapa');
  file = file.files[0];

  if (file) {
    fileName = file.name || file.fileName;
    var ext = fileName.split('.').pop();

    if (ext == 'karelMapa') {
      var reader = new FileReader();
      reader.onload = function() {
        mapDefinition = JSON.parse(reader.result);
        resetMap(mapDefinition);
      };
      reader.readAsText(file);
    } else {
      alert.innerHTML = 'Por favor selecione um arquivo com a extensão ".karelMapa"!';
    }
  } else {
    alert.innerHTML = 'Por favor selecione um arquivo de mapa.';
  }
}

function atualizarMapa() {
  loadEditedMap();
}
