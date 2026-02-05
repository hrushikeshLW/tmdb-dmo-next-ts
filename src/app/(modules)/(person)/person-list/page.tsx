import { getServerClient } from "@/lib/server-apollo-client";
import { GET_PERSONS } from "./graphql/Query";
import PersonListClient from "./PersonListClient";
import { ListPersonsSortFields, SortOrder, Person } from "@/__generated__/graphql";

export const dynamic = "force-dynamic";

export default async function PersonList() {
  const client = await getServerClient();
  const { data } = await client.query({
    query: GET_PERSONS,
    variables: {
      filter: { skip: 0, limit: 10 },
      sort: { order: SortOrder.Desc, field: ListPersonsSortFields.UpdatedAt },
    },
  });

  return (
    <PersonListClient
      initialPersons={
        (data?.listPersons?.data || []) as Person[]
      }
      initialCount={data?.listPersons?.count || 0}
    />
  );
}
