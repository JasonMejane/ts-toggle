// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Toggle(enable: boolean | (() => boolean), fallback?: any) {
    return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
        if (typeof descriptor.value !== 'function') {
            return descriptor;
        }

        const isEnabled = typeof enable === 'boolean' ? enable : enable();

        if (isEnabled) {
            return descriptor;
        }

        if (fallback) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            descriptor.value = function (...args: any[]) {
                return fallback(...args);
            };
        } else {
            descriptor.value = () => {};
        }

        return descriptor;
    };
}

export class Togglable {
    protected tg_IsEnabled: boolean;

    constructor(
        protected tg_IsTogglable: boolean,
        protected tg_IsEnabledByDefault: boolean,
    ) {
        this.tg_IsEnabled = tg_IsEnabledByDefault;
    }

    public tg_ToggleState(): void {
        if (this.tg_IsTogglable) {
            this.tg_IsEnabled = !this.tg_IsEnabled;
        }
    }

    public tg_GetState(): boolean {
        return this.tg_IsEnabled;
    }

    public tg_ThrowIfDisabled(message?: string): void {
        if (!this.tg_IsEnabled) {
            throw new Error(message ?? 'Class disabled');
        }
    }
}

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
