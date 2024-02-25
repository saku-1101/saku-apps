import {
  getAllTechArticleTags,
  getAllTechArticlesByTag,
} from "@/libs/getTechApi";
import { ArticleListItem } from "@repo/ui";
import Link from "next/link";

type Params = {
  params: {
    slug: string;
  };
};
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = getAllTechArticleTags();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Page({ params }: Params) {
  const article = getAllTechArticlesByTag(params.slug);
  return (
    <main className="flex min-w-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-bold text-left text-basic my-10">
        Articles
      </h1>
      <div className="max-w-2xl mx-auto">
        {article.map((article) => {
          const tagWithId = article.tags?.map((tag) => {
            const id = Math.random().toString(32).substring(2);
            return {
              id: id,
              name: tag,
            };
          });

          const renderTags = tagWithId?.map((tag) => (
            <Link href={`/dev/tag/${tag.name}`} key={tag.id}>
              <span className="tag mr-3">{tag.name}</span>
            </Link>
          ));

          return (
            <Link href={`/dev/articles/${article.slug}`} key={article.slug}>
              <ArticleListItem
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                colors={`${article.beginColor} ${article.middleColor} ${article.endColor}`}
                tags={renderTags}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}