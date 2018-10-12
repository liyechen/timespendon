'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TimeCounter } from './TimeCounter';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let timeCounter = new TimeCounter();

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "timespendon" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let startTimeCounter = vscode.commands.registerCommand('extension.start', () => {
        timeCounter.start();
    });

    context.subscriptions.push(startTimeCounter);


    let showStatistics = vscode.commands.registerCommand('extension.showStatistics', () => {
        timeCounter.showStatistics();
    });

    context.subscriptions.push(showStatistics);
}

// this method is called when your extension is deactivated
export function deactivate() {
}