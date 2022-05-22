import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs/promises";
import path from "path";

const ProductDetailsPage = (props) => {
  const { productDetailInfo } = props;
  return (
    <>
      <h1>{productDetailInfo.title}</h1>
      <p>{productDetailInfo.title}</p>
    </>
  );
};

export default ProductDetailsPage;

export const getStaticProps = async (context) => {
  const { params } = context;

  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const productDetailInfo = data.find((product) => product.id === params.id);

  return {
    props: {
      productDetailInfo,
    },
  };
};
