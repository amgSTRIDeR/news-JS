import type { Article } from '../../app/app';
import './news.css';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');
        if(newsItemTemp instanceof HTMLTemplateElement) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
                if (photo) {
                    photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }

                const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
                if(author) {
                    author.textContent = item.author || item.source.name;
                }

                const metaDate = newsClone.querySelector('.news__meta-date');
                if(metaDate) {
                    metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
                }

                const descriptionTitle = newsClone.querySelector('.news__description-title');
                if(descriptionTitle) {
                    descriptionTitle.textContent = item.title;
                }

                const descriptionSource = newsClone.querySelector('.news__description-source')
                if(descriptionSource) {
                    descriptionSource.textContent = item.source.name;
                }

                const descriptionContent = newsClone.querySelector('.news__description-content');
                if(descriptionContent) {
                    descriptionContent.textContent = item.description;
                }

                const newsReadMore = newsClone.querySelector('.news__read-more a');
                if(newsReadMore) {
                    newsReadMore.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            });

            const newsContainer = document.querySelector('.news');
            if (newsContainer) {
                newsContainer.innerHTML = '';
                newsContainer.appendChild(fragment);
            }
        }
    }
}

export default News;
