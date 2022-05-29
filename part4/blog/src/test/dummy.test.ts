import list_helper from "../utils/list_helper";

test('dummy returns one', () => {
    const blogs:string[] = []

    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
})
