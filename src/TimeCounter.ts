'use strict';

import * as vscode from 'vscode';
import { TimeManager } from './TimeManager';

export class TimeCounter {

    private timeManager : TimeManager;

    constructor ( _context : vscode.ExtensionContext ) {
        this.init();
        this.timeManager = new TimeManager(_context);
    }

    init () : void {
        vscode.window.showInformationMessage('TimeCounter init.');

        let disposable : vscode.Disposable[] = [];
        vscode.window.onDidChangeActiveTextEditor(this.detectFileActive, this, disposable);
    }

    start () : void {
        vscode.window.showInformationMessage(`start to count. `);

    }

    showStatistics () : void {
        vscode.window.showInformationMessage('show... .');
    }

    detectFileActive () : void {
        let actEditor = vscode.window.activeTextEditor;
        if (actEditor) {
            let languageId = actEditor.document.languageId;
            this.timeManager.turnEditorTo(languageId);
        }
    }

    dispose () : void {

    }
}