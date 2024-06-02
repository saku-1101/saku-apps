import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  QueryUserContributionYearsDocument,
  QueryYearlyUserContributionsDocument,
} from "~/gql/generated/graphql";
import { error, success } from "~/types/results";
import { fetcher } from "~/utils/fetcher";

export const meta: MetaFunction = () => {
  return [
    { title: "Git Browse App" },
    {
      name: "description",
      content: "Your can browse anyone's GitHub contributions!",
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username || "";
  const githubApiUrl = process.env.GITHUB_API_URL || "";

  try {
    const contributionYears = await fetcher(
      githubApiUrl,
      QueryUserContributionYearsDocument,
      {
        username,
      },
    );

    const promises =
      contributionYears?.user?.contributionsCollection.contributionYears.map(
        async (year: number) => {
          const yearlyUserContributions = await fetcher(
            githubApiUrl,
            QueryYearlyUserContributionsDocument,
            {
              username,
              from: `${year}-01-01T00:00:00Z`,
              to: `${year}-12-31T23:59:59Z`,
            },
          );
          return yearlyUserContributions?.user?.contributionsCollection
            .contributionCalendar;
        },
      ) || [];

    const contributions = await Promise.all(promises);

    return success(contributions);
  } catch {
    return error("There was an error fetching the data");
  }
};

export default function GitApp() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h1>Git Browse App</h1>
      <p>Enter a GitHub username to see their contributions</p>
      <form method="post">
        <input name="username" />
        <button type="submit">Search</button>
      </form>
      <br />
      <h2>Contributions</h2>
      <div>
        {data.ok ? (
          <pre>{JSON.stringify(data.data, null, 2)}</pre>
        ) : (
          <p>There was an error fetching the data</p>
        )}
      </div>
    </>
  );
}
