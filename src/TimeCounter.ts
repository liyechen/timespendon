'use strict';

import * as vscode from 'vscode';
import * as fs from 'fs';

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
        console.log('TimeCounter init.');
        vscode.window.onDidChangeActiveTextEditor(this.detectFileActive, this, this.disposable);
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
        console.log('dispose timecounter.');
    }
}