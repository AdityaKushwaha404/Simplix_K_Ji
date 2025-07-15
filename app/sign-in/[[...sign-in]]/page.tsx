import { SignIn } from '@clerk/nextjs';
import BgGradient from '../../../components/common/bg-gradient';

export default function Page() {
  return (
    <div className="relative isolate">
      {/* Gradient should be outside and behind everything */}
      <BgGradient className="from-rose-300 via-rose-200 to-orange-200" />

      <section className="flex justify-center items-center lg:min-h-[40vh] relative z-10">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-25">
          <SignIn />
        </div>
      </section>
    </div>
  );
}
