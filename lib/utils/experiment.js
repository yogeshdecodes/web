export class Experiment {
    constructor(name) {
        // get if exists
        this.identifier = `experiment.${name}`;
    }

    getStore = () => {
        return localStorage.getItem(this.identifier);
    };

    isEnabled = () => {
        const store = this.getStore();
        if (store === null) return false;
        // assume its a bool
        if (store !== null) return JSON.parse(store);
    };

    setStatus = bool => {
        localStorage.setItem(this.identifier, bool);
    };
}
