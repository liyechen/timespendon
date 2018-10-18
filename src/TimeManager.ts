'use strict';

import * as vscode from 'vscode';


//plaintext,Log,log,bat,clojure,coffeescript,jsonc,c,cpp,
//csharp,css,dockerfile,fsharp,git-commit,git-rebase,diff,
//ignore,go,groovy,handlebars,hlsl,html,ini,properties,java,
//javascriptreact,javascript,jsx-tags,json,less,lua,makefile,
//markdown,objective-c,objective-cpp,perl,perl6,php,powershell,
//jade,python,r,razor,ruby,rust,scss,shaderlab,shellscript,sql,
//swift,typescript,typescriptreact,vb,xml,xsl,yaml

export class TimeManager {

    private timePoint : string = 'time_point';
    private lastModify : string = 'last_modify';
    private isInited : boolean = false;
    private languages : string[] = [];

    private context : vscode.ExtensionContext;

    constructor ( _context : vscode.ExtensionContext ) {
        this.context = _context;
        this.init();
    }

    init () : void {
        vscode.languages.getLanguages().then(data => this.languages = data);
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

            // vscode.window.showInformationMessage(`You have spend ${lastTotal} milliseconds on ${lastModify}`);
            this.context.globalState.update(`${lastModify}`, lastTotal);





            this.context.globalState.update(this.timePoint, nowTimeStamp);
            this.context.globalState.update(this.lastModify, languageId);
        } else {
            this.isInited = true;
            this.context.globalState.update(this.timePoint, nowTimeStamp);
            this.context.globalState.update(this.lastModify, languageId);
        }
    }

    showStatics () : void {
        let showStr = 'Time you spend on: | ';
        for (let language of this.languages) {
            if (this.context.globalState.get(language) && this.notInList(language)) {
                let milliSec = parseInt(`${this.context.globalState.get(language)}`);
                showStr += `${language}: ${this.formatTime(milliSec)} | `
            }
        }
        showStr.substring(0, showStr.length - 2);
        vscode.window.showInformationMessage(showStr);
    }

    notInList ( language : string ) : boolean {
        let lanSetArray = ["Log", "plaintext", "ignore"];
        let lanSet = new Set(lanSetArray);
        return !lanSet.has(language);
    }

    formatTime (milliSec : number) : string {
        let resStr : string = '';
        let hours : number = 0;
        let minutes : number = 0;
        let secs = Math.round(milliSec / 1000);
        if (secs >= 60) {
            let wholeMins = (secs - secs % 60) / 60;
            if (wholeMins >= 60) {
                hours = (wholeMins - wholeMins % 60) / 60;
            }
            minutes = wholeMins % 60;
            secs = secs % 60;
        }

        if (hours > 0) resStr += `${hours} hours `;
        if (minutes > 0) resStr += `${minutes} minutes `;
        resStr += `${secs} seconds`;

        return resStr;
    }

    visualizeData () : void {

    }

    clearBaseData () : void {
    }

}