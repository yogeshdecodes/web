import App from "next/app";
import { create } from "mobx-persist";
import { isServer } from "~/config";
import storeConfig from "../stores";
import { withMobx } from "next-mobx-wrapper";

export function configureMobx(config, app) {
    const getStores = config.stores;

    return withMobx(getStores)(app);
}

class MobxApp extends App {}

// No arguments (arguments are where to store like localForage.)
export const hydrate = create();

export function rehydrate(
    config = storeConfig,
    onHydrate = () => {
        console.log("Artemis: All stores hydrated.");
    }
) {
    if (!isServer && config.stores) {
        const promises = Object.keys(config.stores).map(k => {
            if (config.persist.includes(k)) {
                console.log("Artemis: Rehydrating", k, config.stores[k]());
                return hydrate(k, config.stores[k]());
            }
        });
        if (promises.length > 0) {
            Promise.all(promises).then(onHydrate);
        }
    }
}

export default MobxApp;
