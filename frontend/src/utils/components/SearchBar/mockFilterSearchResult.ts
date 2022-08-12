const mockFilterSearchResult = (input: string, data: string[]) => {
  const lowercaseInput = input.toLowerCase();
  return data.filter((eachText) => {
    const lowercaseText = eachText.toLowerCase();
    return lowercaseText.includes(lowercaseInput);
  });
};
export default mockFilterSearchResult;
