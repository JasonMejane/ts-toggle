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
