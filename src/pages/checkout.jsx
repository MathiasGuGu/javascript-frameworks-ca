import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store";

const Checkout = () => {
  const removeAllItems = useStore((state) => state.removeAllItems);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
      removeAllItems();
    }, 300);

    return () => clearTimeout(timeout);
  }, [removeAllItems]);

  return (
    <>
      <div className="w-screen h-auto mt-64 flex flex-col items-center justify-center gap-2">
        {isLoading ? (
          <Loader2 size={64} className="animate-spin" />
        ) : (
          <>
            <Check stroke="green" size={80} />
            <p className="text-lg">Thank you for your purchase</p>
            <Link to={"/"} className="text-blue-500">
              Back to store
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Checkout;
