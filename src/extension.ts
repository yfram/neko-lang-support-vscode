import * as vscode from 'vscode';
import { CompletionItem } from 'vscode';
import { syntax } from './syntax';
import { getDeclaredVariables } from './tokenizer';

class NekoCompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext):
		CompletionItem[] {
		const line = document.lineAt(position.line).text;
		const lineTillCurrentPosition = line.substring(0, position.character);
		let ret: CompletionItem[] = [];
		let declaredVariables = getDeclaredVariables(document);
		syntax.push({
			kind: vscode.CompletionItemKind.Variable,
			items: declaredVariables.map(element => {
				return {
					label: element,
					documentation: "Variable"
				}
			})
		});
		syntax.forEach(list => list.items.forEach(element => {
			if (element.label.startsWith(lineTillCurrentPosition)) {
				let item = new CompletionItem(element.label, list.kind);
				item.documentation = element.documentation;
				if (element.insertText) {
					item.insertText = element.insertText;
				}
				ret.push(item );
			}
		}));
		return ret;
	}
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider("plaintext", new NekoCompletionItemProvider(), "$"));
}

export function deactivate() {
}
