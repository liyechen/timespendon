'use strict';

import * as vscode from 'vscode';

export class TimeCounter {

    private context : vscode.ExtensionContext;

    constructor (_context: vscode.ExtensionContext) {
        this.init();
        this.context = _context;
        this.context.globalState.update("test", "23333");
    }

    init () : void {
        vscode.window.showInformationMessage('TimeCounter init.');

        let disposable : vscode.Disposable[] = [];
        vscode.window.onDidChangeActiveTextEditor(this.detectFileActive, this, disposable);
    }

    start () : void {
        let testStr = this.context.globalState.get("test");
        vscode.window.showInformationMessage(`start to count .${testStr}`);

    }

    showStatistics () : void {
        vscode.window.showInformationMessage('show... .');
    }

    detectFileActive () : void {
        let actEditor = vscode.window.activeTextEditor;
        if (actEditor) {
            let languageId = actEditor.document.languageId;
            vscode.window.showInformationMessage(`now open:  ${languageId}`);
        }
    }

    dispose () : void {

    }
}