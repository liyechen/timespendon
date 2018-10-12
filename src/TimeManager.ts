'use strict';

import * as vscode from 'vscode';

export class TimeManager {

    private timePoint : string = 'time_point';
    private lastModify : string = 'last_modify';
    private isInited : boolean;

    private context : vscode.ExtensionContext;

    constructor ( _context : vscode.ExtensionContext ) {
        this.context = _context;
        this.isInited = false;
        this.init();
    }

    init () : void {
        console.log(this.isInited);
    }

    turnEditorTo ( languageId : string ) : void {
        let timePoint = this.context.globalState.get(this.timePoint);
        let lastModify = this.context.globalState.get(this.lastModify);
        let nowTimeStamp = Date.now();
        if (this.isInited) {
            // add time to last modify language

            let lastTotal = this.context.globalState.get(`${lastModify}`);
            if (lastTotal) {
                lastTotal = Number.parseInt(`${lastTotal}`) + nowTimeStamp - Number.parseInt(`${timePoint}`);
            } else {
                lastTotal = nowTimeStamp - Number.parseInt(`${timePoint}`);
            }

            vscode.window.showInformationMessage(`You have spend ${lastTotal} milliseconds on ${lastModify}`);
            this.context.globalState.update(`${lastModify}`, lastTotal);


            this.context.globalState.update(this.timePoint, nowTimeStamp);
            this.context.globalState.update(this.lastModify, languageId);
        } else {
            console.log('init time and language');
            this.isInited = true;
            this.context.globalState.update(this.timePoint, nowTimeStamp);
            this.context.globalState.update(this.lastModify, languageId);
        }


    }

    clearBaseData () : void {
        console.log('dispose timemanager..');
        this.context.globalState.update(this.timePoint, undefined);
        this.context.globalState.update(this.lastModify, undefined);
    }

}