import { CoinEnum, CurrencyEnum } from "./crypto.helper"

export type EmailQueueDataType = {
    ticker: CoinEnum,
    vsCurrency: CurrencyEnum,
    price: number,
    timestamp: Date,
    historyId: string,
    email: string
}