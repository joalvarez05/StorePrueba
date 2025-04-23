// src/hooks/useMetaTags.js

import { useEffect } from "react";

const useMetaTags = (data) => {
  useEffect(() => {
    if (data && data.length > 0) {
      const empresa = data[0]; // Suponemos que el primer objeto de data es el que contiene la información relevante

      // Actualizar título
      document.title = empresa.nombre || "UHMO · Store";

      // Actualizar meta tags generales
      let descriptionTag = document.querySelector("meta[name='description']");
      if (!descriptionTag) {
        descriptionTag = document.createElement("meta");
        descriptionTag.setAttribute("name", "description");
        document.head.appendChild(descriptionTag);
      }
      descriptionTag.setAttribute(
        "content",
        empresa.descripcion ||
          "Crea tu propia tienda por un precio realmente bajo. Tu tienda, tus reglas."
      );

      let keywordsTag = document.querySelector("meta[name='keywords']");
      if (!keywordsTag) {
        keywordsTag = document.createElement("meta");
        keywordsTag.setAttribute("name", "keywords");
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.setAttribute(
        "content",
        empresa.keywords ||
          "productos en línea,compras online,tienda de confianza,tienda en línea,pedidos ya"
      );

      let canonicalTag = document.querySelector("link[rel='canonical']");
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute("href", empresa.url || "https://uhmo.store/");

      let icon = document.querySelector("link[rel='icon']");
      if (!icon) {
        icon = document.createElement("link");
        icon.setAttribute("rel", "icon");
        document.head.appendChild(icon);
      }
      icon.setAttribute(
        "href",
        empresa.logo || "https://uhmo.store/favicon.ico"
      );

      // Actualizar Open Graph
      let ogTitleTag = document.querySelector("meta[property='og:title']");
      if (!ogTitleTag) {
        ogTitleTag = document.createElement("meta");
        ogTitleTag.setAttribute("property", "og:title");
        document.head.appendChild(ogTitleTag);
      }
      ogTitleTag.setAttribute("content", empresa.nombre || "UHMO · Store");

      let ogDescriptionTag = document.querySelector(
        "meta[property='og:description']"
      );
      if (!ogDescriptionTag) {
        ogDescriptionTag = document.createElement("meta");
        ogDescriptionTag.setAttribute("property", "og:description");
        document.head.appendChild(ogDescriptionTag);
      }
      ogDescriptionTag.setAttribute(
        "content",
        empresa.descripcion ||
          "El E-commerce que marca tendencia. Soluciones Personalizadas para Empresas y Emprendedores."
      );

      let ogImageTag = document.querySelector("meta[property='og:image']");
      if (!ogImageTag) {
        ogImageTag = document.createElement("meta");
        ogImageTag.setAttribute("property", "og:image");
        document.head.appendChild(ogImageTag);
      }
      ogImageTag.setAttribute(
        "content",
        empresa.logo ||
          "https://res.cloudinary.com/druvz15q9/image/upload/v1737947671/uhmoLogoLight_ufr6vq.webp"
      );

      let ogUrlTag = document.querySelector("meta[property='og:url']");
      if (!ogUrlTag) {
        ogUrlTag = document.createElement("meta");
        ogUrlTag.setAttribute("property", "og:url");
        document.head.appendChild(ogUrlTag);
      }
      ogUrlTag.setAttribute("content", empresa.url || "https://uhmo.store/");

      let ogLocaleTag = document.querySelector("meta[property='og:locale']");
      if (!ogLocaleTag) {
        ogLocaleTag = document.createElement("meta");
        ogLocaleTag.setAttribute("property", "og:locale");
        document.head.appendChild(ogLocaleTag);
      }
      ogLocaleTag.setAttribute("content", empresa.locale || "es_AR");

      // Actualizar Twitter meta tags
      let twitterTitleTag = document.querySelector(
        "meta[name='twitter:title']"
      );
      if (!twitterTitleTag) {
        twitterTitleTag = document.createElement("meta");
        twitterTitleTag.setAttribute("name", "twitter:title");
        document.head.appendChild(twitterTitleTag);
      }
      twitterTitleTag.setAttribute("content", empresa.nombre || "UHMO · Store");

      let twitterDescriptionTag = document.querySelector(
        "meta[name='twitter:description']"
      );
      if (!twitterDescriptionTag) {
        twitterDescriptionTag = document.createElement("meta");
        twitterDescriptionTag.setAttribute("name", "twitter:description");
        document.head.appendChild(twitterDescriptionTag);
      }
      twitterDescriptionTag.setAttribute(
        "content",
        empresa.descripcion ||
          "Tienda online sin comisiones. Ideal para emprendimientos y empresas modernas."
      );

      let twitterImageTag = document.querySelector(
        "meta[name='twitter:image']"
      );
      if (!twitterImageTag) {
        twitterImageTag = document.createElement("meta");
        twitterImageTag.setAttribute("name", "twitter:image");
        document.head.appendChild(twitterImageTag);
      }
      twitterImageTag.setAttribute(
        "content",
        empresa.logo ||
          "https://res.cloudinary.com/druvz15q9/image/upload/v1737947671/uhmoLogoLight_ufr6vq.webp"
      );
    }
  }, [data]);
};

export default useMetaTags;
