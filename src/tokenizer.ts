import { isRegExp } from "util/types";
import { Position, TextDocument } from "vscode";
import { syntax } from "./syntax";

const keywords = syntax[1].items.map(item => item.label).concat(syntax[0].items.map(item => item.label));
const operators = syntax[2].items.map(item => item.label);
const constants = syntax[3].items.map(item => item.label);

enum TokenType {
    keyword,
    identifier,
    value,
    openParenthesis,
    closeParenthesis,
    openBracket,
    closeBracket,
    openBrace,
    closeBrace,
    comma,
    semicolon,
    dot,
    operator,
    constant
}

class Token {
    constructor(public value: string, public position: Position, public type: TokenType) { }
}

const peek = (document: TextDocument, position: Position, offset: number = 1): string => {
    return document.lineAt(position.line).text.charAt(position.character + offset);
}

function tokenize(document: TextDocument, startPos: Position): Token[] {
    let tokens: Token[] = [];
    let position = startPos;
    while (position.line <= document.lineCount - 1) {
        let line = document.lineAt(position.line).text;
        while (position.character < line.length) {
            let char = line.charAt(position.character);
            if (char !== " " && char !== "\t") {
                switch (char) {
                    case '(':
                        tokens.push(new Token(char, position, TokenType.openParenthesis));
                        break;
                    case ')':
                        tokens.push(new Token(char, position, TokenType.closeParenthesis));
                        break;
                    case '[':
                        tokens.push(new Token(char, position, TokenType.openBracket));
                        break;
                    case ']':
                        tokens.push(new Token(char, position, TokenType.closeBracket));
                        break;
                    case '{':
                        tokens.push(new Token(char, position, TokenType.openBrace));
                        break;
                    case '}':
                        tokens.push(new Token(char, position, TokenType.closeBrace));
                        break;
                    case ',':
                        tokens.push(new Token(char, position, TokenType.comma));
                        break;
                    case ';':
                        tokens.push(new Token(char, position, TokenType.semicolon));
                        break;
                    case '.':
                        tokens.push(new Token(char, position, TokenType.dot));
                        break;
                    case '=':
                        tokens.push(new Token(char, position, TokenType.operator));
                        break;
                    case '+':
                        if (line.charAt(position.character + 1) === '+' && line.charAt(position.character + 2) === '=') {
                            tokens.push(new Token("++=", position, TokenType.operator));
                            position = position.translate(0, 2);
                        }
                        else if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("+=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '-':
                        if (line.charAt(position.character + 1) === '-' && line.charAt(position.character + 2) === '=') {
                            tokens.push(new Token("--=", position, TokenType.operator));
                            position = position.translate(0, 2);
                        }
                        else if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("-=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '*':
                        if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("*=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '/':
                        if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("/=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '%':
                        if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("%=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '&':
                        if (line.charAt(position.character + 1) === '&') {
                            tokens.push(new Token("&&", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("&=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '|':
                        if (line.charAt(position.character + 1) === '|') {
                            tokens.push(new Token("||", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("|=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '^':
                        if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("^=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '!':
                        if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("!=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            throw new Error("Unexpected character " + char + " at " + position.line + ":" + position.character);
                        }
                        break;
                    case '<':
                        if (line.charAt(position.character + 1) === '<') {
                            if (line.charAt(position.character + 2) === '=') {
                                tokens.push(new Token("<<=", position, TokenType.operator));
                                position = position.translate(0, 2);
                            }
                            else {
                                tokens.push(new Token("<<", position, TokenType.operator));
                                position = position.translate(0, 1);
                            }
                        }
                        else if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("<=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '>':
                        if (line.charAt(position.character + 1) === '>') {
                            if (line.charAt(position.character + 2) === '=') {
                                tokens.push(new Token(">>=", position, TokenType.operator));
                                position = position.translate(0, 2);
                            }
                            else if (line.charAt(position.character + 2) === '>') {
                                if (line.charAt(position.character + 3) === '=') {
                                    tokens.push(new Token(">>>=", position, TokenType.operator));
                                    position = position.translate(0, 3);
                                }
                                else {
                                    tokens.push(new Token(">>>", position, TokenType.operator));
                                    position = position.translate(0, 2);
                                }
                            }
                            else {
                                tokens.push(new Token(">>", position, TokenType.operator));
                                position = position.translate(0, 1);
                            }
                        }
                        else if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token(">=", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    case '=':
                        if (line.charAt(position.character + 1) === '=') {
                            tokens.push(new Token("==", position, TokenType.operator));
                            position = position.translate(0, 1);
                        }
                        else {
                            tokens.push(new Token(char, position, TokenType.operator));
                        }
                        break;
                    default:
                        let word = "";
                        while (position.character !== line.length && ![" ", "\t", "(", ")", "[", "]", "{", "}", ",", ";", "."].includes(line.charAt(position.character))) {
                            char = line.charAt(position.character);
                            word += char;
                            if (["(", ")", "[", "]", "{", "}", ",", ";", "."].includes(peek(document, position))) { break; }
                            position = position.translate(0, 1);
                        }
                        if (RegExp(/((0xf\d+)|(\d+))|(\d*\.\d+)|(\".*\")/).test(word)) {
                            tokens.push(new Token(word, position, TokenType.value));
                        }
                        else if (keywords.includes(word)) {
                            tokens.push(new Token(word, position, TokenType.keyword));
                        }
                        else if (operators.includes(word)) {
                            tokens.push(new Token(word, position, TokenType.operator));
                        }
                        else if (constants.includes(word)) {
                            tokens.push(new Token(word, position, TokenType.constant));
                        }
                        else {
                            tokens.push(new Token(word, position, TokenType.identifier));
                        }
                        break;
                }
            }
            position = position.translate(0, 1);
        };
        position = position.translate(1, 0).with({ character: 0 });
    };
    return tokens;
};

export function getDeclaredVariables(document: TextDocument, startPos?: Position): string[] {
    let tokens = tokenize(document, startPos === undefined ? new Position(0, 0) : startPos);
    if (tokens.length < 3) { return []; }
    let identifiers: string[] = [];
    tokens.forEach((token, index) => {
        if (token.type !== TokenType.identifier) { return; }
        if ((index < tokens.length && tokens[index + 1].value === "=" && tokens[index + 2].type === TokenType.value)
            || (index > 0 && tokens[index - 1].value === "var")) {
            identifiers.push(token.value);
        }
    });
    return identifiers;
}