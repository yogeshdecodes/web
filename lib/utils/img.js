import config from "../../config";

export function imageUrl(src, sz = 100) {
    return `https://img.gs/${config.IMGOPT_KEY}/${sz}x${sz},crop/${src}`;
}
