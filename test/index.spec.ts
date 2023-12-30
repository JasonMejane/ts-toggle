import { Toggle } from '../src';

function isDisabled() {
    return false;
}

function isEnabled() {
    return true;
}

export class TestClass {
    constructor() {}

    @Toggle(false)
    async disabledAsync(): Promise<void> {
        console.log('disabledAsync');
    }

    @Toggle(false)
    disabledSync(): void {
        console.log('disabledSync');
    }

    @Toggle(true)
    async enabledAsync(): Promise<void> {
        console.log('enabledAsync');
    }

    @Toggle(true)
    enabledSync(): void {
        console.log('enabledSync');
    }

    @Toggle(isEnabled)
    callbackToggleEnabled(): void {
        console.log('callbackToggleEnabled');
    }

    @Toggle(isDisabled)
    callbackToggleDisabled(): void {
        console.log('callbackToggleDisabled');
    }

    @Toggle(false, (value: number) => {
        console.log(value);
    })
    async disabledWithFallback(value: number): Promise<void> {
        console.log('disabledWithFallback ' + value);
    }
}

describe('TestClass', async () => {
    let test: TestClass;

    beforeEach(async () => {
        jasmine.clock().install();
        test = new TestClass();
    });

    afterEach(async () => {
        jasmine.clock().uninstall();
    });

    it('should not run async when disabled', async () => {
        spyOn(console, 'log').and.callThrough();

        await test.disabledAsync();
        jasmine.clock().tick(0);

        expect(console.log).not.toHaveBeenCalled();
    });

    it('should not run sync when disabled', () => {
        spyOn(console, 'log').and.callThrough();

        test.disabledSync();

        expect(console.log).not.toHaveBeenCalled();
    });

    it('should run async when enabled', async () => {
        spyOn(console, 'log').and.callThrough();

        await test.enabledAsync();
        jasmine.clock().tick(0);

        expect(console.log).toHaveBeenCalledWith('enabledAsync');
    });

    it('should run sync when enabled', () => {
        spyOn(console, 'log').and.callThrough();

        test.enabledSync();

        expect(console.log).toHaveBeenCalledWith('enabledSync');
    });

    it('should run when toggle callback is true', () => {
        spyOn(console, 'log').and.callThrough();

        test.callbackToggleEnabled();

        expect(console.log).toHaveBeenCalledWith('callbackToggleEnabled');
    });

    it('should not run when toggle callback is false', () => {
        spyOn(console, 'log').and.callThrough();

        test.callbackToggleDisabled();

        expect(console.log).not.toHaveBeenCalled();
    });

    it('should run fallback when disabled', async () => {
        const value = 5;

        spyOn(console, 'log').and.callThrough();

        await test.disabledWithFallback(value);

        expect(console.log).toHaveBeenCalledWith(value);
    });
});
