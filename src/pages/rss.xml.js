import rss from '@astrojs/rss';
// import { getCollection } from 'astro:content';

export async function GET(context) {
  // TODO: replace with getCollection('blog') or collection name
  const posts = [];

  return rss({
    title: 'Cosmo',
    // TODO: replace description
    description: 'A short description of what Cosmo is about.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // TODO: update path to match routing
      link: '/blog/' + post.id + '/',
    })),
    customData: '<language>en-us</language>',
  });
}
