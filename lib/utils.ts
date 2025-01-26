import { Action } from "@prisma/client/edge"
import { clsx, type ClassValue } from "clsx"
import { isWithinInterval, subDays } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateInviteCode(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  let result = ""

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

export function snakeCaseToTitleCase(str: string) {
  return str.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

export function generateLogMessage({ action, taskTitle }: { action: Action, taskTitle: string }) {

  switch (action) {
    case Action.CREATE:
      return `created task "${taskTitle}"`

    case Action.UPDATE:
      return `updated task "${taskTitle}"`

    case Action.DELETE:
      return `deleted task "${taskTitle}"`

    case Action.COMPLETE:
      return `completed task "${taskTitle}"`
      
    default:
      return `uknown action task "${taskTitle}"`

  }
}

export function isInRange({ date, interval }: { date: Date, interval: number }) {
  const start = subDays(new Date(), interval)
  const end = new Date()

  return isWithinInterval(date, {
    start,
    end
  })
}