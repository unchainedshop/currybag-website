const getAssortmentPath = (assortmentPaths = [], pathFromRoot = 'shop') => {
  const pathArr = [];

  const recuresive = (paths = assortmentPaths, rootPath = pathFromRoot) => {
    if (paths.length === 0) return;

    const [currentLink, ...nextLink] = paths;

    pathArr.push({
      id: currentLink.assortmentId,
      title: currentLink.link.parent.texts.title,
      slug: `${rootPath}/${currentLink.link.parent.texts.slug}`,
    });
    recuresive(nextLink, `${rootPath}/${currentLink.link.parent.texts.slug}`);
  };
  recuresive(assortmentPaths, pathFromRoot);
  return pathArr;
};

export default getAssortmentPath;
