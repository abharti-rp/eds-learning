/* eslint-disable no-console */
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { getPageName, getAssestMetadata } from '../../scripts/utils.js';

export default async function decorate(block) {
  const pageName = getPageName();
  console.log("PageName: ", pageName);
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.replaceChildren(ul);
  const elements = [...ul.querySelectorAll("a")];
  for (const elementA of elements) {
    const metadata = await getAssestMetadata(elementA.href);
    console.log("metadata for ", elementA.href, metadata);
  }
}
