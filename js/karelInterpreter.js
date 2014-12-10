function Interpretador(codigoObjeto) {
  var C = [];
  var D = [];
  var ip = 0;
  var encerrarExecucao = false;
  var codigo = codigoObjeto.split('\n');
  var erros = false;

  for (var i = 0; i < codigo.length; i++) {
    C[i] = codigo[i];
  }

  var instrucao;
  do {
    instrucao = passo();
  } while (instrucao != "dsl");
  //window.setInterval(passo, 2000);

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
      "mov": robotMove,
      "vre": robotTurn,
      "peg": robotGetBip,
      "poe": robotPutBip
    };
    var testes = {
      "frb": !robotFrontFree,
      "frl": robotFrontFree,
      "eqb": !robotLeftFree,
      "eql": robotLeftFree,
      "drb": !robotRightFree,
      "drl": robotRightFree,
      "nprb": !robotNearBip,
      "prb": robotNearBip,
      "nexs": !robotBipOnBag,
      "exs": robotBipOnBag,
      "nvtn": !robotDirNoth,
      "vtn": robotDirNoth,
      "nvts": !robotDirSouth,
      "vts": robotDirSouth,
      "nvto": !robotDirWest,
      "vto": robotDirWest,
      "nvtl": !robotDirEast,
      "vtl": robotDirEast
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
      var jump = false;

      if (condicao == 'frl') {
          jump = robotFrontFree();
      }
      else if (condicao == 'frb') {
        jump = !robotFrontFree();
      }
      else if (condicao == 'eql') {
        jump = robotLeftFree();
      }
      else if (condicao == 'eqb') {
        jump = !robotLeftFree();
      }
      else if (condicao == 'drl') {
        jump = robotRightFree();
      }
      else if (condicao == 'drb') {
        jump = !robotRightFree();
      }
      else if (condicao == 'prb') {
        jump = robotNearBip();
      }
      else if (condicao == 'nprb') {
        jump = !robotNearBip();
      }
      else if (condicao == 'exs') {
        jump = robotBipOnBag();
      }
      else if (condicao == 'nexs') {
        jump = !robotBipOnBag();
      }
      else if (condicao == 'vtn') {
        jump = robotDirNoth();
      }
      else if (condicao == 'nvtn') {
        jump = !robotLeftFree();
      }
      else if (condicao == 'vto') {
        jump = robotDirWest();
      }
      else if (condicao == 'nvto') {
        jump = !robotDirWest();
      }
      else if (condicao == 'vtl') {
        jump = robotDirEast();
      }
      else if (condicao == 'nvtl') {
        jump = !robotDirEast();
      }
      else if (condicao == 'vts') {
        jump = robotDirSouth();
      }
      else if (condicao == 'nvts') {
        jump = !robotDirSouth();
      }
      
      if (jump) {
        ip = parseInt(auxiliarJumpt[0]);
      }
      else if (condicao.length > 4) {
        eval('var t = ' + condicao);
        if (t) {
          eval("ip = " + parseInt(auxiliarJumpt[0]));
        }
      } /*else {
        if (condicao in testes) {
          testes[condicao]();
        }
      }*/
    } else if (comando == 'dsl') {
      encerrarExecucao = true;
    } else if (comando == 'mov') {
      
      if (!robotMove()) {
        console.log("Sem espaço para movimentação");
        erros = true;
      }
    } else if (comando == 'vre') {
      robotTurn();
    }
    else if (comando == 'peg') {
      if (!robotGetBip()) {
        console.log("Nenhum bip alcançável pelo robô");
        erros = true;
      }
    }
    else if (comando == 'poe') {
      if (!robotPutBip) {
        console.log("Sem bips na bolsa");
        erros = true;
      }
    }
  }
}
