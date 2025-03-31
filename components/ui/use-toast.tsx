import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast"
import { useToast as useToastOriginal } from "./use-toast-hook"

export const ToastProvider = ToastProvider
export const ToastViewport = ToastViewport
export const Toast = Toast
export const ToastTitle = ToastTitle
export const ToastDescription = ToastDescription
export const ToastClose = ToastClose
export const useToast = useToastOriginal 