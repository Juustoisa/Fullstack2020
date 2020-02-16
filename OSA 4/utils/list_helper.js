var _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}


const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((a, b) => a + b.likes, 0)

}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else if (blogs.length === 1) {
        return favorite = {
            title: blogs[0].title,
            author: blogs[0].author,
            likes: blogs[0].likes
        }

    } else {

        let favorite = _.maxBy(blogs, 'likes')
        return mostLikedBlog = {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    if (blogs.length === 1) {
        const author = {
            author: blogs[0].author,
            blogs: 1
        }
        return author
    } else {
        let authors = _(blogs)
            .countBy('author')
            .map((blogs, author) => ({ author, blogs }))
            .value()
        return authorWithMostBlogs = _.maxBy(authors, 'blogs')
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    if (blogs.length === 1) {
        return author = {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    } else {
        let authors = _(blogs)
            .groupBy('author')
            .map((author, id) => ({
                author: id,
                likes: _.sumBy(author, 'likes')
            }))
            .value()
        return authorWithMostBlogs = _.maxBy(authors, 'likes')
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
