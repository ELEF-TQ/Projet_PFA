import { useEffect } from "react";
import Coupon from "../../components/others/Coupon";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUserSession } from "../../lib/Encryption";
import { AppDispatch } from "../../context/store";
import { fetchReservedCoupons } from "../../context/features/CouponSlice";
import Spinner from "../../components/status/Spinner";

const Coupons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = retrieveUserSession();
  const { reservedCoupons ,isLoading } = useSelector((state: any) => state.coupons);

  useEffect(() => {
    if (user) {
      dispatch(fetchReservedCoupons(user._id));
    }
  }, []);

  return (
    <>
    <h1 className="text-4xl font-bold mb-8">Mes Coupons</h1>
    <div className="flex flex-wrap justify-center gap-5">
    {isLoading ? (
        <Spinner />
    ) : (
        reservedCoupons.length > 0 ? (
            reservedCoupons.filter((coupon: any) => {
              const expirationDate = new Date(coupon.dateExpiration);
              const currentDate = new Date();
              if (expirationDate > currentDate) {
                return true;
              } else {
                return false;
              }
            })
            .map((coupon: any, index: number) => (
                <Coupon key={index} coupon={coupon} reserved={true} reservedHome={false} />
            ))
        ) : (
            <p>Aucun coupon réservé pour le moment.</p>
        )
    )}
    </div>
    </>
  );
};

export default Coupons;
