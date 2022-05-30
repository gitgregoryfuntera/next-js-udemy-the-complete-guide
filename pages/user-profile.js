const UserProfile = (props) => {
  const { username } = props;
  return (
    <>
      <h1>{username}</h1>
    </>
  );
};

export default UserProfile;

export const getServerSideProps = async (context) => {
    return {
        props: {
            username: 'Max'
        }
    }
}
