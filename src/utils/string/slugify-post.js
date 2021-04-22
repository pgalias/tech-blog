import kebabCase from "lodash/kebabCase"

export const slugifyPost = post => kebabCase(post.name)
