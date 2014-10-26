var C = [];
var D = [];
var ip = 0;
var encerrarExecucao = false;

function interpretador() {
  var codigoObjeto = document.getElementById('codigo-objeto').value.split('\n');

  carregarCodigoObjeto(codigoObjeto);
  executarPrograma();
}

function carregarCodigoObjeto(codigo) {
  for (var i = 0; i < codigo.length; i++) {
    C[i] = codigo[i];
  }
}

function executarPrograma() {
  var instrucao;
  do {
    instrucao = passo();
  } while (instrucao != "dsl");
}

function executarProgramaTemporizado() {
  window.setInterval(passo, 2000);
}

function passo() {
  if (encerrarExecucao) {
    return;
  }

  var instrucao = C[ip];
  ip++;

  executarInstrucao(instrucao);

  return instrucao;
}

function executarInstrucao(instrucao) {
  var auxiliar = instrucao.split(' ');
  var comando = auxiliar[0];
  var comandos = {
    "frb": Robo.frenteBloqueada,
    "frl": Robo.frenteLivre,
    "eqb": Robo.esquerdaBloqueada,
    "eql": Robo.esquerdaLivre,
    "drb": Robo.direitaBloqueada,
    "drl": Robo.direitaLivre,
    "nprb": Robo.naoProximoBip,
    "prb": Robo.proximoBip,
    "nexs": Robo.naoExistemBipsNaBolsa,
    "exs": Robo.existemBipsNaBolsa,
    "nvtn": Robo.naoVoltadoNorte,
    "vtn": Robo.voltadoNorte,
    "nvts": Robo.naoVoltadoSul,
    "vts": Robo.voltadoSul,
    "nvto": Robo.naoVoltadoOeste,
    "vto": Robo.voltadoOeste,
    "nvtl": Robo.naoVoltadoLeste,
    "vtl": Robo.voltadoLeste
  };

  if (comando == 'set') {
    var auxiliarSet = auxiliar[1].split(',');
    var enderecoDestino = auxiliarSet[0];
    var enderecoOrigem = auxiliarSet[1];

    eval('D[' + enderecoDestino + '] = ' + enderecoOrigem);
  } else if (comando == 'jump') {
    eval('ip = ' + auxiliar[1]);
  } else if (comando == 'jumpt') {
    var auxiliarJumpt = auxiliar[1].split(',');
    var condicao = auxiliarJumpt[1];

    if (condicao.length > 4) {
      eval('var t = ' + condicao);
      if (t) {
        eval("ip = " + parseInt(auxiliarJumpt[0]));
      }
    } else {
      if (condicao in comandos) {
        comandos[condicao]();
      }
    }
  } else if (comando == 'dsl') {
    encerrarExecucao = true;
  } else if (comando in comandos) {
    comandos[comando]();
  }
}
