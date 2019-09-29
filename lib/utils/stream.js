export function hasMore(next) {
    return next ? !Object.values(next).every(e => e === null) : true;
}
