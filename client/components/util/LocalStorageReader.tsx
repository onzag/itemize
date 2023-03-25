/**
 * The local storage reader allows to set up slots that contain information
 * within local storage that are keep updated and synchronized
 */

import React, { useCallback, useEffect, useState } from "react";
import { DESTRUCTION_MARKERS_LOCATION, SEARCH_DESTRUCTION_MARKERS_LOCATION } from "../../../constants";

export interface ILocalStorageEventType {
  slot: string;
  value: any,
}

const forbiddenSlots = [
  DESTRUCTION_MARKERS_LOCATION,
  SEARCH_DESTRUCTION_MARKERS_LOCATION,
  "SLATE_DRAWER_OPEN",
];

/**
 * Sets a local storage item (and keeps it updated accross all instances)
 * it uses JSON stringify to store the value
 * @param slot 
 * @param value 
 */
export function setLocalStorageItem(slot: string, value: any) {
  if (forbiddenSlots.includes(slot)) {
    throw new Error("Could not set the slot at " + slot + " because it's a reserved slot");
  }

  window.localStorage.setItem(slot, JSON.stringify(value));

  window.dispatchEvent(new CustomEvent<ILocalStorageEventType>("LOCAL_STORAGE_SLOT_UPDATED", {
    detail: {
      slot,
      value,
    }
  }));
}

/**
 * Retrieves a local storage item from a specific slot
 * and JSON parses it
 */
export function getLocalStorageItem(slot: string) {
  if (forbiddenSlots.includes(slot)) {
    throw new Error("Could not get the slot at " + slot + " because it's a reserved slot");
  }

  const valueRaw = window.localStorage.getItem(slot) || null;
  if (valueRaw) {
    try {
      const value = JSON.parse(valueRaw);
      return value;
    } catch {
      console.warn("Invalid value in slot " + slot + " for local storage as it cannot be json parsed");
    }
  }

  return null;
}

/**
 * Hooks version for the local storage reader
 * @param slot 
 * @returns 
 */
export function useLocalStorageReader<T>(slot: string): [T, (v: T) => void] {
  const [currentValue, setCurrentValue] = useState<T>(null as T);

  useEffect(() => {
    setCurrentValue(getLocalStorageItem(slot));

    const updateFn = (e: CustomEvent<ILocalStorageEventType>) => {
      if (e.detail.slot === slot) {
        setCurrentValue(e.detail.value);
      }
    };

    window.addEventListener("LOCAL_STORAGE_SLOT_UPDATED", updateFn as any);
    return () => {
      window.removeEventListener("LOCAL_STORAGE_SLOT_UPDATED", updateFn as any);
    }
  }, [slot]);

  const setValue = useCallback((v: T) => {
    if (currentValue === v) {
      return;
    }

    setCurrentValue(v);
    setLocalStorageItem(slot, v);
  }, [slot, currentValue]);

  return [currentValue, setValue];
}

interface ILocalStorageReaderProps<T> {
  slot: string;
  children: (value: T, setValue: (value: T) => void) => React.ReactNode;
}

/**
 * The local storage reader
 * @param props 
 * @returns 
 */
export default function LocalStorageReader<T>(props: ILocalStorageReaderProps<T>) {
  const [value, setValue] = useLocalStorageReader<T>(props.slot);

  return props.children(value, setValue);
}