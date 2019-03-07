declare class Emitter {
    static on(event: string, fn: Function): Emitter;
    static once(event: string, fn: Function): Emitter;
    static addEventListener(event: string, fn: Function): Emitter;
    static off(event: string, fn: Function): Emitter;
    static removeListener(event: string): Emitter;
    static removeAllListeners(): Emitter;
    static removeEventListener(event: string, fn: Function): Emitter;
    static emit(event: string): Emitter;
    static listeners(event: string): Function[];
    static hasListeners(event: string): boolean;
}

declare class pinus extends Emitter {
    static data: Object;
    static init(params: {}, cb: Function): void;
    static disconnect(): void;
    static notify(route: string, msg: {}): void;
    static request(route: string, msg: {}, cb: Function): void;
}

