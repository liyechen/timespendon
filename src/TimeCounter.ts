'use strict';

import * as vscode from 'vscode';

export class TimeCounter {
    constructor () {

    }

    sayBad () {
        vscode.window.showInformationMessage('??????!');
    }
}