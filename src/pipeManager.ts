import * as net from "net";
import streamDeck from "@elgato/streamdeck";

const logScope = streamDeck.logger.createScope("pipeManager");


export default new class PipeManager {
    constructor() {
        logScope.info("Initializing");
    }

    private connections = new Map<string,net.Socket>();

    async send(channel: string,payload: string) {
        let socket = this.connections.get(channel);
        if (!socket) {
            socket = await this.connect(channel);
            this.connections.set(channel, socket);
        }
        socket.write(payload+"\n");
    }
    private connect(channel: string) {
        return new Promise<net.Socket>((resolve, reject) => {
            const path = `\\\\.\\pipe\\${channel}`;
            const socket = net.connect(path);
            socket.once("connect", () => {
               resolve(socket);
            });
            socket.once("close",()=>{
                if (this.connections.get(channel) === socket) {
                    this.connections.delete(channel);
                }
            });
            socket.on("error",reject);
        });
    }
}