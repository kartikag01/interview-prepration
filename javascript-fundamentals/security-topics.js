/**
 * CSRF
 * Cross-Site Request Forgery (CSRF) is a web security vulnerability that tricks a user's browser 
 * into performing an unwanted action on a trusted site.
 * ex: sending post request to Bank website.
 * 
 * CSRF attacks are often carried out using social engineering techniques, 
 * such as a link or email that tricks the user into taking action.
 * 
 * Prevention
 * Modern web browsers use same-origin policy restrictions to prevent CSRF requests from being executed.
 * CSRF Token & Anti CSRF Token
 * Same sight cookie flag 
 *          - strict - cookie not sent cross origin.
 *          - lax - Default with same origin policy.
 * 
 * 
 * Is it still a issue ?
 * CSRF vulnerabilities can still occur on login forms where the user is not authenticated
 */


/**
 * XSS - Cross-site scripting
 * XSS allows attackers to execute arbitrary JavaScript in a victim's browser.
 * 
 * 3 types
 * - Persistant - Add comment on BE
 * - Non Persistant - client side like search params added
 * - DOM Based - enable disable button
 * 
 * 
 * Prevention
 * user textContent/innerText insted of innerHTML
 * santize user input - DOM Purify
 * user HttpOnly flag to cookies - JS can't read that, only server can read.
 */


/**
 * CORS
 */