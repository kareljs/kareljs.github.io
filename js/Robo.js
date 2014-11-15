function Robo() {
  this.x = 1;
  this.y = 1;
  this.bipes = 0;
  this.direcao = 'leste';
}

Robo.prototype.mova = function() {
  if (this.direcao == 'norte') {
    this.y++;
  } else if (this.direcao == 'sul') {
    this.y--;
  } else if (this.direcao == 'leste') {
    this.x++;
  } else if (this.direcao == 'oeste') {
    this.x--;
  }

  console.log(' MOV: |-> x: ' + this.x + ' | y: ' + this.y + ' | direcao: ' + this.direcao);
};

Robo.prototype.vireEsquerda = function() {
  if (this.direcao == 'norte') {
    this.direcao = 'oeste';
  } else if (this.direcao == 'sul') {
    this.direcao = 'leste';
  } else if (this.direcao == 'leste') {
    this.direcao = 'norte';
  } else if (this.direcao == 'oeste') {
    this.direcao = 'sul';
  }

  console.log(' VRE: |-> x: ' + this.x + ' | y: ' + this.y + ' | direcao: ' + this.direcao);
};

Robo.prototype.imprimeCoordenadas = function() {
  console.log('x: ' + this.x + ' | y: ' + this.y + ' | direcao: ' + this.direcao);
};
