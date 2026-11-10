import { useSyncExternalStore } from "react";

/** Minimal shared state for cross-section UI (e.g. a footer link opening a service row). */
export function createStore(initial) {
  let value = initial;
  const listeners = new Set();
  return {
    get: () => value,
    set(next) {
      const resolved = typeof next === "function" ? next(value) : next;
      if (Object.is(resolved, value)) return;
      value = resolved;
      listeners.forEach((l) => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function useStore(store) {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

/** Which service rows are expanded. Several can be open, so opening one never shifts the rows above it. */
export const openServicesStore = createStore(["web"]);
export const toggleService = (id) => openServicesStore.set((open) => (open.includes(id) ? open.filter((x) => x !== id) : [...open, id]));
export const openService = (id) => openServicesStore.set((open) => (open.includes(id) ? open : [...open, id]));
/** Whether the full-screen mobile menu is open. */
export const menuOpenStore = createStore(false);

/** A project type chosen elsewhere on the page, pre-selected in the contact form. */
export const projectIntentStore = createStore({ type: null, nonce: 0 });

export const setProjectIntent = (type) => projectIntentStore.set((prev) => ({ type, nonce: prev.nonce + 1 }));
