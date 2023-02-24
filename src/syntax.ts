import { CompletionItemKind } from "vscode";

const keywords = {
    kind: CompletionItemKind.Keyword,
    items:
        [
            {
                label: "return",
                documentation: "Returns a value from a function.",
            },
            {
                label: "if",
                documentation: "If statement.",
            },
            {
                label: "else",
                documentation: "Else statement.",
            },
            {
                label: "while",
                documentation: "While loop.",
            },
            {
                label: "var",
                documentation: "Declares a variable.",
            },
            {
                label: "do",
                documentation: "Do while loop.",
            },
            {
                label: "break",
                documentation: "Breaks out of a loop.",
            },
            {
                label: "continue",
                documentation: "Continues to the next iteration of a loop.",
            },
            {
                label: "switch",
                documentation: "Switch expression.",
            },
            {
                label: "default",
                documentation: "Default case for a switch expression.",
            },
        ]
};

const constants = {
    kind: CompletionItemKind.Constant,
    items:
        [
            {
                label: "true",
                documentation: "Boolean true.",
            },
            {
                label: "false",
                documentation: "Boolean false.",
            },
            {
                label: "null",
                documentation: "Null value.",
            },
            {
                label: "this",
                documentation: "The current object.",
            },
        ]
};

const functions = {
    kind: CompletionItemKind.Function,
    items:
        [
            {
                label: "$print(arg)",
                documentation: "Prints the value of the argument to the console.",
                insertText: "print",
            },
            {
                label: "$int(arg)",
                documentation: "Converts the argument to an integer.",
                insertText: "int",
            },
            {
                label: "$float(arg)",
                documentation: "Converts the argument to a float.",
                insertText: "float",
            },
            {
                label: "$string(arg)",
                documentation: "Converts the argument to a string.",
                insertText: "string",
            },
            {
                label: "$bool(arg)",
                documentation: "Converts the argument to a boolean.",
                insertText: "bool",
            },
        ]
};

const operators = {
    kind: CompletionItemKind.Operator,
    items:
        [
            {
                label: "+",
                documentation: "Addition operator.",
            },
            {
                label: "-",
                documentation: "Subtraction operator.",
            },
            {
                label: "*",
                documentation: "Multiplication operator.",
            },
            {
                label: "/",
                documentation: "Division operator.",
            },
            {
                label: "%",
                documentation: "Modulo operator.",
            },
            {
                label: '<<',
                documentation: "Left shift operator.",
            },
            {
                label: '>>',
                documentation: "Right shift operator.",
            },
            {
                label: '>>>',
                documentation: "Unsigned right shift operator.",
            },
            {
                label: '&',
                documentation: "Bitwise AND operator.",
            },
            {
                label: '|',
                documentation: "Bitwise OR operator.",
            },
            {
                label: '^',
                documentation: "Bitwise XOR operator.",
            },
            {
                label: "&&",
                documentation: "Logical AND operator.",
            },
            {
                label: "||",
                documentation: "Logical OR operator.",
            },
            {
                label: "==",
                documentation: "Equality operator.",
            },
            {
                label: "!=",
                documentation: "Inequality operator.",
            },
            {
                label: "<",
                documentation: "Less than operator.",
            },
            {
                label: ">",
                documentation: "Greater than operator.",
            },
            {
                label: "<=",
                documentation: "Less than or equal to operator.",
            },
            {
                label: ">=",
                documentation: "Greater than or equal to operator.",
            },
            {
                label: "=",
                documentation: "Assignment operator.",
            },
            {
                label: "+=",
                documentation: "Addition assignment operator.",
            },
            {
                label: "-=",
                documentation: "Subtraction assignment operator.",
            },
            {
                label: "*=",
                documentation: "Multiplication assignment operator.",
            },
            {
                label: "/=",
                documentation: "Division assignment operator.",
            },
            {
                label: "%=",
                documentation: "Modulo assignment operator.",
            },
            {
                label: "<<=",
                documentation: "Left shift assignment operator.",
            },
            {
                label: ">>=",
                documentation: "Right shift assignment operator.",
            },
            {
                label: ">>>=",
                documentation: "Unsigned right shift assignment operator.",
            },
            {
                label: "&=",
                documentation: "Bitwise AND assignment operator.",
            },
            {
                label: "|=",
                documentation: "Bitwise OR assignment operator.",
            },
            {
                label: "^=",
                documentation: "Bitwise XOR assignment operator.",
            },
            {
                label: "++=",
                documentation: "Addition assignment operator that returns the original value.",
            },
            {
                label: "--=",
                documentation: "Subtraction assignment operator that returns the original value.",
            },
        ]
};

export const syntax:
    { kind: CompletionItemKind, items: { label: string, documentation: string, insertText?: string }[] }[]
    = [functions, keywords, operators, constants];

