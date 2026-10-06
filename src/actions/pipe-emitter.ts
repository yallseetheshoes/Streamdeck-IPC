import streamDeck, { action, KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import PipeManager from "../pipeManager"
import EventEmitter from "events";

@action({ UUID: "com.yallseetheshoes.streamdeck-ipc.pipe-emitter" })
export class PipeEmitter extends SingletonAction<pipeSettings> {
    public events = new EventEmitter();
    override async onKeyDown(ev: KeyDownEvent<pipeSettings>): Promise<void> {
        const { channel, payload } = ev.payload.settings;
        if (!channel) {
            await ev.action.showAlert();
            return;
        }
        await PipeManager.send(channel,payload ?? "").catch(async (e) => {
            await ev.action.showAlert();
            await streamDeck.ui.sendToPropertyInspector({
                event: "pipeError",
                msg: e instanceof Error ? e.message : String(e)
            });
            throw e;
        }).then(async ()=>{
            await ev.action.showOk();
        });
        this.events.emit("pressed");
    }
}

type pipeSettings = {
    channel?: string;
    payload?: string;
};