import { clientJSON } from '../axios.services'
import {
  PackageResponse,
  PaymentLinkRequest,
  PaymentLinkResponse,
} from '../types'

export const subscriptionService = {
  subscribe,
}

async function subscribe(
  req: PaymentLinkRequest,
): Promise<PaymentLinkResponse> {
  const paymentLink: PaymentLinkResponse = await clientJSON.post(
    'subscriptions/subscribe',
    JSON.stringify(req),
  )

  return Promise.resolve(paymentLink)
}
