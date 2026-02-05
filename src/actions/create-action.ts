// "use server";

import { CREATE_PERSON } from "@/app/(modules)/(person)/person-list/graphql/Mutation";
import { getServerClient } from "@/lib/server-apollo-client";
import { PersonInput } from "@/__generated__/graphql";

export async function createPersonList(formData: FormData) {
  const client = await getServerClient();
  const rawData = Object.fromEntries(formData.entries()) as unknown as PersonInput;

  await client.mutate({
    mutation: CREATE_PERSON,
    variables: {
      data: rawData,
    },
  });
}
