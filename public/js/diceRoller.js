const tokenPattern = /\d*[dD]\d+((([+-]\d*[hHlL])|([+-]\d+))(?!d))*/g

const calculate = expr => {
  expr = format2(expr)
  const tokens = [...expr.matchAll(tokenPattern)];
  let result = {};
  result.subResults = [];
  result.total = 0;
  for(let i = 0; i < tokens.length; i++) {
    let subResult = eval(reOrder(tokens[i][0]));
    result.subResults.push(subResult);
    result.total+=subResult.total;
  }
  return result;
}

const eval = token => {
  console.log(token)
  const dicePattern = /\d+d\d+([+-]\d+[HL])*/;
  const numPattern = /\d+/g
  const opPattern = /[+-]/g
  const roll = token.match(dicePattern)[0];
  const remainder = token.split(dicePattern)[2];
  const result = rollDice(roll);
  const vals = remainder.split(opPattern);
  const ops = remainder.split(numPattern);
  let sum = 0;
  for(let i = 0; i < vals.length-1; i++) {
    if(ops[i] === "+") sum+=parseInt(vals[i+1])
    else sum-=parseInt(vals[i+1])
  }
  result.modifier = sum;
  result.total = result.rollSum + sum;
  return result;
}

const rollDice = (roll) => {
  //roll is of form adb+/-cH+/-dL
  const result = {};
  result.expression = roll;
  let a,b,c=0,d=0,cOp="",dOp="";
  const terms = roll.split(/[+-]/);
  const ops = roll.split(/[^-+]+/);
  const rollParams = terms[0].split(/d/)
  a = rollParams[0];
  b = rollParams[1];
  
  if(terms.length === 3) {
    c=terms[1].substring(0,terms[1].length-1);
    cOp = ops[1];
    d=terms[2].substring(0,terms[2].length-1);
    dOp = ops[2]
  }
  if(terms.length === 2) {
    if(terms[1][terms[1].length-1] === "H") {
      c = terms[1].substring(0,terms[1].length-1);
      cOp = ops[1];
      d = 0;
      dOp = "";
    }
    else {
      c = 0;
      cOp = "";
      d = terms[1].substring(0,terms[1].length-1);
      dOp = ops[1]
    }
  }
  
  //console.log(`a: ${a}, b: ${b}, cOp: ${cOp}, c: ${c}, dOp: ${dOp}, d: ${d}`);
  result.allRolls = [];
  //handle the rolls
  for (let i = 0; i < a; i++) {
    const num = Math.floor(Math.random() * b) + 1;
    result.allRolls.push(num);
  }

  //handle dropping rolls
  const sortedRolls = [...result.allRolls];
  sortedRolls.sort((a,b) => a-b)
  let rollModifier = "";
  let firstMod = false;

  if(cOp === "-") {
    rollModifier += `Drop ${c} highest rolls`;
    firstMod = true;
    let num = 0;
    for(let i = sortedRolls.length-1; i >= 0 && num < c; i--) {
      sortedRolls[i] = 0;
      num++;
    }
  }
  if(cOp === "+") {
    rollModifier += `Keep ${c} highest rolls`;
    firstMod = true;
    if(c < sortedRolls.length) {
      let num = 0;
      for(let i = 0; i < sortedRolls.length && num < sortedRolls.length-c; i++) {
        sortedRolls[i] = 0;
        num++;
      }
    }
  }

  if(dOp !== "" && firstMod) rollModifier += " and " 

  if(dOp === "-") {
    rollModifier += `Drop ${d} lowest rolls`;
    firstMod = true;
    let num = 0;
    for(let i = 0; i < sortedRolls.length && num < d; i++) {
      sortedRolls[i] = 0;
      num++;
    }
  }
  if(dOp === "+") {
    rollModifier += `Keep ${d} lowest rolls`;
    firstMod = true;
    if(d < sortedRolls.length) {
      let num = 0;
      for(let i = sortedRolls.length-1; i >= 0 && num < sortedRolls.length-d; i--) {
        sortedRolls[i] = 0;
        num++;
      }
    }
  }

  const moddedRolls = sortedRolls.filter(e => e!=0);
  result.keptRolls = moddedRolls.length < result.allRolls.length ? moddedRolls : result.allRolls;
  result.rollModifier = rollModifier
  result.rollSum = moddedRolls.reduce((a,b) => a+b,0);

  return result;
}

//TODO convert all D to d
const format2 = expr => {
  expr = expr.replace(/\s+/g,"");
  const doubleOpPattern = /[+-]{2}/g
  const diceRollPattern = /(^|[^\d])d\d+/g
  const modPattern = /[^\d][hlHL]/g
  expr = expr.replace(doubleOpPattern, ops => {
    switch(ops) {
      case "++": 
      case "--": return '+';
      case "+-":
      case "-+": return '-';
      default: return "";
    }
  })
  expr = expr.replace(diceRollPattern, (match,p1,offset,string) => {
    console.log(string)
    if(offset > 0) return match[0] + "1" + match.substring(1)
    else return 1 + match;
  });
  expr = expr.replace(modPattern, match => {
    return match[0] + "1" + match.substring(1)
  });
  return expr;
}

const getDoubleOpReplacement = ops => {
  switch(ops) {
    case "++": 
    case "--": return '+';
    case "+-":
    case "-+": return '-';
    default: return "";
  }
} 

const reOrder = expr => {
  //combine all
  const pattern = /[+-]\d*[lLhH]/g;
  const matches = [...expr.matchAll(pattern)]
  let lMod = 0; hMod = 0;
  for(let i = 0; i < matches.length; i++) {
    const lastChar = matches[i][0][matches[i][0].length-1];
    if(lastChar === "l" || lastChar === "L") lMod += parseInt(matches[i])
    else hMod += parseInt(matches[i]);
  }
  //console.log(`lMod=${lMod},hMod=${hMod}`);
  //reorder
  const values = expr.split(/[+-]/);
  const ops = expr.split(/[^+-]+/);
  let newExpr = "";
  newExpr += values[0];
  if(hMod != 0){
    if(hMod > 0) newExpr+="+";
    newExpr += `${hMod}H`;
  }
  if(lMod != 0) {
    if(lMod > 0) newExpr+="+";
    newExpr += `${lMod}L`;
  }
  for(let i = 1; i < values.length; i++) {
    const lastChar = values[i][values[i].length-1]
    if(lastChar.toLowerCase() != "l" && lastChar.toLowerCase() != "h" ) {
      newExpr += `${ops[i]}${values[i]}`;
    }
  }
  return newExpr;
}