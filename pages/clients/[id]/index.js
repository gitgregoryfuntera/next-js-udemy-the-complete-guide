import { useRouter } from "next/router";
const ClientProjectPage = () => {
  const router = useRouter();;
  const navigateTo = () => {
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "123" },
    });
  };
  return (
    <div>
      ClientProjectPage works
      <button onClick={navigateTo}>Click to navigate</button>
    </div>
  );
};

export default ClientProjectPage;
