// Test Code
describe("useEffect", () => {
  it("should call fetchPostById with the correct params", async () => {
    const mockFetchPostById = jest.fn();
    const mockParams = { id: "123" };

    await useEffect(mockFetchPostById, mockParams);

    expect(mockFetchPostById).toHaveBeenCalledWith(mockParams.id);
  });

  it("should reverse the post comments", async () => {
    const mockPost = { comments: [1, 2, 3] };
    const reversedComments = [3, 2, 1];

    await useEffect(() => Promise.resolve(mockPost));

    expect(mockPost.comments).toEqual(reversedComments);
  });
});
