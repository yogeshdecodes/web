import config, { isServer } from "../../config";

export function imageUrl(src, sz = null, optimOnly = false) {
    if (!config.IMGOPT_ENABLED) return src;
    if (src.startsWith("data:")) return src;
    if (src.includes(".gif")) return src;
    if (optimOnly) return `${src}?auto=compress`;

    let optims = {
        auto: "compress"
    };

    if (sz) {
        if (typeof sz === "object") {
            optims.w = sz.w;
            optims.h = sz.h;
        } else {
            optims.w = sz;
            optims.h = sz;
            optims.fit = "crop";
            optims.crop = "focalpoint";
        }
    }

    const params = new URLSearchParams(optims);

    if (src.includes("gravatar")) {
        return `${src}&${params.toString()}`;
    }

    return `${src}?${params.toString()}`;
}
