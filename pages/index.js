import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import dummyData from "../data/dummy-data.json";
export default function Home(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export const getStaticProps = () => {
  const products = dummyData.products;
  return {
    props: {
      products,
    },
  };
};
