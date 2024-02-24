import { getAllArticles } from "@/libs/getApi";
import { ArticleListItem } from "@repo/ui";
import Link from "next/link";

export default async function Page() {
  const allArticles = getAllArticles();
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-bold text-left text-basic my-10">
        Articles
      </h1>
      <div className="max-w-2xl min-w-[800px] mx-auto">
        {allArticles.map((article) => {
          const tagWithId = article.tags?.map((tag) => {
            const id = Math.random().toString(32).substring(2);
            return {
              id: id,
              name: tag,
            };
          });

          const renderTags = tagWithId?.map((tag) => (
            <Link href={`/tag/${tag.name}`}>
              <span key={tag.id} className="tag mr-3">
                {tag.name}
              </span>
            </Link>
          ));

          return (
            <Link href={`/articles/${article.slug}`}>
              <ArticleListItem
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                beginColor={`${article.beginColor}`}
                middleColor={`${article.middleColor}`}
                endColor={`${article.endColor}`}
                tags={renderTags}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
