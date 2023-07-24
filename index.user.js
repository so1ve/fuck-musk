// ==UserScript==
// @name         Fuck Elon Musk
// @namespace    https://greasyfork.org/scripts/471597-elon-musk
// @version      0.1.0
// @description  Fuck Elon Musk! Let's bring the Twitter bird back.
// @author       Ray (https://github.com/so1ve)
// @license      MIT
// @run-at       document-start
// @homepageURL  https://github.com/so1ve/fuck-elonmusk
// @supportURL   https://github.com/so1ve/fuck-elonmusk
// @match        https://twitter.com/**
// @grant        GM_addStyle
// ==/UserScript==

"use strict";

const COLOR_CSS = ".r-1cvl2hr { color: rgb(29, 155, 240); }";

const TWITTER_LOGO = `<svg viewBox="0 0 24 24" aria-hidden="true" class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>`;

/**
 * @param {string} selector
 * @returns {Promise<HTMLElement>}
 */
const waitForElement = (selector) =>
	new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(() => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});

/** @param {boolean} show */
const makeTwitterLogoStyle = (show) =>
	`a[href="/home"][aria-label="Twitter"] { display: ${
		show ? "flex" : "block"
	}; }`;

/** @param {boolean} show */
const makePlaceholderStyle = (show) =>
	`#placeholder { display: ${show ? "flex" : "none"}; }`;

const preloadStylesheet = new CSSStyleSheet();
preloadStylesheet.replaceSync(makePlaceholderStyle(false));

GM_addStyle(makeTwitterLogoStyle(false));
GM_addStyle(makePlaceholderStyle(false));
GM_addStyle(COLOR_CSS);

waitForElement("#placeholder").then((placeholder) => {
	placeholder.children[0].innerHTML = TWITTER_LOGO;
	GM_addStyle(makePlaceholderStyle(true));
});

waitForElement('a[href="/home"][aria-label="Twitter"]').then((a) => {
	a.children[0].innerHTML = TWITTER_LOGO;
	GM_addStyle(makeTwitterLogoStyle(true));
});
