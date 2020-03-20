export const DealTiers = {
    TIER_0: {
        id: "TIER_0",
        requires: 0
    },
    TIER_1: {
        id: "TIER_1",
        requires: 7
    },
    TIER_2: {
        id: "TIER_2",
        requires: 14
    },
    TIER_3: {
        id: "TIER_3",
        requires: 21
    },
    TIER_4: {
        id: "TIER_4",
        requires: 100
    },
    ALL_UNLOCKED: {
        id: "ALL_UNLOCKED",
        requires: null
    }
};

export function getNextTier(user) {
    if (user.gold) return DealTiers.ALL_UNLOCKED;
    if (user.streak < 7) {
        return DealTiers.TIER_1;
    } else if (user.streak >= 7 && user.streak < 14) {
        return DealTiers.TIER_2;
    } else if (user.streak >= 14 && user.streak < 21) {
        return DealTiers.TIER_3;
    } else if (user.streak >= 21 && user.streak < 100) {
        return DealTiers.TIER_4;
    } else {
        return DealTiers.ALL_UNLOCKED;
    }
}

export function getNextTierProgress(user) {
    return (user.streak / getNextTier(user).requires) * 100;
}

export function canRedeem(deal, user) {
    if (!deal) return false;
    if (user.gold) return true;
    switch (deal.tier) {
        case DealTiers.TIER_0.id:
            return true;

        case DealTiers.TIER_1.id:
            return user.streak >= 7;

        case DealTiers.TIER_2.id:
            return user.streak >= 14;

        case DealTiers.TIER_3.id:
            return user.streak >= 21;

        case DealTiers.TIER_4.id:
            return user.streak >= 100;

        default:
            return false;
    }
}
