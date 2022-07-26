import { clientJSON } from '../axios.services'
import { PremiumPackageResponse } from '../types'

export const packageService = {
  getPremiumPackages,
}

async function getPremiumPackages() {
  const premiumPackages: PremiumPackageResponse[] = await clientJSON.get(
    '/subscriptions/packages/premiums',
  )

  return premiumPackages
}
