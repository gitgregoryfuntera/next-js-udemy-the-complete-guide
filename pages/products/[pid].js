import fs from "fs/promises";
import path from "path";

const ProductDetailsPage = (props) => {
  const { productDetailInfo } = props;
  if (!productDetailInfo) {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{productDetailInfo.title}</h1>
      <p>{productDetailInfo.description}</p>
    </>
  );
};

export default ProductDetailsPage;
const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
};
export const getStaticProps = async (context) => {
  const { params } = context;

  const data = await getData();

  const productDetailInfo = data.products.find(
    (product) => product.id === params.pid
  );

  if (!productDetailInfo) {
    return { 
      notFound: true, // handles missing data
    };
  }

  return {
    props: {
      productDetailInfo,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();
  const pathsWithParams = data.products.map(({ id }) => ({
    params: {
      pid: id,
    },
  }));
  return {
    paths: pathsWithParams,
    fallback: true, // Can be set as false or blocking for dynamic path
  };
};
