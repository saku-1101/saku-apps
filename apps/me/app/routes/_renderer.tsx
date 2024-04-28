import { reactRenderer } from "@hono/react-renderer";

export default reactRenderer(({ children, head }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js"></script>
        ) : (
          <script type="module" src="/app/client.ts"></script>
        )}
        {head?.title ? <title>{head.title}</title> : ""}
      </head>
      <body>{children}</body>
    </html>
  );
});
