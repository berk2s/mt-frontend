import React, { useContext, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Loader from "react-spinners/BounceLoader";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import { personalTrainerService } from "../../services/personal-trainer/personal-trainer.service";
import { PTPackageResponse } from "../../services/types";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const MyPackages = () => {
  const { setToastSettings } = useContext(AppContext);
  const [packages, setPackages] = useState<PTPackageResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useRestCallEffect(async () => {
    const packages = await personalTrainerService.getMyPackages();

    setPackages(packages);
    setIsLoading(false);
  }, []);

  const removePackage = (id: string) => async (e: any) => {
    setIsLoading(true);
    await personalTrainerService.deletePTPackage(id);

    setToastSettings({
      text: "The package has deleted",
      show: true,
      className: "bg-success",
    });

    const packages = await personalTrainerService.getMyPackages();

    setPackages(packages);
    setIsLoading(false);
  };

  return (
    <Stack className="col-lg-8 mx-auto pt-5 page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">My Packages</h4>
      </div>

      {isLoading && (
        <div className="loader">
          <Loader color={"#ef5b0c"} loading={true} size={50} />
        </div>
      )}

      <div
        className="package-list mx-auto"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        {!isLoading && (
          <>
            <button
              id="checkout-and-portal-button"
              type="submit"
              onClick={() => navigate("/create-package")}
              style={{
                borderRadius: 6,
                backgroundColor: "#1f8b24",
                color: "#c5f2c7",
                boxShadow:
                  "0px 1px 2px rgba(31, 139, 36, 0.2), 0px 2px 4px rgba(31, 139, 36, 0.2)",
              }}
              // onClick={handleCheckoutClick(_package.foreginRef)}
            >
              Create a Package
            </button>
            {packages.map((_package, index) => {
              return (
                <section key={index} style={{ marginBottom: 36 }}>
                  <div className="product">
                    <div className="description">
                      <h3>{_package.packageName}</h3>

                      <h5>{_package.packageDescription}</h5>

                      <h5>{_package.workoutType.join(",")} workout types</h5>

                      <h5>
                        €{_package.price} / {_package.period}
                      </h5>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      id="checkout-and-portal-button"
                      type="submit"
                      style={{
                        borderBottomRightRadius: 0,
                        backgroundColor: "#D82148",
                      }}
                      onClick={removePackage(_package.id)}
                    >
                      Remove
                    </button>

                    <button
                      id="checkout-and-portal-button"
                      type="submit"
                      style={{
                        borderBottomLeftRadius: 0,
                      }}
                      onClick={() => navigate(`/edit-package/${_package.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </section>
              );
            })}
          </>
        )}
      </div>
    </Stack>
  );
};

export default MyPackages;
