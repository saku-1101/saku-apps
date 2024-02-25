import generateToc from "@/libs/generateToc";
import { getTechArticleBySlug, getTechArticleSlugs } from "@/libs/getTechApi";
import markdownToHtml from "@/libs/markdownToHtml";
import { sanitizeHtml } from "@/libs/sanitize";
import { Button, Thumbnail, Toc } from "@repo/ui";
import { ArrowUpCircle, ChevronLeft, Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
  };
};

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = getTechArticleSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Article({ params }: Params) {
  const article = getTechArticleBySlug(params.slug);

  if (!article) {
    return notFound();
  }

  const [content, toc] = await Promise.all([
    markdownToHtml(article.content),
    generateToc(article.content),
  ]);

  const tagWithId = article.tags?.map((tag) => {
    const id = Math.random().toString(32).substring(2);
    return {
      id: id,
      name: tag,
    };
  });

  const renderTags = tagWithId?.map((tag) => (
    <Link href={`/dev/tag/${tag.name}`}>
      <span key={tag.id} className="tag mr-3">
        {tag.name}
      </span>
    </Link>
  ));

  return (
    <main>
      <div className="max-w-2xl mx-auto pt-20">
        <Link href={"/"}>
          <Button intent="square-icon" size="square">
            <ChevronLeft />
          </Button>
        </Link>
        <Thumbnail
          title={article.title}
          date={article.date}
          beginColor={`${article.beginColor}`}
          middleColor={`${article.middleColor}`}
          endColor={`${article.endColor}`}
          tags={renderTags}
        />
        <div className="w-full flex justify-center items-start gap-10">
          <article className="w-full grow shrink-0 mb-32">
            <div className="w-full">
              <div
                className="markdown"
                // https://biomejs.dev/ja/linter/rules/no-dangerously-set-inner-html/
                // `sanitizeHtml`によりサニタイズ済みのDOMを渡すので、`dangerouslySetInnerHTML`を許容する
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
              />
            </div>
          </article>
          <Toc
            // biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
            nodes={toc as any[]}
            githubLink={
              <a
                href={`https://github.com/saku-1101/saku-apps/blob/main/articles/_articles/${params.slug}.md`}
                className="w-full flex items-center justify-start gap-2 text-subtle hover:underline hover:text-basic"
                target="_blank"
                rel="noreferrer"
              >
                Githubで修正を提案する
                <Github />
              </a>
            }
            backToTopLink={
              <Link
                href="#top"
                className="w-full flex items-center justify-start gap-2 text-subtle hover:underline hover:text-basic"
              >
                ページの先頭に戻る
                <ArrowUpCircle />
              </Link>
            }
          />
        </div>
      </div>
    </main>
  );
}
