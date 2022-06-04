import { useEffect, useState } from "react";

const LastSales = () => {
  const url =
    "https://next-js-course-dee8e-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json";
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (!sales) {
    return <>No Sales available</>;
  }

  if (isLoading) {
    return <>Loading</>;
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
