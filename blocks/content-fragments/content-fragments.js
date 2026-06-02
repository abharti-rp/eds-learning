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
  const divEle = document.createElement('div');
  divEle.className = 'cf-wrapper';
  const cfPath = block.dataset.cf;
  fetchContentFragmentData(cfPath)
    .then((data) => {
      console.log(data);
      const titleEle = document.createElement('h2');
      const descriptionEle = document.createElement('p');
      const optimizedPic = createOptimizedPicture(data.articleBannerPath, data.articleTitle, false, [{ width: '750' }]);
      divEle.append(optimizedPic, titleEle, descriptionEle);
      block.innerHTML = '';
      block.append(divEle);
    })
    .catch((err) => {
      console.error(err);
      const errorEle = document.createElement('p');
      errorEle.innerHTML = 'Something went wrong!';
      errorEle.className = 'cf-error';
      divEle.append(errorEle);
      block.append(divEle);
    });
}
