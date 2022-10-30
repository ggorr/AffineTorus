type UnaryFunc = (x: number) => number;
type BinaryFunc = (x: number, y: number) => number;

const unaryOps: [string, UnaryFunc][] = [
    ['+', (x: number) => x], ['-', (x: number) => -x]
];

function getUnaryOp(token: Token): UnaryFunc | null {
    for (let i = 0; i < unaryOps.length; i++)
        if (token[0] == unaryOps[i][0])
            return unaryOps[i][1];
    return null;
}

const binaryOps: [string, BinaryFunc][][] = [
    [['+', (x: number, y: number) => x + y], ['-', (x: number, y: number) => x - y]],
    [['*', (x: number, y: number) => x * y], ['/', (x: number, y: number) => x / y]]
];

function getBinaryOp(token: Token, level: number): BinaryFunc | null {
    for (let i = 0; i < binaryOps[level].length; i++)
        if (token[0] == binaryOps[level][i][0])
            return binaryOps[level][i][1];
    return null;
}

const unaryFuncs: [string, UnaryFunc][] = [
    ['cos', Math.cos], ['sin', Math.sin], ['sqrt', Math.sqrt]
];

function getUnaryFunc(token: Token): UnaryFunc | null {
    for (let i = 0; i < unaryFuncs.length; i++)
        if (token[0] == unaryFuncs[i][0])
            return unaryFuncs[i][1];
    return null;
}

const binaryFuncs: [string, BinaryFunc][] = [
    ['pow', Math.pow]
];
function getBinaryFunc(token: Token): BinaryFunc | null {
    for (let i = 0; i < binaryFuncs.length; i++)
        if (token[0] == binaryFuncs[i][0])
            return binaryFuncs[i][1];
    return null;
}

const symConsts: [string, number][] = [
    ['pi', Math.PI], ['e', Math.E]
];

function getSymConst(token: Token): number | null {
    for (let i = 0; i < symConsts.length; i++)
        if (token[0] == symConsts[i][0])
            return symConsts[i][1];
    return null;
}

const separator: string[][] = [
    [',', ',']
];

// symbol, type, position
type Token = [string, string, number];

// regular expression escape characters: []\^*+?{}|()$.
// type - ' ': space, '(': open, ')': close, ',': comma, 'o': operator, 'n': numeric, 'a': alphanumerics with alphabetic start
function tokenize(line: string): Token[] {
    // trim end
    let last = line.length - 1;
    while (last >= 0 && line[last] == ' ')
        last--;
    if (last < 0)
        throw new Error('110, empty string');
    line = line.slice(0, last + 1);
    // tokenize
    let tokens: Token[] = [];
    let pos = 0;
    while (pos < line.length) {
        let pos1 = pos + 1;
        if (line[pos] == ' ') {
            // if (tokens.length > 0 && tokens[tokens.length - 1][1] != ' ')
            //     tokens.push([' ', ' ', pos]);
        } else if (line[pos].match(/[\+\-\*\/]/))
            tokens.push([line[pos], 'o', pos]);
        else if (line[pos].match(/[\(\),]/))
            tokens.push([line[pos], line[pos], pos]);
        else if (line[pos].match(/[0-9\.]/)) {
            while (pos1 < line.length && line[pos1].match(/[0-9\.]/)) pos1++;
            tokens.push([line.slice(pos, pos1), 'n', pos]);
        } else if (line[pos].match(/[A-Za-z]/)) {
            while (pos1 < line.length && line[pos1].match(/[A-Za-z0-9]/)) pos1++;
            tokens.push([line.slice(pos, pos1), 'a', pos]);
        } else
            throw new Error(`110, invalid symbol ${line[pos]} at ${pos}`);
        pos = pos1;
    }
    return tokens;
}

