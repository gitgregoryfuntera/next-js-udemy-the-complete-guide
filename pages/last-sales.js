import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = () => {
  const [sales, setSales] = useState();
  const { data, error } = useSWR(
    "https://next-js-course-dee8e-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (!data || !sales) {
    return <>Loading</>;
  }

  if (error) {
    return <>Encountered error</>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>{sale.username}</li>
      ))}
    </ul>
  );
};

export default LastSales;
