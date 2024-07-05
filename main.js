import { generatePublic } from "./utils/generators.js";
import walletsArray from './data/wallets.js';

const min = 0x20000000000000000;
const max = 0x3ffffffffffffffff;
let jump = BigInt(10000000000000000000);

const walletsSet = new Set(walletsArray);

let key = BigInt(min);

const zeroes = Array.from({ length: 65 }, (_, i) => '0'.repeat(64 - i));
let running = true;
let startTime = Date.now();
let loopTime =  Date.now();
let exploredKeys = 0;
let countKeysSeconds = 0;

while (running) {
  key = key + BigInt(jump);

  let pkey = key.toString(16);
  pkey = `${zeroes[pkey.length]}${pkey}`;

  let publicKey = generatePublic(pkey);

  exploredKeys ++;
  countKeysSeconds ++;
  if (walletsSet.has(publicKey)) {
    console.log(pkey);
    console.log(publicKey);
    console.log('BTC encontrado!!!!');
    console.log('Jumper: ', jump);
    const tempo = (Date.now() - startTime) / 1000;
    console.log('Tempo:', tempo, ' segundos');

    running = false;
  }

  if ((Date.now() - loopTime) >= 10000) {
    console.log(pkey);
    console.log(publicKey);
    loopTime =  Date.now();
    console.log('Quantidade de chaves exploradas: ', exploredKeys);
    console.log('Velocidade:', countKeysSeconds/10, 'keys/s');
    countKeysSeconds = 0;
  }

  if (key > max) {
    console.log(pkey);
    console.log(publicKey);
    const tempo = (Date.now() - startTime) / 1000;
    console.log('Tempo:', tempo, ' segundos');
    console.log('Key maior que o máximo:', key, ' > ', max);
    console.log('Jumper: ', jump);
    console.log('Quantidade de chaves exploradas: ', exploredKeys);
    exploredKeys = 0;
    key = BigInt(min);
    let random = parseInt(Math.random()* (10 - 1) + 1);
    if (random === 0)
      random = 2;

    console.log('Random: ',random);
    jump = jump/BigInt(2);
    if (jump === 1)
      running = false;
    
    if (jump < 1) {
      console.log('Jumper menor que 1', jump);
      jump = 1;
    }

    startTime = Date.now();
  }
}