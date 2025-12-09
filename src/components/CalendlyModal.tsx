import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
  url: string;
  triggerLabel?: string;
};

const SCRIPT_ID = 'calendly-widget-script';

export const CalendlyModal: React.FC<Props> = ({ url, triggerLabel = 'Schedule a Tour' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // load calendly script if not already present
    if (typeof window === 'undefined') return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // keep the script (no cleanup) — safe to leave
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6 py-3 flex items-center gap-3" size="lg">{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-[95vw] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Schedule a Virtual Showroom Tour</DialogTitle>
          <DialogDescription>Choose a time that suits you — the meeting will open in Calendly.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 h-[calc(100%-5.5rem)]">
          <div
            ref={containerRef}
            className="calendly-inline-widget w-full h-full"
            data-url={url}
            style={{ minWidth: 320, height: '100%' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyModal;
