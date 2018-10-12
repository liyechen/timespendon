'use strict';

import * as vscode from 'vscode';
import * as util from 'util';

export class TimeManager {

    private timePoint : string = 'time_point';
    private lastModify : string = 'last_modify';

    private context : vscode.ExtensionContext;

    constructor ( _context : vscode.ExtensionContext ) {
        this.context = _context;
        this.init();
    }

    init () : void {

    }

    turnEditorTo ( languageId : string ) : void {
        let timePoint = this.context.globalState.get(this.timePoint);
        let lastModify = this.context.globalState.get(this.lastModify);
        let nowTimeStamp = Date.now();
        if (timePoint && lastModify) {
            // add time to last modify language
            vscode.window.showInformationMessage(`last modify file type: ${lastModify} from ${timePoint} to ${nowTimeStamp}`);

            this.context.globalState.update(this.timePoint, nowTimeStamp);
            this.context.globalState.update(this.lastModify, languageId);

            // vscode.window.showInformationMessage(`writing ${languageId} from ${fromStamp} to ${toStamp}....`);
        } else {
            this.context.globalState.update(this.timePoint, nowTimeStamp);
            this.context.globalState.update(this.lastModify, languageId);
        }


    }

}