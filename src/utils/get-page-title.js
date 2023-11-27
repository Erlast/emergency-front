import defaultSettings from './settings'

const title = defaultSettings.title || 'Внутренний сайт ГКБ №34'

export default function getPageTitle(pageTitle, $suffix = true) {
    if (pageTitle) {
        return `${pageTitle}` + (($suffix) ? ` - ${title}` : ``)
    }
    return `${title}`
}
