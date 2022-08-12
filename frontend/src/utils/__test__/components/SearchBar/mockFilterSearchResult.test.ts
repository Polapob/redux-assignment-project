import mockFilterSearchResult from "../../../components/SearchBar/mockFilterSearchResult";

describe("check mock filter search result function run correctly", () => {
  it("if input = null will show all data", () => {
    const testData = ["AAsdas", "Adsd", "xczc"];
    const result = mockFilterSearchResult("", testData);
    expect(result).toStrictEqual(testData);
  });

  it("can filter correctly input", () => {
    const testData = ["Adidas", "Nike", "Puma"];
    const result = mockFilterSearchResult("adi", testData);
    const result2 = mockFilterSearchResult("a", testData);
    expect(result).toStrictEqual(["Adidas"]);
    expect(result2).toStrictEqual(["Adidas", "Puma"]);
  });
});
