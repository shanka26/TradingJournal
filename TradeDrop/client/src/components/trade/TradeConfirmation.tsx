"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveTrade, TradePayload } from "@/api/trades";
import { useToast } from "@/hooks/useToast";

interface Props {
  extractedData: TradePayload;
  image: File | null;
  onConfirm: () => void;
  onReject: () => void;
}

export function TradeConfirmation({ extractedData, image, onConfirm, onReject }: Props) {
  const [open, setOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<TradePayload>(extractedData);
  const { toast } = useToast();

  const previewUrl = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);

  function update(path: (string | number)[], value: any) {
    setForm(prev => {
      const clone: any = structuredClone(prev);
      let ref = clone;
      for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]];
      ref[path[path.length - 1]] = value;
      return clone;
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveTrade(form);
      toast({ title: "Trade saved", description: "Your trade has been added." });
      setOpen(false);
      onConfirm();
    } catch (e: any) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!saving) { setOpen(v); if (!v) onReject(); } }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Confirm Trade Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Symbol</Label>
              <Input value={form.instrument.symbol ?? ""} onChange={(e) => update(["instrument","symbol"], e.target.value.toUpperCase())}/>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Asset Type</Label>
                <Input value={form.instrument.assetType} onChange={(e) => update(["instrument","assetType"], e.target.value as any)} />
              </div>
              <div>
                <Label>Side</Label>
                <Input value={form.side} onChange={(e) => update(["side"], e.target.value as any)} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Quantity</Label>
                <Input type="number" value={form.quantity ?? 0} onChange={(e) => update(["quantity"], Number(e.target.value))}/>
              </div>
              <div>
                <Label>Price</Label>
                <Input type="number" step="0.01" value={form.price ?? 0} onChange={(e) => update(["price"], Number(e.target.value))}/>
              </div>
              <div>
                <Label>Fees</Label>
                <Input type="number" step="0.01" value={form.fees ?? ""} onChange={(e) => update(["fees"], e.target.value===""?null:Number(e.target.value))}/>
              </div>
            </div>

            <div>
              <Label>Executed At</Label>
              <Input
                type="datetime-local"
                value={form.executedAt ? form.executedAt.slice(0,19) : ""}
                onChange={(e) => update(["executedAt"], e.target.value ? new Date(e.target.value).toISOString() : null)}
              />
            </div>

            {form.instrument.assetType === "OPTION" && (
              <div className="space-y-3 border rounded-md p-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Right</Label>
                    <Input value={form.instrument.option?.right ?? ""} onChange={(e) => update(["instrument","option","right"], e.target.value as any)} />
                  </div>
                  <div>
                    <Label>Strike</Label>
                    <Input type="number" value={form.instrument.option?.strike ?? ""} onChange={(e) => update(["instrument","option","strike"], e.target.value===""?null:Number(e.target.value))}/>
                  </div>
                  <div>
                    <Label>Expiration</Label>
                    <Input type="date" value={form.instrument.option?.expiration ?? ""} onChange={(e) => update(["instrument","option","expiration"], e.target.value || null)} />
                  </div>
                </div>
                <div>
                  <Label>Contracts</Label>
                  <Input type="number" value={form.instrument.option?.contracts ?? ""} onChange={(e) => update(["instrument","option","contracts"], e.target.value===""?null:Number(e.target.value))}/>
                </div>
              </div>
            )}

            <div>
              <Label>Notes</Label>
              <Textarea value={form.notes ?? ""} onChange={(e) => update(["notes"], e.target.value)} />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Screenshot Preview</Label>
            <div className="rounded-md border overflow-hidden">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="Trade screenshot" className="w-full object-contain max-h-[420px]" />
              ) : (
                <div className="p-6 text-sm text-slate-500">No image</div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="ghost" onClick={() => { setOpen(false); onReject(); }} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Trade"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
