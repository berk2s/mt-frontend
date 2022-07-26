import { clientJSON } from '../axios.services'
import { PaymentLinkRequest, PaymentLinkResponse } from '../types'

export const subscriptionService = {
  subscribe,
}

async function subscribe(
  req: PaymentLinkRequest,
): Promise<PaymentLinkResponse> {
  console.log(req)
  const paymentLink: PaymentLinkResponse = await clientJSON.post(
    'subscriptions/subscribe',
    JSON.stringify(req),
  )

  return Promise.resolve(paymentLink)
}
