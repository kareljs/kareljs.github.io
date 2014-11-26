var code = [];
var instructions = [];
var errorDisplayed = false;
var index = 0;
var execCode = "";
var execOut = [];
var inst_names = [];
var callIndex = [];
var errorOut = [];


function instruction(name, body) {
    this.name = name;
    this.body = body;
    this.address = 0;
    this.size = 0;
}



function begin(original) { //Le arquivo de nome especificado
    var begin = false;
    var end = false;
    errorDisplayed = false;
    original = clean(original);
    //console.log(original);
    code = original.split(" ");
    cleanAll();
    removeBlanks();

    if (code[0].toUpperCase() === "INICIO-DO-PROGRAMA") {
        code = code.slice(1, code.length);
        begin = true;
    }

    if (code[code.length - 1].toUpperCase() === "FIM-DO-PROGRAMA") {
        code = code.slice(0, code.length - 1);
        end = true;
    }

    //console.log(code);

    if (begin && end) {
        index = 0;
        define(code);
        execution();
    }
    else {
        error('Faltando um ou ambos delimitadores de programa');
    }
    if (!errorDisplayed) {
        write();
        print(execOut);
    }
}

function removeBlanks() {
    new_code = [];
    for (var token in code) {
        if (code[token] !== "") {
            new_code.push(clean(code[token]));
        }

    }
    code = new_code;
}

function error(err) {
    if (!errorDisplayed) {
        console.log(' - Erro: ' + err);
        errorOut.push(' - Erro: ' + err);
        errorDisplayed = true;
    }
}

