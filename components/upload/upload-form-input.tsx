'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex items-center gap-4">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
          className="flex-1 border border-gray-300 rounded-md p-2"
        />
        <Button type="submit" className="whitespace-nowrap">
          Upload your PDF
        </Button>
      </div>
    </form>
  );
}
