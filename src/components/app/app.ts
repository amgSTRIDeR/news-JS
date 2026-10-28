import AppController from '../controller/controller';
import { AppView } from '../view/appView';

export interface Article {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;
}

export interface Source {
    id: string;
    name: string;
}

export interface NewsData {
    status: string;
    articles: Article[];
    sources: Source[];
}

export default class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document?.querySelector('.sources')?.addEventListener('click', (e) => {
                this.controller.getNews(e, (data: NewsData | undefined) => this.view.drawNews(data))
        });

        this.controller.getSources((data: NewsData | undefined) => this.view.drawSources(data));
    }
}
