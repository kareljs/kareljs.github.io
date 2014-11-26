function Interpretador(codigoObjeto) {
  var C = [];
  var D = [];
  var ip = 0;
  var encerrarExecucao = false;
  var codigo = codigoObjeto.split('\n');
  var karel = new Robo();

  for (var i = 0; i < codigo.length; i++) {
    C[i] = codigo[i];
  }

  var instrucao;
  do {
    instrucao = passo();
  } while (instrucao != "dsl");
  //window.setInterval(passo, 2000);

  karel.imprimeCoordenadas();

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
      "mov": karel.mova,
      "vre": karel.vireEsquerda,
      "peg": karel.pegaBipe,
      "poe": karel.poeBipe
    };
    var testes = {
      "frb": karel.frenteBloqueada,
      "frl": karel.frenteLivre,
      "eqb": karel.esquerdaBloqueada,
      "eql": karel.esquerdaLivre,
      "drb": karel.direitaBloqueada,
      "drl": karel.direitaLivre,
      "nprb": karel.naoProximoBip,
      "prb": karel.proximoBip,
      "nexs": karel.naoExistemBipsNaBolsa,
      "exs": karel.existemBipsNaBolsa,
      "nvtn": karel.naoVoltadoNorte,
      "vtn": karel.voltadoNorte,
      "nvts": karel.naoVoltadoSul,
      "vts": karel.voltadoSul,
      "nvto": karel.naoVoltadoOeste,
      "vto": karel.voltadoOeste,
      "nvtl": karel.naoVoltadoLeste,
      "vtl": karel.voltadoLeste
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

      if (condicao == 'frl') {

      }

      if (condicao.length > 4) {
        eval('var t = ' + condicao);
        if (t) {
          eval("ip = " + parseInt(auxiliarJumpt[0]));
        }
      } else {
        if (condicao in testes) {
          testes[condicao]();
        }
      }
    } else if (comando == 'dsl') {
      encerrarExecucao = true;
    } else if (comando == 'mov') {
      karel.mova();
    } else if (comando == 'vre') {
      karel.vireEsquerda();
    }
  }
}
