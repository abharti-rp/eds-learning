/* eslint-disable import/prefer-default-export */

export async function getAssestMetadata(assetPath) {
    console.log("base", assetPath);
    const base = "https://publish-p133739-e1306963.adobeaemcloud.com";
    const path = assetPath || '';
    if (path.includes("/content/dam/")) {
        const url = !path.startsWith('http') ? new URL(path, window.location.href) : new URL(path);
        const { origin, pathname } = url;
        const metadataPath = `${base}${pathname}/jcr:content/metadata.json`;
        const response = await fetch(metadataPath);
        if (!response.ok) {
            return null;
        }

        return response.json();
    }
    return null;
}

export function getPageName() {
    const currentUrl = window.location.pathname;
    if (currentUrl == '/') {
        return 'index';
    }
    return currentUrl.split('/').pop();
}