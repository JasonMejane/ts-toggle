export class Toggler {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private refs: Partial<Record<string, any>> = {};

    constructor() {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public addTogglableRef(key: string, ref: any): void {
        this.refs[key] = ref;
    }

    public getAllTogglableStates(): Record<string, boolean> {
        const states: Record<string, boolean> = {};
        const keys = Object.keys(this.refs);

        for (let i = 0; i < keys.length; i++) {
            states[keys[i]] = this.getTogglableState(keys[i]);
        }

        return states;
    }

    public getTogglableState(key: string): boolean {
        return !!this.refs[key]?.tg_GetState();
    }

    public removeTogglableRef(key: string): void {
        delete this.refs[key];
    }

    public toggleTogglableState(key: string): boolean {
        this.refs[key]?.tg_ToggleState();

        return this.getTogglableState(key);
    }
}
