
const settings = {
	COMPANY_NAME: "SoftGeek",
	BRANCH_NAME: "SG SOLAR ROMANIA",
	STORE_NAME: "SGSOLAR",
	AUTHOR_NAME: "SoulRaven <SoftGeek Romania>",

	BASE_URL: "https://www.sgsolar.ro/",

	CDN_BASE_URL: "https://cdn.softgeek.ro/sgsolar/merchant_pro/",

	get MEDIA_URL() {
		return `${this.CDN_BASE_URL}media/`;
	},

	get STATIC_URL() {
		return `${this.CDN_BASE_URL}static/`;
	},

	INSTALLED_APPS: [
		// "catalogs",
		// "brandsCarusel",
		// "displayVAT",
		// "displayEAN",
		// "currentyToggle",
		// "updatePageMeta",
		// "categoryImageHeader",
		// "datasheetTabMockup",
		"stickyAddToCart",
    // "imagesThief",
		// "codeToProductBox",
		// "minimumOrder",
		// "pwa",
		// "tweaks",
		// 'bottomBlocks',
		'catalogs_and_brands'
	],
};

export { settings };
