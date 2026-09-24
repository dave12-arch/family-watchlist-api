const blackList = new Set();

export function blacklistToken(token) {
    if (token) {
        blackList.add(token);
    }
};

export function isBlacklisted(token) {
    return blackList.has(token);
}