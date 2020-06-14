const searchResponseAdapter = (apiReturn) => {
  const rawSet = apiReturn.items;
  const processedSet = [];

  const shrinkRepoObj = (item) => {
    return {
      id: item.id,
      name: item.name,
      starsCount: item.stargazers_count,
      lastCommit: item.pushed_at.slice(0, 10),
      url: item.html_url
    }
  };
 
  rawSet.map(item => processedSet.push(shrinkRepoObj(item)));

  return processedSet;
}

export default searchResponseAdapter;