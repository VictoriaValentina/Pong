//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 20;
let raio = dBolinha / 2;

//variaveis da raquete
let xRaquete = 10;
let yRaquete = 160;
let lRaquete = 10;
let aRaquete = 80;

//variaveis da raquete inimiga
let xInRaquete = 580;
let yInRaquete = 160;
let velocidadeYRaquete;

//variaveis da velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

//placar do jogo
let meusPontos = 0;
let inimigoPontos = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//chance de errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentoBolinha();
  verificaColisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaqueteInimigo(xInRaquete, yInRaquete);
  movimentoRaquete();
  movimentoInRaquete();
  verificaColisaoRaquete();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, dBolinha);
}

function mostraRaquete(x, y){
    rect(x, y, lRaquete, aRaquete);
}

function mostraRaqueteInimigo(x, y){
    rect(x, y, lRaquete, aRaquete);
}

function movimentoBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBolinha(){
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
  
}

function movimentoRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentoInRaquete(){
  if(keyIsDown(87)){
    yInRaquete -= 10;
  }
  if(keyIsDown(83)){
    yInRaquete += 10;
  }
}

/*function movimentoInRaquete(){
  velocidadeYRaquete = yBolinha - yInRaquete - lRaquete / 2 - 50;
  yInRaquete += velocidadeYRaquete + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (inimigoPontos >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}*/

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + lRaquete && yBolinha - raio < yRaquete + aRaquete && yBolinha + raio > yRaquete ){
    
    velocidadeXBolinha *= -1
    raquetada.play();
  } 
  if (xBolinha + raio > xInRaquete && yBolinha + raio < yInRaquete + aRaquete && yBolinha - raio > yInRaquete){
    
    velocidadeXBolinha *= -1
    raquetada.play();
  } 
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  
  fill(color(218,112,214));
  rect(150, 10, 45, 30);
  fill(255);
  text(meusPontos, 172, 30);
  
  fill(color(218,112,214));
  rect(450, 10, 45, 30);
  fill(255);
  text(inimigoPontos, 472, 30)
}

function marcaPonto(){
  if(xBolinha > 590){
    
    meusPontos += 1;
    ponto.play();
  }
  
  if(xBolinha < 10){
    
    inimigoPontos += 1;
    ponto.play();
  }
}
