import AppController from '../controller/controller';
import { AppView } from '../view/appView';

export interface Article {
    author: string | null;
    content: string | null;
    description: string | null;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string | null;
}

export interface Source {
    id: string;
    name: string;
}

export interface ArticlesResponse {
    status: string;
    totalResults?: number;
    articles: Article[];
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}

export default class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document?.querySelector('.sources')?.addEventListener('click', (e) => {
                this.controller.getNews(e, (data: ArticlesResponse | undefined) => this.view.drawNews(data))
        });

        this.controller.getSources((data: SourcesResponse | undefined) => this.view.drawSources(data));
    }
}
