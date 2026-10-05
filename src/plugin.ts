import streamDeck from "@elgato/streamdeck";
import { PipeEmitter } from "./actions/pipe-emitter"
import { WsEmitter } from "./actions/ws-emitter";

const pipeAction = new PipeEmitter();
const wsAction = new WsEmitter();

streamDeck.actions.registerAction(pipeAction);
//streamDeck.actions.registerAction(wsAction);


streamDeck.connect();
