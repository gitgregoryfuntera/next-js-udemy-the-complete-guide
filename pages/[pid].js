import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs/promises";
import path from "path";

const ProductDetailsPage = (props) => {
  const { productDetailInfo } = props;
  if (!productDetailInfo) {
    return <>Loading...</>
  }
  return (
    <>
      <h1>{productDetailInfo.title}</h1>
      <p>{productDetailInfo.description}</p>
    </>
  );
};

export default ProductDetailsPage;

export const getStaticProps = async (context) => {
  const { params } = context;

  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const productDetailInfo = data.products.find((product) => product.id === params.pid);
  return {
    props: {
      productDetailInfo,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { pid: "p1" } },
    ],
    fallback: "blocking", // Can be set as false or blocking for dynamic path
  };
};
