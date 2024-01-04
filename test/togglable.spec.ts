import { Togglable } from '../src';

class TestClass extends Togglable {
    constructor(isTogglable: boolean, isEnabledByDefault: boolean) {
        super(isTogglable, isEnabledByDefault);
    }

    public foo(message?: string): void {
        this.tg_ThrowIfDisabled(message);

        console.log('Enabled');
    }
}

describe('Togglable', () => {
    describe('tg_GetState', () => {
        it('should be enabled when tg_IsEnabledByDefault is set to true', () => {
            const togglable = new TestClass(false, true);

            expect(togglable.tg_GetState()).toBeTrue();
        });

        it('should be disabled when tg_IsEnabledByDefault is set to false', () => {
            const togglable = new TestClass(false, false);

            expect(togglable.tg_GetState()).toBeFalse();
        });
    });

    describe('tg_ToggleState', () => {
        it('should toggle when tg_IsTogglable is set to true', () => {
            const togglable = new TestClass(true, true);

            togglable.tg_ToggleState();

            expect(togglable.tg_GetState()).toBeFalse();
        });

        it('should not toggle when tg_IsTogglable is set to false', () => {
            const togglable = new TestClass(false, true);

            togglable.tg_ToggleState();

            expect(togglable.tg_GetState()).toBeTrue();
        });
    });

    describe('tg_ThrowIfDisabled', () => {
        it('should not throw when calling tg_ThrowIfDisabled with tg_IsEnabled set to true', () => {
            const togglable = new TestClass(true, true);

            spyOn(console, 'log').and.callThrough();

            try {
                togglable.foo();
            } catch {
                /* empty */
            }

            expect(console.log).toHaveBeenCalledWith('Enabled');
        });

        it('should throw when calling tg_ThrowIfDisabled with tg_IsEnabled set to false', () => {
            const togglable = new TestClass(true, false);

            spyOn(togglable, 'tg_ThrowIfDisabled').and.callThrough();
            spyOn(console, 'log').and.callThrough();

            try {
                togglable.foo();
            } catch {
                /* empty */
            }

            expect(togglable.tg_ThrowIfDisabled).toThrow();
            expect(console.log).not.toHaveBeenCalled();
        });

        it('should throw custom message', () => {
            const togglable = new TestClass(true, false);
            const message = 'Test throw message';

            spyOn(togglable, 'tg_ThrowIfDisabled').and.callThrough();
            spyOn(console, 'log').and.callThrough();

            try {
                togglable.foo(message);
            } catch {
                /* empty */
            }

            expect(togglable.tg_ThrowIfDisabled).toHaveBeenCalledWith(message);
            expect(togglable.tg_ThrowIfDisabled).toThrow();
            expect(console.log).not.toHaveBeenCalled();
        });
    });
});
