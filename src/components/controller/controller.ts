import type { ArticlesResponse, SourcesResponse } from '../app/app';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data?: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data?: ArticlesResponse) => void): void {
        let target = e.target;
        const newsContainer = e.currentTarget;
        if(!(newsContainer instanceof HTMLElement)) {
            return;
        }
        while (target !== newsContainer) {
            if(!(target instanceof HTMLElement)) {
                return;
            }
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') || '';
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<ArticlesResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
