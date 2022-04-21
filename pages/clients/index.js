import Link from "next/link";

const ClientPage = () => {
  const clients = [
    { id: "max", name: "Max" },
    { id: "manu", name: "Manuel" },
  ];
  return (
    <div>
      ClientPage Works
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientPage;
