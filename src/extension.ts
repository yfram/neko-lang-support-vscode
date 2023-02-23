import * as vscode from 'vscode';
import { CompletionItem } from 'vscode';
import { functions } from './syntax/functions';

class NekoCompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext):
		CompletionItem[] {
		const line = document.lineAt(position.line).text;
		const lineTillCurrentPosition = line.substring(0, position.character + 1);
		let ret: CompletionItem[] = [];
		functions.forEach(element => {
			if (element.label.startsWith(lineTillCurrentPosition)) {
				let item = new CompletionItem(element.label, vscode.CompletionItemKind.Function);
				item.documentation = element.documentation;
				item.insertText = element.insertText.replace(lineTillCurrentPosition, "");
				ret.push(item);
			}
		});
		return ret;
	}
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider("plaintext", new NekoCompletionItemProvider(), "$"));
}

// This method is called when your extension is deactivated
export function deactivate() {
}
