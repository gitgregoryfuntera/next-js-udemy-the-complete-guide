const UserProfileId = (props) => {
  const { id } = props;
  return <h1>{id}</h1>;
};
    
export default UserProfileId;

export const getServerSideProps = (context) => {
  const { params } = context;
  const id = params.uid;
  return {
    props: {
      id: `user - ${id}`,
    },
  };
};
