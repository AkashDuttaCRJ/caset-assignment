import {createApi} from 'unsplash-js';

const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const unsplashSecretKey = process.env.REACT_APP_UNSPLASH_SECRET_KEY;

const unsplash = createApi({
    accessKey: unsplashAccessKey,
    secret: unsplashSecretKey,
});

export class Unsplash {
    constructor() {
        if (this instanceof Unsplash) {
            throw Error('A static class cannot be instantiated.');
        }
    }

    static async fetchHomePageData(page) {
        const res = await unsplash.photos.list({page: page, perPage: 30});
        return res;
    }

    static async fetchSearchResult(queryParams) {
        const {query, page} = queryParams;
        const res = await unsplash.search.getPhotos({query: query, page: page, perPage: 30});
        // console.log(res);
        return res;
    }

    static async fetchTopicList() {
        const slugs = ['wallpapers', 'fashion', 'animals', 'nature', 'architecture', 'history', 'film', 'people'];
        const res = await unsplash.topics.list({ page: 1, perPage: 10, topicIdsOrSlugs: slugs });
        // console.log(res);
        return res;
    }

    static async fetchTopicData(params) {
        const {id, page} = params;
        const res = await unsplash.topics.getPhotos({ topicIdOrSlug: id, page: page, perPage: 30 });
        console.log(res);
        return res;
    }
}