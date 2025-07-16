import BgGradient from '@/components/common/bg-gradient';
import UploadHeader from '@/components/upload/upload-header';
import UploadForm from '../../../components/upload/upload-form';

export default function Page() {
  return (
    <section className="relative min-h-screen isolate">
      <BgGradient />
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative z-10">
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
}
