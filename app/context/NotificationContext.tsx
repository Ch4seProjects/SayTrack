"use client";
import { Notification } from "../types/global";
import { createContext, useContext } from "react";
import { QueryObserverResult } from "@tanstack/react-query";

export interface NotificationContextType {
  notifications: Notification[];
  loading: boolean;
  refresh: () => Promise<QueryObserverResult<any[], Error>>;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotificationContext = () => useContext(NotificationContext);
