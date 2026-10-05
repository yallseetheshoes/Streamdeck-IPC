import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import EventEmitter from "events";
@action({ UUID: "com.yallseetheshoes.streamdeck-ipc.ws-emitter" })
export class WsEmitter extends SingletonAction<wsSettings> {
    public events = new EventEmitter();
    override async onKeyDown(ev: KeyDownEvent<wsSettings>): Promise<void> {
        this.events.emit("pressed");
        await ev.action.showOk();
    }
}

type wsSettings = {
    channel?: string;
    payload?: string;
};

//TBD