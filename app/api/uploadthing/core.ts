import { UploadThingError } from 'uploadthing/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { currentUser } from '@clerk/nextjs/server';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ 'application/pdf': { maxFileSize: '32MB' } })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('✅ Upload completed for user ID:', metadata.userId);
      console.log('📄 File UFS URL:', file.ufsUrl);

      return {
        serverData: {
          userId: metadata.userId,
          file: {
            ufsUrl: file.ufsUrl,
            name: file.name,
          },
        },
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
