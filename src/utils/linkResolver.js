module.exports = {
  linkResolver(doc) {
    if (doc.type === 'post') {
      return `/posts/${doc.uid}`;
    }

    return '/';
  },
};
