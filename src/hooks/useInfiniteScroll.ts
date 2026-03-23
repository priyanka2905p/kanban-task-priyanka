import { useEffect, useState } from "react";

export const useInfiniteScroll = (data: any[], chunk = 5) => {
  const [visible, setVisible] = useState(chunk);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        setVisible((prev) => prev + chunk);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return data.slice(0, visible);
};