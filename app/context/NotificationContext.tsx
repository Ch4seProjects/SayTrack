"use client";
import { Notification } from "../types/User";
import { createContext, useContext } from "react";

export interface NotificationContextType {
  notifications: Notification[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
}
