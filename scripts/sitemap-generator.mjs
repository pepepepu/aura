import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
async function generateSitemap() {
  console.log('Iniciando a geração do sitemap...');

  const baseUrl = 'https://musical-aura.vercel.app';

  const staticRoutes = [
    { url: '/', priority: 1.00, changefreq: 'daily' },
    { url: '/privacy-policy', priority: 0.80, changefreq: 'monthly' },
    { url: '/terms-and-conditions', priority: 0.80, changefreq: 'monthly' },
    { url: '/dashboard', priority: 0.90, changefreq: 'weekly' },
    { url: '/minhaAura', priority: 0.90, changefreq: 'weekly' },
    { url: '/auraSemanal', priority: 0.90, changefreq: 'weekly' },
  ];

  const allLinks = [
    ...staticRoutes,
  ];

  const stream = new SitemapStream({ hostname: baseUrl });
  const xmlPromise = streamToPromise(Readable.from(allLinks).pipe(stream)).then((data) =>
    data.toString()
  );
  const outputPath = path.resolve('./public', 'sitemap.xml');

  try {
    const sitemapXml = await xmlPromise;
    fs.writeFileSync(outputPath, sitemapXml);
    console.log(`✅ Sitemap gerado com sucesso em: ${outputPath}`);
  } catch (error) {
    console.error('❌ Erro ao gerar o sitemap:', error);
  }
}

generateSitemap();