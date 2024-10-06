import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const lang = context.params.lang || 'it';

  if (context.url.pathname.includes('mailto')) {
    return next();
  }

  // If you want to redirect to another language
  if (lang === 'pt-BR') {
    const pathName = context.url.pathname.replace('/pt-BR/', '');
    return context.redirect(`/pt-br/${pathName}`);
  }

  if (!context.url.pathname.includes(lang) && context.url.pathname === '/') {
    return context.redirect(`/${lang}${context.url.pathname}`);
  }

  return next();
});