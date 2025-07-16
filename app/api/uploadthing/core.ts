import { UploadThingError } from 'uploadthing/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { currentUser } from '@clerk/nextjs/server';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ "application/pdf": { maxFileSize: '32MB' } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('✅ Upload completed for user ID:', metadata.userId);
      console.log('📄 File URL:', file.url);

      return { userId: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
