import { FREE_PLAN_NAME } from "./constants"

export const isFreeUser = (user) => user.plan === FREE_PLAN_NAME ? true : false