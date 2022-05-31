import list_helper from "../utils/list_helper";
import {Blog} from "../types";

test('dummy returns one', () => {
    const blogs: Blog[] = []

    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
})
