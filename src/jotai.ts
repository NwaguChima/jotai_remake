import { useEffect, useState, useSyncExternalStore } from 'react';

export interface Atom<AtomType> {
  get: () => AtomType;
  set: (newValue: AtomType) => void;
  subscribe: (callback: (newValue: AtomType) => void) => () => void;
}

type AtomGetter<AtomType> = (
  get: <Target>(a: Atom<Target>) => Target
) => AtomType;

export function atom<AtomType>(
  initialValue: AtomType | AtomGetter<AtomType>
): Atom<AtomType> {
  let value =
    typeof initialValue === 'function' ? (null as AtomType) : initialValue;

  const subscribers = new Set<(newValue: AtomType) => void>();

  function get<Target>(atom: Atom<Target>) {
    let currentValue = atom.get();

    atom.subscribe((newValue) => {
      if (newValue === currentValue) return;

      currentValue = newValue;
      computeValue();
      subscribers.forEach((callback) => callback(value));
    });

    return currentValue;
  }

  function computeValue() {
    const newValue =
      typeof initialValue === 'function'
        ? (initialValue as AtomGetter<AtomType>)(get)
        : initialValue;

    if (newValue && typeof (newValue as any).then === 'function') {
      value = null as AtomType;

      (newValue as any as Promise<AtomType>).then((resolvedValue) => {
        value = resolvedValue;
        subscribers.forEach((callback) => callback(value));
      });
    } else {
      value = newValue;
    }
  }

  computeValue();

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      subscribers.forEach((callback) => callback(value));
    },
    subscribe: (callback) => {
      subscribers.add(callback);

      return () => {
        subscribers.delete(callback);
      };
    },
  };
}

export function useAtom<AtomType>(atom: Atom<AtomType>) {
  //   const [value, setValue] = useState(atom.get());

  //   useEffect(() => {
  //     const unsubscribe = atom.subscribe(setValue);

  //     return () => {
  //       unsubscribe();
  //     };
  //   }, [atom]);

  //   return [value, atom.set];

  return [useSyncExternalStore(atom.subscribe, atom.get), atom.set];
}

export function useAtomValue<AtomType>(atom: Atom<AtomType>) {
  return useSyncExternalStore(atom.subscribe, atom.get);
}
