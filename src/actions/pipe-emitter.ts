import streamDeck, { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import EventEmitter from "events";
import * as net from "net";
@action({ UUID: "com.yallseetheshoes.streamdeck-ipc.pipe-emitter" })
export class PipeEmitter extends SingletonAction<pipeSettings> {
    public events = new EventEmitter();
    override async onKeyDown(ev: KeyDownEvent<pipeSettings>): Promise<void> {
        const { channel, payload } = ev.payload.settings;
        if (!channel) {
            await ev.action.showAlert();
            return;
        }
        const pipePath = `\\\\.\\pipe\\${channel}`;
        const client = net.connect(pipePath, () => {
            client.write((payload || '')+'\n',async () => {
                await ev.action.showOk();
            });
            client.end();
        });
        client.on("error",async (err)=>{
            await ev.action.showAlert();
            streamDeck.logger.error(err);
        });
        this.events.emit("pressed");
    }
}

type pipeSettings = {
    channel?: string;
    payload?: string;
};