import * as vscode from 'vscode';
import { CompletionItem } from 'vscode';
import { syntax } from './syntax';

class NekoCompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext):
		CompletionItem[] {
		const line = document.lineAt(position.line).text;
		const lineTillCurrentPosition = line.substring(0, position.character + 1);
		let ret: CompletionItem[] = [];
		syntax.forEach(list => list.items.forEach(element => {
			if (element.label.startsWith(lineTillCurrentPosition)) {
				let item = new CompletionItem(element.label, list.kind);
				item.documentation = element.documentation;
				item.insertText = element.insertText.replace(lineTillCurrentPosition, "");
				ret.push(item);
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
