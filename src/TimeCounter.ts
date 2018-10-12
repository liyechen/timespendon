'use strict';

import * as vscode from 'vscode';

export class TimeCounter {
    constructor () {
        this.init();
    }

    init () : void {
        vscode.window.showInformationMessage('TimeCounter init.');
    }

    start () : void {
        vscode.window.showInformationMessage('start to count .');


    }

    showStatistics () : void {

        vscode.window.showInformationMessage('show... .');

    }

    dispose () : void {

    }
}