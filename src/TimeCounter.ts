'use strict';

import * as vscode from 'vscode';

export class TimeCounter {

    private disposable : any;
    constructor () {
        this.init();
        this.disposable = [];
    }

    init () : void {
        vscode.window.showInformationMessage('TimeCounter init.');

        vscode.window.onDidChangeActiveTextEditor(this.detectFileActive, this, this.disposable);
    }

    start () : void {
        vscode.window.showInformationMessage('start to count .');
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