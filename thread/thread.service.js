const Thread = require('./thread.model');

module.exports = {
    createThread,
    createPost
};

async function createThread (title, post) {
    const thread = new Thread({
        title: title,
        post: post
    });
    return await thread.save().then(res => {return res._id;});
}

async function createPost (threadId, post) {
    await Thread.findOneAndUpdate(threadId, {$push: {post: post}})
}