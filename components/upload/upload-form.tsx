'use client';

import UploadFormInput from '@/components/upload/upload-form-input';
import { z } from 'zod';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid file' })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: 'File size must be less than 20MB',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'Only PDF files are allowed',
    }),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing('pdfUploader');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    // ✅ Validate the file using Zod
    const validated = schema.safeParse({ file });
    if (!validated.success) {
      const issues = validated.error.format().file?._errors || ['Invalid input'];
      issues.forEach((msg) => toast.error(`🚫 ${msg}`));
      return;
    }

    // ✅ Show loading toast and remember the ID
    const toastId = toast.loading(`📤 Uploading "${file.name}"...`);

    try {
      const res = await startUpload([file]);

      if (!res || res.length === 0) {
        toast.error('❌ Upload did not complete. Please try again.', { id: toastId });
        return;
      }

      toast.success('✅ File uploaded successfully!', { id: toastId });
    } catch (error: any) {
      const message =
        error?.message || 'An unexpected error occurred during upload.';
      toast.error(`❌ Upload failed: ${message}`, { id: toastId });
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
        <UploadFormInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
