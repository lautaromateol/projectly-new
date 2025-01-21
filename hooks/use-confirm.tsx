"use client"
import { JSX, useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/responsive-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function useConfirm(
  title: string,
  message: string,
  variant: ButtonProps["variant"] = "default"
): [() => JSX.Element, () => Promise<unknown>] {

  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

  function confirm() {
    return new Promise((resolve) => setPromise({ resolve }))
  }

  function handleClose() {
    setPromise(null)
  }

  function handleConfirm() {
    promise?.resolve(true)
    handleClose()
  }

  function handleCancel() {
    promise?.resolve(false)
    handleClose()
  }

  function ConfirmationDialog() {
    return (
      <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
        <Card className="shadow-none border-0 size-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-x-2">
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleConfirm} variant={variant}>
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      </ResponsiveModal>
    )
  }

  return [ConfirmationDialog, confirm]
}
