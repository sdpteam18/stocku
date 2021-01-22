def infixToPostfix(infixexpr):
    prec = {}
    prec["*"] = 3
    prec["/"] = 3
    prec["+"] = 2
    prec["-"] = 2
    prec["("] = 1
    opStack = []
    postfixList = []
    tokenList = infixexpr.split()

    for token in tokenList:

        if token == '(':
            opStack.append(token)
        elif token == ')':
            topToken = opStack.pop()
            while topToken != '(':
                postfixList.append(topToken)
                topToken = opStack.pop()
        elif token == '*' or token == '/' or token == '+' or token == '-':
            while (opStack and (prec[opStack[-1]] >= prec[token])):
                postfixList.append(opStack.pop())
            opStack.append(token)
        else:
            postfixList.append(token)

    while opStack:
        postfixList.append(opStack.pop())
    return " ".join(postfixList)


#print(infixToPostfix("10.4 * 5 + 6 * 1"))
#print(infixToPostfix("( A + B ) * C - ( D - E ) * ( F + G )"))


def postfixEval(postfixExpr):
    operandStack = []
    tokenList = postfixExpr.split()

    for token in tokenList:
        if token in "*/+-":
            operand2 = operandStack.pop()
            operand1 = operandStack.pop()
            result = doMath(token, operand1, operand2)
            operandStack.append(result)
        else:
            operandStack.append(float(token))
    return operandStack.pop()


def doMath(op, op1, op2):
    if op == "*":
        return op1 * op2
    elif op == "/":
        return op1 / op2
    elif op == "+":
        return op1 + op2
    elif op == ">":
        return op1 > op2
    elif op == "<":
        return op1 < op2
    elif op == "=":
        return op1 == op2
    else:
        return op1 - op2


#print(postfixEval('70.4 8 + 3 2 + /'))
#print(doMath('=', 5, 5))
