import { useContext, useEffect } from "react";
import { PodcasterContext } from "../../layouts/AppLayout";

export default function Loader({ type }: { type: "podcast" | "episode" }) {
  const { setLoading } = useContext(PodcasterContext);
  useEffect(() => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    return () => {
      setLoading((prev) => ({ ...prev, [type]: false }));
    };
  }, [setLoading, type]);

  return <></>;
}
