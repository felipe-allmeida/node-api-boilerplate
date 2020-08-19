export class AppSettings {
    private data : { [key: string]: any } = {};

    setData(key: string, value: any): this {
        this.data[key] = value;
        return this;
    }

    getData(key: string): any {
        return this.data[key];
    }
}
