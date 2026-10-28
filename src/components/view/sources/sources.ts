import type { Source } from '../../app/app';
import './sources.css';

class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        if(sourceItemTemp) {
           data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');

            if (sourceName) {
                sourceName.textContent = item.name;
            }

            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

                fragment.append(sourceClone);
            });

            const sources = document.querySelector('.sources');

            if(sources) {
                sources.append(fragment); 
            }
        }

        document.querySelector('.sources')?.addEventListener('click', (e) => {
            let target = e.target;
            let sourceItem;
            if(!(target instanceof HTMLElement)) {
                return;
            }
            if(target.classList.contains('source__item')) {
                sourceItem = target;
            } else {
                sourceItem = target.closest('.source__item');
            }

            for (const item of document.querySelectorAll('.source__item')) {
                item.classList.remove('active');
            }

            if(sourceItem) {
                sourceItem.classList.add('active');
            }
        })
    }
}

export default Sources;
