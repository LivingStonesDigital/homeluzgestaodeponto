/**
 * service-worker.js
 * PWA Service Worker — Cache versionado + Push Notifications
 *
 * IMPORTANTE: Este arquivo deve estar em /public/service-worker.js
 * para ser servido na raiz do domínio pelo Next.js / Vercel.
 */

// ─────────────────────────────────────────────
// VERSÃO DO CACHE — altere a cada deploy para
// forçar a invalidação do cache anterior.
// Em produção, considere injetar via CI/CD:
//   const CACHE_VERSION = '__BUILD_ID__';
// ─────────────────────────────────────────────
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;

// Recursos essenciais para cache offline (App Shell)
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/manifest-icon-192.maskable.png',
  '/manifest-icon-512.maskable.png',
];

// ─── INSTALL ──────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Install — versão:', CACHE_VERSION);

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Faz o pré-cache dos recursos essenciais
      return cache.addAll(PRECACHE_URLS);
    })
  );

  // NÃO chamar skipWaiting() aqui.
  // O controle da ativação é feito pelo frontend (usuário decide).
});

// ─── ACTIVATE ─────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate — versão:', CACHE_VERSION);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          // Remove caches de versões anteriores
          .filter((name) => name.startsWith('app-cache-') && name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Removendo cache antigo:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      // Assume controle imediato de todos os clientes abertos
      return self.clients.claim();
    })
  );
});

// ─── FETCH (Stale-While-Revalidate) ───────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições que não são GET
  if (request.method !== 'GET') return;

  // Ignorar requisições para a API e PocketBase — nunca cachear dados dinâmicos
  if (
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('pocketbase') ||
    url.hostname !== self.location.hostname
  ) {
    return; // usa a rede normalmente
  }

  // Estratégia: Network First para páginas HTML (garante conteúdo fresco)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Estratégia: Cache First para assets estáticos (js, css, imagens)
  event.respondWith(cacheFirstStrategy(request));
});

/** Network First: tenta rede, cai no cache se offline */
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

/** Cache First: usa cache, atualiza em background */
async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);
  if (cached) {
    fetch(request).then((networkResponse) => {
      caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
    }).catch(() => {});
    return cached;
  }
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

// ─── SKIP WAITING (mensagem do frontend) ──────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    console.log('[SW] skipWaiting chamado pelo usuário.');
    self.skipWaiting();
  }
});

// ─── PUSH NOTIFICATIONS ───────────────────────
self.addEventListener('push', (event) => {
  console.log('[SW] Push recebido.');

  let data = {
    title: 'Nova notificação',
    body: '',
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    url: '/',
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      data = { ...data, ...payload };
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    data: { url: data.url },
    // Mantém a notificação até o usuário interagir
    requireInteraction: true,
    // Vibração: padrão [duração, pausa, duração]
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ─── NOTIFICATION CLICK ───────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Se o app já está aberto, foca nele
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Senão, abre uma nova janela
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
