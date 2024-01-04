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
