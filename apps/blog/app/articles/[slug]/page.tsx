import { getArticleBySlug, getArticleSlugs } from "@/libs/getApi";
import markdownToHtml from "@/libs/markdownToHtml";
import { sanitizeHtml } from "@/libs/sanitize";
import { Thumbnail } from "@repo/ui";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
  };
};

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = getArticleSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Article({ params }: Params) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return notFound();
  }

  const content = await markdownToHtml(article.content);

  return (
    <main>
      <div className="max-w-2xl mx-auto">
        <Thumbnail
          title={article.title}
          date={article.date}
          beginColor={article.beginColor}
          middleColor={article.middleColor}
          endColor={article.endColor}
          tags={article.tags}
        />
      </div>
      <article className="mb-32">
        <div className="max-w-2xl mx-auto">
          <div
            className="markdown"
            // https://biomejs.dev/ja/linter/rules/no-dangerously-set-inner-html/
            // `sanitizeHtml`によりサニタイズ済みのDOMを渡すので、`dangerouslySetInnerHTML`を許容する
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />
        </div>
      </article>
    </main>
  );
}