// regular expression escape characters: []\^*+?{}|()$.
// u: unary operator, b: binary operator, 1: 1 variable function, 2: 2 variable function, 
// n: numeric, c: symbolic constant such as pi
function classify(tokens: Token[]) {
    let depth = 0;
    let n = 0;
    let start = true;
    while (n < tokens.length) {
        if (tokens[n][0] == '(') {
            depth++;
            if (n + 1 == tokens.length)
                throw new Error(`210, invalid symbol ${tokens[n][0]} at ${tokens[n][2]}`)
            if (!start) {
                tokens.splice(n, 0, ['*', 'b', -1]);
                n++;
            }
            start = true;
        } else if (tokens[n][0] == ',') {
            if (n == 0 || tokens[n - 1][0].match(/[\(\+\-\*\/]/) || n + 1 == tokens.length)
                throw new Error(`215, invalid symbol ${tokens[n][0]} at ${tokens[n][2]}`)
            start = true;
        } else if (tokens[n][0] == ')') {
            depth--;
            if (n == 0 || tokens[n - 1][0].match(/[\(\+\-\*\/]/))
                throw new Error(`220, invalid symbol ${tokens[n][0]} at ${tokens[n][2]}`)
            start = false;
        } else if (tokens[n][0] == '+' || tokens[n][0] == '-') {
            if (n + 1 == tokens.length)
                throw new Error(`225, invalid symbol ${tokens[n][0]} at ${tokens[n][2]}`)
            if (start) {
                tokens[n][1] = 'u'
                if (n > 0 && tokens[n - 1][1] == 'u') {
                    tokens[n][0] = tokens[n - 1][0] == tokens[n][0] ? '+' : '-';
                    tokens.splice(n - 1, 1);
                    n--;
                }
            } else
                tokens[n][1] = 'b';
            start = true;
        } else if (tokens[n][0] == '*' || tokens[n][0] == '/') {
            if (start || n + 1 == tokens.length)
                throw new Error(`230, invalid symbol ${tokens[n][0]} at ${tokens[n][2]}`)
            tokens[n][1] = 'b';
            start = true;
        } else if (tokens[n][1] == 'a') {
            if (!start) {
                tokens.splice(n, 0, ['*', 'b', -1]);
                n++;
            }
            if (getUnaryFunc(tokens[n]) != null) {
                if (n + 1 == tokens.length)
                    throw new Error(`235, incomplete expression`)
                tokens[n][1] = '1';
            } else if (getBinaryFunc(tokens[n]) != null) {
                if (n + 1 == tokens.length)
                    throw new Error(`240, incomplete expression`)
                if (tokens[n + 1][0] != '(')
                    throw new Error(`245, invalid symbol ${tokens[n + 1][0]} at ${tokens[n + 1][2]}`)
                tokens[n][1] = '2';
            } else if (getSymConst(tokens[n]) != null)
                tokens[n][1] = 'c';
            else
                throw new Error(`250, invalid symbol ${tokens[n][0]} at ${tokens[n][2]}`)
            start = tokens[n][1] != 'c';
        } else if (tokens[n][1] == 'n') {
            if (tokens[n][0].indexOf('.') != tokens[n][0].lastIndexOf('.'))
                throw new Error(`255, invalid symbol ${tokens[n][0]} at ${tokens[n][2]}`);
            if (start) {
                if (n > 0 && tokens[n - 1][1] == 'u') {
                    if (tokens[n - 1][0] == '-')
                        tokens[n][0] = '-' + tokens[n][0];
                    tokens.splice(n - 1, 1);
                    n--;
                }
            } else {
                tokens.splice(n, 0, ['*', 'b', -1]);
                n++;
            }
            start = false;
        }
        n++;
    }
    if (depth != 0)
        throw new Error('260, mismatched parentheses');
}

function calculate(tokens: Token[]): number {
    // binary operator
    for (let level = 0; level < binaryOps.length; level++) {
        let depth = 0;
        let n = tokens.length - 1;
        while (n > 0) {
            if (tokens[n][1] == 'b' && depth == 0) {
                let f = getBinaryOp(tokens[n], level);
                if (f != null)
                    return f(calculate(tokens.slice(0, n)), calculate(tokens.slice(n + 1)));
            } else if (tokens[n][0] == ')')
                depth++;
            else if (tokens[n][0] == '(')
                depth--;
            else if (tokens[n][0] == ',' && depth == 0)
                throw new Error(`310, invalid symbol ${tokens[n][0]} at ${tokens[n][2]}`)
            n--;
        }
    }
    // unary operator
    if (tokens[0][1] == 'u') {
        let f = getUnaryOp(tokens[0]) as UnaryFunc;
        return f(calculate(tokens.slice(1)));
    }
    // unary function
    if (tokens[0][1] == '1') {
        let f = getUnaryFunc(tokens[0]) as UnaryFunc;
        if (tokens[1][0] == '(')
            return f(calculate(tokens.slice(2, tokens.length - 1)));
        else
            return f(calculate(tokens.slice(1)));
    }
    // binary function
    if (tokens[0][1] == '2') {
        let comma = 0;
        for (let i = 3; i < tokens.length - 1; i++)
            if (tokens[i][0] == ',') {
                comma = i;
                break;
            }
        if (comma == 0)
            throw new Error(`330, invalid expression ${tokens[tokens.length - 1][0]} at ${tokens[tokens.length - 1][2]}`)
        let f = getBinaryFunc(tokens[0]) as BinaryFunc;
        return f(calculate(tokens.slice(2, comma)), calculate(tokens.slice(comma + 1, tokens.length - 1)));
    }
    // parentheses
    if (tokens[0][1] == '(') {
        return calculate(tokens.slice(1, tokens.length - 1));
    }
    // symbolic constant
    if (tokens[0][1] == 'c')
        return getSymConst(tokens[0]) as number;
    // numeric
    return parseFloat(tokens[0][0]);
}

function evaluate(line: string): number {
    try {
        let tokens = tokenize(line);
        classify(tokens);
        return calculate(tokens);
    } catch (err) {
        throw err;
    }
}
export { Token as token, tokenize, classify, calculate, evaluate };