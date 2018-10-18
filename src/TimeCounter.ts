'use strict';

import * as vscode from 'vscode';

import { TimeManager } from './TimeManager';

export class TimeCounter {

    private timeManager : TimeManager;
    private disposable : vscode.Disposable[];

    constructor ( _context : vscode.ExtensionContext ) {
        this.init();
        this.timeManager = new TimeManager(_context);
        this.disposable = [];
    }

    init () : void {
        vscode.window.onDidChangeActiveTextEditor(this.detectFileActive, this, this.disposable);
    }

    showStatics () : void {
        this.timeManager.showStatics();
    }

    exportStatics () : void {
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
        //dispose
        for (let theDisposable of this.disposable) {
            vscode.Disposable.from(theDisposable).dispose();
        }
        this.timeManager.clearBaseData();
    }
}