function isLetter(chr) {
    var letter = false;
    if(chr.match(/[[a-z]/i)) {
        letter = true;
    }
    return letter || chr === "-";
}

function isDigit(chr) {
    if (chr.match(/[0-9]/)) {
        return true;
    }
        return false;
}

function isNumber(token) {
    if (token.match(/[0-9]+/)) {
        return true;
    }
    return false;
}

function isIdentifier(token) {
    if (isLetter(token[0]) &&
       token.toUpperCase() !== "INICIO" &&
       token.toUpperCase() !== "FIM" &&
       token.toUpperCase() !== "ENQUANTO" &&
       token.toUpperCase() !== "FACA" &&
       token.toUpperCase() !== "REPITA" &&
       token.toUpperCase() !== "VEZES" &&
       token.toUpperCase() !== "SE" &&
       token.toUpperCase() !== "SENAO" &&
       token.toLowerCase() !== "mova" &&
       token.toLowerCase() !== "vireesquerda" &&
       token.toLowerCase() !== "pegabipe" &&
       token.toLowerCase() !== "poebipe" &&
       token.toLowerCase() !== "desliga" &&
       token.toLowerCase() !== "frente-livre" &&
       token.toLowerCase() !== "frente-bloqueada" &&
       token.toLowerCase() !== "esquerda-livre" &&
       token.toLowerCase() !== "esquerda-bloqueada" &&
       token.toLowerCase() !== "direita-livre" &&
       token.toLowerCase() !== "direita-bloqueada" &&
       token.toLowerCase() !== "proximo-a-bipe" &&
       token.toLowerCase() !== "nao-proximo-a-bipe" &&
       token.toLowerCase() !== "existem-bipes-na-bolsa" &&
       token.toLowerCase() !== "nao-existem-bipes-na-bolsa" &&
       token.toLowerCase() !== "voltado-norte" &&
       token.toLowerCase() !== "nao-voltado-norte" &&
       token.toLowerCase() !== "voltado-oeste" &&
       token.toLowerCase() !== "nao-voltado-oeste" &&
       token.toLowerCase() !== "voltado-sul" &&
       token.toLowerCase() !== "nao-voltado-sul" &&
       token.toLowerCase() !== "voltado-leste" &&
       token.toLowerCase() !== "nao-voltado-leste" &&
       token.toUpperCase() !== "DEFINA-INSTRUCAO" &&
       token.toUpperCase() !== "INICIO-DO-PROGRAMA" &&
       token.toUpperCase() !== "FIM-DO-PROGRAMA" &&
       token.toUpperCase() !== "INICIO-DE-EXECUCAO" &&
       token.toUpperCase() !== "FIM-DE-EXECUCAO") {
        return true;
    }
    return false;
}

function instructionExists(inst_name) {
    for (i in inst_names) {
        if (inst_name === inst_names[i]) {
            return true;
        }
    }
    return false;
}

function isCondition(token) {
    token = token.toLowerCase();
    if (token === "frente-livre" || token === "frente-bloqueada" || token === "esquerda-livre" || token === "esquerda-bloqueada" || token === "direita-livre" || token === "direita-bloqueada" || token === "proximo-a-bipe" || token === "nao-proximo-a-bipe" || token === "existem-bipes-na-bolsa" || token === "nao-existem-bipes-na-bolsa" || token === "voltado-norte" || token === "nao-voltado-norte" || token === "voltado-oeste" || token === "nao-voltado-oeste" || token === "voltado-sul" || token === "nao-voltado-sul" || token === "voltado-leste" || token === "nao-voltado-leste") {
        return true;
    }
    return false;
}

function isInstruction(ind) {
    if (code[ind].toLowerCase() === "mova" || code[ind].toLowerCase() === "vireesquerda" || code[ind].toLowerCase() === "pegabipe" || code[ind].toLowerCase() === "poebipe" || code[ind].toLowerCase() === "desliga") {
        return [true, ind];
    }
    if (isIdentifier(code[ind])) {
        if (instructionExists(code[ind])) {
            return [true, ind];
        }
    }
    return [false, ind];
}

function isStatement(ind) {
    var result = [];
    result = isInstruction(ind);
    if (result[0]) {
        return result;
    }
    result = isBlock(ind);
    if (result[0]) {
        return result;
    }
    result = isIteration(ind);
    if (result[0]) {
        return result;
    }
    result = isLoop(ind);
    if (result[0]) {
        return result;
    }
    result = isConditional(ind);
    if (result[0]) {
        return result;
    }
    return [false, ind];
}

function isBlock(ind) {
    var result = [];
    var next = false;
    if (code[ind].toUpperCase() === "INICIO") {
        ind++;
        if (code[ind].toUpperCase() === "FIM") {
            return [true, ind];
        }
        result = isStatement(ind);
        ind = result[1];
        if (result[0]) {
            ind++;
        }
        else {
            error("Expressão não válida em bloco.");
            return [false, ind];
        }
        if (code[ind] === " ;") {
            next = true;
            ind++;
        }
        while(next) { //A estrutura espera ao menos mais uma expressão valida
            result = isStatement(ind);
            if (!result[0]) {
                if (code[result[1]].toUpperCase() == "FIM") {
                    error('Expressão esperada após ";" em bloco');
                }
                else {
                    error('Expressão não válida em bloco');
                }
                return [false, ind];
            }
            ind = result[1] + 1;

            if (code[ind] !== " ;") {
                next = false;
            }
            else {
                ind++;
            }
        }

        if (code[ind].toUpperCase() === "FIM") {

            return [true, ind];
        }
        error('Palavra "FIM" esperada');
        return [false, ind];
    }
    return [false, ind];

}

function isIteration(ind) {
    var result = [];
    if (code[ind].toUpperCase() === "REPITA") {
        ind++;
        if (isNumber(code[ind])) {
            ind++;
            if (code[ind].toUpperCase() === "VEZES") {
                ind++;
                result = isStatement(ind);
                if (result[0]) {
                    return result;
                }
                error('Expressão esperada');
                return [false, result[1]];
            }
            error('Palavra "VEZES" esperada');
            return [false, ind];
        }
        error('Número esperado');
        return [false, ind];
    }
    return [false, ind];
}

function isConditional(ind) {
    var result = [];
    if (code[ind].toUpperCase() === "SE") {
        ind++;
        if (isCondition(code[ind])) {
            ind++;
            if (code[ind].toUpperCase() === "ENTAO") {
                ind++;
                result = isStatement(ind);
                if (result[0]) {
                    ind = result[1] + 1;
                    if (code[ind].toUpperCase() === "SENAO") {
                        ind++;
                        result = isStatement(ind);
                        if (!result[0]) {
                            error('Expressão esperada depois de "SENAO"');
                        }
                    }
                    return result;
                }
                error('Expressão esperada');
                return result;
            }
            error('Palavra "ENTAO" esperada');
            return result;
        }
        error('Condição esperada');
        return [false, ind];
    }
    return [false, ind];
}

function isLoop(ind) {
    var result = [];
    if (code[ind].toUpperCase() === "ENQUANTO") {
        ind++;
        if (isCondition(code[ind])) {
            ind++;
            if (code[ind].toUpperCase() === "FACA") {
                ind++;
                result = isStatement(ind);
                if (result[0]) {
                    return result;
                }
                error('Expressão esperada');
                return [false, result[1]];

            }
            error('Palavra "FACA" esperada');
            return [false, ind];
        }
        error('Condição esperada');
        return [false, ind];
    }
    return false;
}






function clean(token) {
    return token.replace(/;/g, " ;").replace(/(\n|\r|\r\n|\t)+/g, ' ');
}

function cleanAll() {
    for (var token in code) {
        code[token] = code[token].replace(/(\n|\r|\r\n|\t)/g, ' ');
    }
}

function define(code) { //Trata de definições de novas instruções
    var cond = false;
    var has_inst = false;
    for (var tok in code) {
        if (clean(code[tok]).toUpperCase() === "DEFINA-INSTRUCAO" && tok < code.length - 1) {
            inst_names.push(code[parseInt(tok) + 1]);
            tok = parseInt(tok) + 1;
        }
    }
    console.log(inst_names);
    for (var tok in code) {
        if (clean(code[tok]).toUpperCase() === "DEFINA-INSTRUCAO") {
            has_inst = true;
            var temp = new_inst(code, tok);
            if (temp[0].body === "!") { //Exclamation mark indicates definition error
                console.log('Na definição de instrução "' + temp[0].name + '"');
                break;
            }
            else {
                instructions.push(temp[0]);
                cond = true;
                console.log(temp[0].name + ": " + temp[0].body);
                if (code[temp[1] + 1] !== " ;") {
                    error('";" esperado após definição de função "' + temp[0].name + '".');
                    break;
                }
            }
        }
    }
}

function new_inst(code, inst_ind) { //Retorna um objeto instruction
    var inst_name = "";
    var inst_body = "";
    var stat = "";
    var result = [];
    inst_ind++;
    if (isIdentifier(code[inst_ind])) {
        inst_name = code[inst_ind];
        // location = inst_name;
        inst_ind++;
        if (code[inst_ind].toUpperCase() !== "COMO") {
            return [new instruction(inst_name, "!"), inst_ind];
        }
        inst_ind++;
        result = isStatement(inst_ind);
        if (result[0]) {
            inst_body = code.slice(inst_ind, result[1] + 1).join(" ");
        }
        else {
            return [new instruction(inst_name, "!"), result[1]];
        }

    }
    else {
        console.log('Na definição de instrução: "' + code[inst_ind] + '" não é um identificador válido.');
        return [new instruction("", "!"), result[1]];
    }

    //console.log("\n" + inst_body);
    return [new instruction(inst_name, inst_body), result[1]];
}

function execution() {
    var begin = false;
    var end = false;
    var b_ind;
    var e_ind;
    for (var tok in code) {
        if (code[tok].toUpperCase() === "INICIO-DE-EXECUCAO") {
            b_ind = parseInt(tok) + 1;
            begin = true;
            break;
        }
    }

    for (var tok in code) {
        if (tok in code) {
            if (code[tok].toUpperCase() === "FIM-DE-EXECUCAO" && tok >= b_ind) {
                e_ind = tok - 1;
                end = true;
                break;
            }
        }
    }

    if (begin && end) {
        inExec = true;
        if (exec(b_ind, e_ind)) {
            execCode = code.slice(b_ind, e_ind + 1);
        }
    }
    else {
        error('Faltando um ou ambos delimitadores de execução');
    }
}

function exec(ind, e_ind) {
    var stat = [];
    if (e_ind - ind < 0) {
        error('Instrução esperada');
        return false;
    }
    else {
        stat = isStatement(ind);
        if (!stat[0]) {
            error('Instrução não válida');
            return false;
        }
        else { //Primeira instrução é válida
            ind = stat[1] + 1;
            if (code[e_ind] !== "desliga") {
                error("Palavra desliga esperada antes de FIM-DE-EXECUCAO");
                return false;
            }
            while (ind <= e_ind) {
                if (code[ind] !== " ;") {
                    error("; esperado entre instruções");
                    return false;
                }
                ind++;
                if (code[ind].toUpperCase() === "FIM-DE-EXECUCAO") {
                    error("Instrução esperada após ;");
                    return false;
                }
                stat = isStatement(ind);
                if (!stat[0]) {
                    error("Instrução não válida");
                    return false;
                }
                ind = stat[1] + 1;
            }
            return true;
        }
    }
}

function countVar(cod) {
    var count = 0;
    cod = purge(cod);
    for (i in cod) {
        if (cod[i] == 'REPITA') {
            count++;
        }
    }
    return count;
}

function write() {
    var ind = 0;
    var inst_points = [];
    var next = true;
    var nextCounter = -1; //Posição na memoria do proximo possivel contador
    execOut.push("set 0,2"); //CORRENTE
    execOut.push("set 1," + (countVar(execCode) + 2)); //LIVRE
    inExec = true;
    while(next) {
        ind = readStatement(execCode, ind, nextCounter) + 1;
        if (execCode[ind] === " ;" || execCode[ind] === ";") {
            ind++;
        }
        else {
            next = false;
        }
    }
    for (var i = 0;i < instructions.length;i++) {
        instructions[i].size = countVar(purge(instructions[i].body.split(" "))) + 2;
        instructions[i].address = execOut.length;
        readStatement(purge(instructions[i].body.split(" ")), 0, 1);
        execOut.push("set 1,D[0]");
        execOut.push("set 0,D[D[0]+1]");
        execOut.push("jump D[D[1]]");
    }
    for (var i = 0;i < callIndex.length;i++) {
        for (var j = 0;j < instructions.length;j++) {
            if (instructions[j].name === execOut[callIndex[i]]) {
                execOut[callIndex[i]] = "jump " + instructions[j].address;
                execOut[callIndex[i] - 1] = "set 1,D[1]+" + instructions[j].size;
            }
        }
    }
}

function readStatement(cod, ind, nextCounter) {
    if (cod[ind] === " ;") {
        ind++;
    }

    if (cod[ind].toLowerCase() === "mova") {
        execOut.push("mov");
        return ind;
    }
    if (cod[ind].toLowerCase() === "vireesquerda") {
        execOut.push("vre");
        return ind;
    }
    if (cod[ind].toLowerCase() === "pegabipe") {
        execOut.push("peg");
        return ind;
    }
    if (cod[ind].toLowerCase() === "poebipe") {
        execOut.push("poe");
        return ind;
    }
    if (cod[ind].toLowerCase() === "desliga") {
        execOut.push("dsl");
        return ind;
    }
    if (cod[ind].toUpperCase() === "INICIO") {
        ind++;
        while(cod[ind].toUpperCase() !== "FIM") {
            if (cod[ind] === " ;" || cod[ind] === ";") {
                ind++;
            }
            ind = readStatement(cod, ind, nextCounter) + 1;
        }
        return ind;
    }
    if (cod[ind].toUpperCase() === "SE") {
        var cond; //Condição para pulo
        var jump_ind = 0;
        var else_ind = 0;
        ind++;
        cond = getJumpCondition(cod[ind]);
        ind++;
        execOut.push("Placeholder");
        jump_ind = execOut.length - 1;
        ind = readStatement(cod, ind + 1, nextCounter);
        if (cod[ind + 1].toUpperCase() === "SENAO") {
            ind = ind + 2;
            execOut.push("Placeholder");
            else_ind = execOut.length - 1;
            execOut[jump_ind] = "jumpt " + (execOut.length) + "," + cond;
            ind = readStatement(cod, ind, nextCounter);
            execOut[else_ind] = "jump " + execOut.length;
            return ind;
        }
        execOut[jump_ind] = "jumpt " + execOut.length + "," + cond;
        return ind;
    }
    if (cod[ind].toUpperCase() === "REPITA") {
        var jump_ind;
        var jumpback_ind;
        nextCounter++;
        ind++;
        var counter = parseInt(cod[ind]);
        if (nextCounter > 0) {
            execOut.push("set D[0]+" + nextCounter + ",0");
        }
        else {
            execOut.push("set D[0],0");
        }
        execOut.push("jumpt ??,D[0]+" + nextCounter + ">=" + counter);
        ind = ind + 2;
        jumpback_ind = execOut.length - 1;
        ind = readStatement(cod, ind, nextCounter);
        if (nextCounter > 0) {
            execOut.push("set D[0]+" + nextCounter + ",D[D[0]+" + nextCounter + "]+1");
        }
        else {
            execOut.push("set D[0],D[D[0]]+1");
        }
        execOut.push("jump " + jumpback_ind);
        jump_ind = execOut.length;
        if (nextCounter > 0) {
            execOut[jumpback_ind] = "jumpt " + jump_ind + ",D[D[0]+" + nextCounter + "]>=" + counter;
        }
        else {
            execOut[jumpback_ind] = "jumpt " + jump_ind + ",D[0]>=" + counter;
        }

        return ind;
    }

    if (cod[ind].toUpperCase() === "ENQUANTO") {
        var jump_ind;
        var jumpback_ind;
        ind++;
        var cond = getJumpCondition(cod[ind]);
        ind = ind + 2;
        execOut.push("Placeholder");
        jumpback_ind = execOut.length - 1;
        ind = readStatement(cod, ind, nextCounter);
        execOut.push("jump " + jumpback_ind);
        jump_ind = execOut.length;
        execOut[jumpback_ind] = "jumpt " + jump_ind + "," + cond;
        return ind;
    }

    if (instructionExists(cod[ind])) {
        execOut.push("set D[1]," + (execOut.length + 5));
        execOut.push("set D[1]+1,D[0]");
        execOut.push("set 0,D[1]");
        execOut.push(cod[ind]); //set 1,D[1]+tamanho do RA
        execOut.push(cod[ind]); //jump endereço
        callIndex.push(execOut.length - 1);
        return ind;
    }
}

function getJumpCondition(token) {
    var cond = {"frente-livre": "frb",
      "frente-bloqueada": "frl",
      "esquerda-livre": "eqb",
      "esquerda-bloqueada": "eql",
      "direita-livre": "drb",
      "direita-bloqueada": "drl",
      "proximo-a-bipe": "nprb",
      "nao-proximo-a-bipe": "prb",
      "existem-bipes-na-bolsa": "nexs",
      "nao-existem-bipes-na-bolsa": "exs",
      "voltado-norte": "nvtn",
      "nao-voltado-norte": "vtn",
      "voltado-sul": "nvts",
      "nao-voltado-sul": "vts",
      "voltado-oeste": "nvto",
      "nao-voltado-oeste": "vto",
      "voltado-leste": "nvtl",
      "nao-voltado-leste": "vtl"};

    if (typeof token === 'string') {
        token = token.toLowerCase();
        if (token in cond) {
            return cond[token];
        }
    }
}

function print(arr) {
    for (el in arr) {
        console.log(el + " " + arr[el]);
    }
}

function purge(arr) {
    for (var i = 0; i < arr.length;i++) {
        if (typeof arr[i] !== 'string' || arr[i] === "") {
            arr.splice(i, 1);
            i = 0;
        }
    }
    return arr;
}
