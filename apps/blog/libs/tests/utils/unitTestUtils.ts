import { join } from "node:path";

const getArticlesDirectory = (dirName: "_life" | "_dev") =>
  join(process.cwd(), `../../articles/${dirName}/`);

export const unitTestUtils = {
  getArticlesDirectory: getArticlesDirectory,
};
