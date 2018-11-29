
// @ts-ignore
if (!process.addAsyncListener) require('async-listener');

// @ts-ignore
process.addAsyncListener({
    create: () => threadLocals.current,
    before: (context: any, storage: any) => {
        if (storage) {
            threadLocals.current = storage;
        }
    },
    after: (context: any, storage: any) => {
        if (storage) {
            threadLocals.current = {};
        }
    }
});

export const threadLocals = {
    current: {},
    set: (key: any, val: any) => {
        // @ts-ignore
        threadLocals.current[key] = val;
    },
    // @ts-ignore
    get: (key: any) => threadLocals.current[key]
};

module.exports = threadLocals;