/**
 * src/hooks/useServiceWorker.ts
 *
 * Hook responsável por:
 * 1. Registrar o Service Worker
 * 2. Detectar quando uma nova versão está disponível (SW waiting)
 * 3. Aplicar a atualização ao comando do usuário (skipWaiting + reload)
 * 4. Exibir Web Notification (se permitido) ou acionar banner no app
 */

'use client';

import { useEffect, useCallback, useRef, useState } from 'react';

export type UpdateStatus = 'idle' | 'available' | 'updating';

interface UseServiceWorkerReturn {
  updateStatus: UpdateStatus;
  applyUpdate: () => void;
  dismissUpdate: () => void;
}

export function useServiceWorker(): UseServiceWorkerReturn {
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>('idle');
  // Referência para o SW em estado "waiting" — usado ao aplicar update
  const waitingWorkerRef = useRef<ServiceWorker | null>(null);

  // ── Notifica o usuário via Web Notification ou banner ────────────────────
  const notifyUser = useCallback((worker: ServiceWorker) => {
    waitingWorkerRef.current = worker;
    setUpdateStatus('available');

    // Tenta mostrar Web Notification se permitido
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('Atualização disponível', {
        body: 'Uma nova versão do app foi publicada. Clique para atualizar.',
        icon: '/icons/icon-192.png',
        tag: 'sw-update', // evita múltiplas notificações empilhadas
        requireInteraction: true,
      });

      notification.onclick = () => {
        notification.close();
        applyUpdate();
      };
    }
    // Fallback: o banner é controlado pelo estado `updateStatus === 'available'`
  }, []);

  // ── Aplica o update: skipWaiting + aguarda controllerchange + reload ────
  const applyUpdate = useCallback(() => {
    const worker = waitingWorkerRef.current;
    if (!worker) return;

    setUpdateStatus('updating');

    // Quando o SW assumir o controle, recarrega a página
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    }, { once: true });

    // Diz ao SW waiting para pular a fila e ativar imediatamente
    worker.postMessage({ type: 'SKIP_WAITING' });
  }, []);

  const dismissUpdate = useCallback(() => {
    setUpdateStatus('idle');
  }, []);

  // ── Registro do Service Worker ────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
          // 'all' verifica atualizações a cada navegação
          updateViaCache: 'none',
        });

        console.log('[SW] Registrado com sucesso:', registration.scope);

        // ── Caso 1: SW já está em estado waiting ao carregar a página ────
        if (registration.waiting) {
          notifyUser(registration.waiting);
        }

        // ── Caso 2: SW recém-instalado entra em waiting ──────────────────
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Novo SW instalado enquanto um SW anterior controla a página
              console.log('[SW] Nova versão disponível.');
              notifyUser(newWorker);
            }
          });
        });

        // ── Verificação manual de update (polling leve a cada 30 min) ───
        // Complementa o evento updatefound para garantir detecção em abas longas
        const intervalId = setInterval(() => {
          registration.update().catch(console.error);
        }, 30 * 60 * 1000);

        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('[SW] Falha ao registrar:', error);
      }
    };

    registerSW();
  }, [notifyUser]);

  return { updateStatus, applyUpdate, dismissUpdate };
}
