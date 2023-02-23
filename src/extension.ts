import * as vscode from 'vscode';
import { CompletionItem } from 'vscode';
import { inflate } from 'zlib';

class NekoCompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext):
		Thenable<vscode.CompletionItem[]> {
		if (context.triggerCharacter === "$") {
			return Promise.resolve([
				{ label: "$int", insertText: "int", kind: vscode.CompletionItemKind.Function },
				{ label: "$string", insertText: "string", kind: vscode.CompletionItemKind.Function },
				{ label: "$float", insertText: "float", kind: vscode.CompletionItemKind.Function },
				{ label: "$print", insertText: "print", kind: vscode.CompletionItemKind.Function },
			]);
		}
		return Promise.resolve([]);
	}
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider("plaintext", new NekoCompletionItemProvider(), "$"));
}

// This method is called when your extension is deactivated
export function deactivate() {
}
