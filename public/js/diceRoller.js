const rollDice = (roll) => {
  if(!/\d/.test(roll[0])) roll = 1 + roll;
  const op = roll.split(/\d+/)[2];
  const tokens = roll.split(/[d+-]/)
  const rolls = []
  let sum = 0;
  for (let j = 0; j < tokens[0]; j++) {
    const max = parseInt(tokens[1]);
    const num = Math.floor(Math.random() * max) + 1;
    rolls.push(num);
    sum+=num;
  }
  let mod = 0
  if(tokens.length === 3) {
    if(tokens[2] === "l" || tokens[2] === "L") mod = rolls.reduce((a,b) => Math.min(a,b))
    else if(tokens[2] === "h" || tokens[2] === "H") mod = rolls.reduce((a,b) => Math.max(a,b))
    else mod = parseInt(tokens[2]);
  }
  mod = op==="+" ? mod : -mod;
  rolls.push(mod)
  const total = sum + mod;
  rolls.push(total);
  return rolls;
}

const rollDie = expr => {
  if(expr.match(exprPattern) === null || expr.match(exprPattern)[0] != expr) {
    console.log("bad expression")
    return;
  }
  expr = format(expr);
  const temp = expr.split(rollPattern);
  let ops = [];
  for(let i = 3; i < temp.length-1; i+=3) {
    ops.push(temp[i]);
  }
  const tokens = Array.from(rollPattern[Symbol.matchAll](expr),x=>x[0]);
  let sum = 0;
  const rolls = [];
  rolls.push(rollDice(tokens[0]))
  logResult(tokens[0],rolls[0])
  sum+=rolls[0][rolls[0].length-1];
  for(let i = 1; i < tokens.length; i++) {
    rolls.push(rollDice(tokens[i]));
    if(ops[i-1] === "+") sum+=rolls[i][rolls[i].length-1];
    else sum-=rolls[i][rolls[i].length-1];
    logResult(tokens[i],rolls[i]);
  }
  console.log("Grand total: " + sum);
  rolls.push(sum);
  return rolls;
}

const logResult = (roll, result) => {
  console.log("roll " + roll);
  for(let i = 0; i < result.length-2; i++) {
    console.log("roll " + (i+1) + ": " + result[i]);
  }
  console.log("roll modifier: " + result[result.length-2])
  console.log("roll total: " + result[result.length-1] + "\n\n");
}

const format = expr => expr.split(/\s+/).join("");

const exprPattern = /((\s*\d*\s*d\s*\d+\s*([+-]\s*(\d+|[lLhH]))?\s*)[+-])*\s*\d*\s*d\s*\d+\s*([+-]\s*(\d+|[lLhH]))?\s*$/

const rollPattern = /\d*d\d+([+-](\d+|[lLhH]))?(?=[+-]|$)/g