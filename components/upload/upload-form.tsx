'use client';

import UploadFormInput from '@/components/upload/upload-form-input';
import { z } from 'zod';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { generatePdfSummary } from '@/actions/upload-actions';
import { storePdfSummaryAction } from '@/actions/store-pdf-summary';
import React, { useRef } from 'react';
import { useUser } from '@clerk/nextjs';

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
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const { startUpload } = useUploadThing('pdfUploader');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formRef.current ?? e.currentTarget);
    const file = formData.get('file') as File;

    // ✅ Validate the file
    const validated = schema.safeParse({ file });
    if (!validated.success) {
      const issues = validated.error.format().file?._errors || ['Invalid input'];
      issues.forEach((msg) => toast.error(`🚫 ${msg}`));
      return;
    }

    // ✅ Uploading toast
    const uploadToastId = toast.loading(`📤 Uploading "${file.name}"...`);

    try {
      const resp = await startUpload([file]);

      if (!resp || resp.length === 0) {
        toast.error('❌ Upload did not complete. Please try again.', {
          id: uploadToastId,
        });
        return;
      }

      // ✅ Upload complete
      toast.success('✅ File uploaded successfully!', { id: uploadToastId });

      // ❌ Defensive: Check if ufsUrl exists
      if (!resp[0]?.ufsUrl) {
        toast.error('🚫 File URL missing from upload response');
        return;
      }

  toast('📄 Processing PDF\nHang tight! Our AI is reading through your document! ✨');
      const result = await generatePdfSummary(resp);
      const { data = null, message = null } = result || {};

      if (data?.summary) {
  toast('📄 Saving PDF...\nHang tight! We are saving your summary! ✨');
        formRef.current?.reset();
        await storePdfSummaryAction({
          userId: user?.id || '',
          summary: data.summary,
          fileUrl: resp[0].ufsUrl || resp[0].serverData.file?.ufsUrl || resp[0].serverData.ufsUrl || resp[0].serverData.fileUrl || '',
          title: data.title,
          fileName: data.fileName,
        });
  toast('✨ Summary Generated!\nYour PDF has been successfully summarized and saved');
      }
    } catch (error: any) {
      toast.error(`❌ Upload failed: ${error?.message || 'Unknown error'}`, {
        id: uploadToastId,
      });
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
          <UploadFormInput />
        </form>
      </div>
    </div>
  );
}
