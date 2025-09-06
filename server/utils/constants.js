export const FREE_PLAN_NAME = 'FREE'
export const PAID_PLAN_NAME = 'PRO'

export const PLANS = {
    FREE_PLAN_NAME: {
        name: FREE_PLAN_NAME,
        priceId: null,
        promptLimit: 5,   // per day
        ragLimit: 2,      // per day
        imageLimit: 2,    // per day
    },
    PAID_PLAN_NAME: {
        name: PAID_PLAN_NAME,
        priceId: 10,
        promptLimit: 10,
        ragLimit: 5,
        imageLimit: 5,
    },
}