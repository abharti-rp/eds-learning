/* eslint-disable no-console */
import { createOptimizedPicture } from '../../scripts/aem.js';

async function fetchContentFragmentData(cfPath) {
  const response = await fetch(`${cfPath}.json`);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data;
}

export default function decorate(block) {
  const articleEle = document.createElement('article');
  articleEle.className = 'cf-wrapper';
  const cfPath = block.dataset.fragmentPath;
  fetchContentFragmentData(cfPath)
    .then((data) => {
      console.log(data);
      const titleEle = document.createElement('h2');
      const descriptionEle = document.createElement('p');
      if (data.articleBannerPath) {
        const optimizedPic = createOptimizedPicture(data.articleBannerPath, data.articleTitle, false, [{ width: '750' }]);
        articleEle.append(optimizedPic);
      }
      if (data.articleTitle) {
        titleEle.innerText = data.articleTitle;
        articleEle.append(titleEle);
      }
      if (data.articleDescription) {
        descriptionEle.innerText = data.articleDescription;
        articleEle.append(descriptionEle);
      }
      // block.innerHTML = '';
      block.append(articleEle);
    })
    .catch((err) => {
      console.error(err);
      const errorEle = document.createElement('p');
      errorEle.innerHTML = 'Something went wrong!';
      errorEle.className = 'cf-error';
      articleEle.append(errorEle);
      block.append(articleEle);
    });
}
