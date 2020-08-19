export class Settings {
    private data: Map<string, any>;

    constructor() {
        this.data = new Map<string, any>();
    }

    setData(key: string, value: any) {
        this.data.set(key, value);
        return this;
    }

    public getData(key: string) {
        return this.data.get(key);
    }
}
