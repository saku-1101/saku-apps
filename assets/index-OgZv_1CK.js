import{R as n}from"./index-BBkUAzwr.js";const o={},c=n.createContext(o);function r(e){const t=n.useContext(c);return n.useMemo(function(){return typeof e=="function"?e(t):{...t,...e}},[t,e])}function i(e){let t;return e.disableParentContext?t=typeof e.components=="function"?e.components(o):e.components||o:t=r(e.components),n.createElement(c.Provider,{value:t},e.children)}export{i as MDXProvider,r as useMDXComponents};
