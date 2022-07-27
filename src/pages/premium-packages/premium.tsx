import React, { useState } from "react";
import Stack from "react-bootstrap/esm/Stack";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import { PremiumPackageResponse } from "../../services/types";
import "./premium.scss";
import Loader from "react-spinners/BounceLoader";
import { packageService } from "../../services/package/package.service";
import { subscriptionService } from "../../services/subscription/subscription.service";

const PremiumPackages = () => {
  const [isLoading, setLoading] = useState(true);
  const [packages, setPackages] = useState<PremiumPackageResponse[]>([]);

  useRestCallEffect(async () => {
    const packages = await packageService.getPremiumPackages();

    setPackages(packages);
    setLoading(false);
  }, []);

  const handleCheckoutClick = (foreginRef: string) => async () => {
    const paymentLink = await subscriptionService.subscribe({
      foreginRef: foreginRef,
    });

    window.location.replace(paymentLink.sessionUrl);
  };

  return (
    <Stack className="col-lg-8 mx-auto pt-5">
      <Stack className="mb-5">
        <h4 className="form-title text-center">Premium Packages</h4>
      </Stack>
      <Stack className="col-md-5 mx-auto page-wrapper package-list">
        {isLoading && (
          <div className="loader">
            <Loader color={"#ef5b0c"} loading={true} size={50} />
          </div>
        )}

        {!isLoading &&
          packages.map((_package, index) => {
            return (
              <section key={index}>
                <div className="product">
                  <div className="description">
                    <h3>{_package.packageName}</h3>

                    <h5>{_package.packageDescription}</h5>
                    <h5>{_package.likeLimit} like limit</h5>
                    <h5>
                      {_package.canSeePersonalTrainers ? "Can" : "Can't"} see
                      personal trainers
                    </h5>
                    <h5>
                      €{_package.price} / {_package.period}
                    </h5>
                  </div>
                </div>
                <button
                  id="checkout-and-portal-button"
                  type="submit"
                  onClick={handleCheckoutClick(_package.foreginRef)}
                >
                  Checkout
                </button>
              </section>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default PremiumPackages;
