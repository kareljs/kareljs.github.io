function Interpretador(codigoObjeto) {
  var C = [];
  var D = [];
  var ip = 0;
  var encerrarExecucao = false;
  var codigo = codigoObjeto.split('\n');

  for (var i = 0; i < codigo.length; i++) {
    C[i] = codigo[i];
  }

  //var instrucao;
  //do {
  //  instrucao = passo();
  //} while (instrucao != "dsl");
  passo();
  window.setInterval(passo, 300);
  

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
      } else if (condicao.length > 4) {
        eval('var t = ' + condicao);
        if (t) {
          eval("ip = " + parseInt(auxiliarJumpt[0]));
        }
      }
    } else if (comando == 'dsl') {
      encerrarExecucao = true;
    } else if (comando == 'mov') {
      if (!robotMove()) {
        encerrarExecucao = true;
        robotShutOff();
        document.getElementById('error-alert').innerHTML = 'Erro: O Karel não é capaz de passar por paredes';
      }
    } else if (comando == 'vre') {
      robotTurn();
    } else if (comando == 'peg') {
      if (!robotGetBip()) {
        robotShutOff();
        document.getElementById('error-alert').innerHTML = 'Erro: A Esquina não possui nenhum Bipe';
      }
    } else if (comando == 'poe') {
      if (!robotPutBip()) {
        robotShutOff();
        document.getElementById('error-alert').innerHTML = 'Erro: O Karel não possui Bipes em sua Sacola';
      }
    }
  }
}
