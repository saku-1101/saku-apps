import { Divider } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
type ArticleListItemProps = {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  alt: string;
  tags?: ReactNode[];
  slug: string;
};
export const ArticleListItemLife = ({
  title,
  excerpt,
  date,
  url,
  alt,
  tags,
  slug,
}: ArticleListItemProps) => {
  return (
    <div className="w-full py-10 px-2 flex items-center gap-6 rounded-md hover:bg-neutral-50">
      <div className="flex justify-center items-center rounded-lg shadow">
        <Image
          src={url}
          alt={alt}
          width={100}
          height={100}
          style={{
            width: "100px",
            aspectRatio: "1/1",
            objectFit: "cover",
            borderRadius: "0.5rem",
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
        />
      </div>

      <div className="w-full flex flex-col justify-between gap-2">
        <div className="flex flex-wrap">{tags && tags}</div>
        <Link href={`/life/articles/${slug}`} className="w-full">
          <h2 className="md:text-3xl text-2xl font-semibold text-left text-basic">
            {title}
          </h2>
          <p className="subtle line-clamp-4">{excerpt}</p>
          <p className="text-sm text-subtle">{date}</p>
        </Link>
      </div>
    </div>
  );
};
