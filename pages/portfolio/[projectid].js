import { useRouter } from "next/router";

const PortfolioProjectPage = () => {
    const router = useRouter();
    console.log(router);
    return(
        <div>
            <h1>The PortfolioProjectPage</h1>
        </div>
    )
}

export default PortfolioProjectPage;