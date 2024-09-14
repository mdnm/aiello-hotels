export type Locales = "it_IT" | "en_GB" | "fr_FR" | "es_ES";

export const localeToUrlSuffix: Record<Locales, string> = {
	"it_IT": "",
	"en_GB": "en",
	"fr_FR": "fr",
	"es_ES": "es",
};

export const replaceUrlWithLocale = (url: string, locale: Locales) => {
	const urlSuffix = localeToUrlSuffix[locale];

	return url.replace(/\/(en|fr|es)?$/, `/${urlSuffix}`);
};

export const getRouteWithLocale = (baseUrl: string, locale: Locales, route: string) => {
	const urlSuffix = localeToUrlSuffix[locale] ? `/${localeToUrlSuffix[locale]}` : '';

	return `${baseUrl}${urlSuffix}${route}`
}