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


        // _context.globalState.update('time_point', undefined);
        // _context.globalState.update('last_modify', undefined);
        // _context.globalState.update('javascript', undefined);
        // _context.globalState.update('json', undefined);
    }

    init () : void {
        vscode.window.showInformationMessage('TimeCounter init.');

        // let disp : vscode.Disposable[] = [];
        vscode.window.onDidChangeActiveTextEditor(this.detectFileActive, this, this.disposable);
        // vscode.workspace.onDidCloseTextDocument(this.detectWorkspaceClosed, this, this.disposable);
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

    detectWorkspaceClosed () : void {
        console.log('close workspace...');
    }

    dispose () : void {
        //dispose
        for (let theDisposable of this.disposable) {
            console.log('disposing....');
            vscode.Disposable.from(theDisposable).dispose();
            // theDisposable.dispose();
        }
        this.timeManager.clearBaseData();
        console.log('dispose timecounter.');
    }
}