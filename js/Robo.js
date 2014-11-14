function Robo() {
  this.buffer = '--------\n';
  this.x = 1;
  this.y = 1;
  this.bips = 0;
  this.direcao = 'leste';
}

Robo.prototype.mova = function mova() {
  this.buffer += 'Mova\n';
  console.log('Fui chamado');

  if (this.direcao == 'norte') {
    this.y++;
  } else if (this.direcao == 'sul') {
    this.y--;
  } else if (this.direcao == 'leste') {
    this.x++;
  } else if (this.direcao == 'oeste') {
    this.x--;
  }

  console.log(' |-> x: ' + this.x);
  console.log(' |-> y: ' + this.y);
  console.log(' |-> direcao: ' + this.direcao);
};

Robo.prototype.vireEsquerda = function vireEsquerda() {
  this.buffer += 'Vire Esquerda\n';

  if (this.direcao == 'norte') {
    this.direcao = 'oeste';
  } else if (this.direcao == 'sul') {
    this.direcao = 'leste';
  } else if (this.direcao == 'leste') {
    this.direcao = 'norte';
  } else if (this.direcao == 'oeste') {
    this.direcao = 'sul';
  }
};

Robo.prototype.frenteBloqueada = function() {this.buffer += 'Frente bloqueada\n';};
Robo.prototype.frenteLivre = function() {this.buffer += 'Frente livre\n';};
Robo.prototype.esquerdaBloqueada = function() {this.buffer += 'Esquerda bloqueada\n';};
Robo.prototype.esquerdaLivre = function() {this.buffer += 'Esquerda livre\n';};
Robo.prototype.direitaBloqueada = function() {this.buffer += 'Direita bloqueada\n';};
Robo.prototype.direitaLivre = function() {this.buffer += 'Direita livre\n';};
Robo.prototype.naoProximoBip = function() {this.buffer += 'Não está próximo a bip\n';};
Robo.prototype.proximoBip = function() {this.buffer += 'Está próximo a bip\n';};
Robo.prototype.naoExistemBipsNaBolsa = function() {this.buffer += 'Não existem bips na bolsa\n';};
Robo.prototype.existemBipsNaBolsa = function() {this.buffer += 'Existem bips na bolsa\n';};
Robo.prototype.naoVoltadoNorte = function() {this.buffer += 'Não voltado ao Norte\n';};
Robo.prototype.voltadoNorte = function() {this.buffer += 'Voltado ao Norte\n';};
Robo.prototype.naoVoltadoSul = function() {this.buffer += 'Não voltado ao Sul\n';};
Robo.prototype.voltadoSul = function() {this.buffer += 'Voltado ao Sul\n';};
Robo.prototype.naoVoltadoOeste = function() {this.buffer += 'Não voltado ao Oeste\n';};
Robo.prototype.voltadoOeste = function() {this.buffer += 'Voltado ao Oeste\n';};
Robo.prototype.naoVoltadoLeste = function() {this.buffer += 'Não voltado ao Leste\n';};
Robo.prototype.voltadoLeste = function() {this.buffer += 'Voltado ao Leste\n';};

Robo.prototype.imprimeBuffer = function() {console.log(this.buffer);};
Robo.prototype.imprimeCoordenadas = function() {console.log('x: ' + this.x + ' | y: ' + this.y + ' | direcao: ' + this.direcao);};
