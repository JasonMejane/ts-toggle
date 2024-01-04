import { Togglable, Toggler } from '../src';

describe('Toggler', () => {
    let toggler: Toggler;

    beforeEach(() => {
        toggler = new Toggler();
    });

    it('should hold the ref', () => {
        const key = 'A';
        const enabledTogglable = new Togglable(true, true);

        toggler.addTogglableRef(key, enabledTogglable);

        expect(toggler.getTogglableState(key)).toBeTrue();
    });

    it('should remove the ref', () => {
        const key = 'A';
        const enabledTogglable = new Togglable(true, true);

        toggler.addTogglableRef(key, enabledTogglable);
        toggler.removeTogglableRef(key);

        expect(toggler.getTogglableState(key)).toBeFalsy();
    });

    it('should toggle the state', () => {
        const key = 'A';
        const enabledTogglable = new Togglable(true, true);

        toggler.addTogglableRef(key, enabledTogglable);
        toggler.toggleTogglableState(key);

        expect(toggler.getTogglableState(key)).toBeFalse();
    });

    it('should return all states', () => {
        const keyA = 'A';
        const keyB = 'B';
        const enabledTogglable = new Togglable(true, true);
        const disabledTogglable = new Togglable(true, false);

        toggler.addTogglableRef(keyA, disabledTogglable);
        toggler.addTogglableRef(keyB, enabledTogglable);

        const states = toggler.getAllTogglableStates();

        expect(states[keyA]).toBeFalse();
        expect(states[keyB]).toBeTrue();
    });
});
