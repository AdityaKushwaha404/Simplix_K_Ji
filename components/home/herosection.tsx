import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge'; // Make sure this exists
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex mb-6">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant="secondary"
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200 flex items-center"
          >
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </div>
      </div>

      <h1 className="font-bold py-6 text-center text-3xl sm:text-4xl lg:text-5xl">
        Transform PDFs into{' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{' '}
        summaries
      </h1>

      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds.
      </h2>

      <div className="mt-10">
      <Button
  variant="link"
  className="text-white text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 mt-4 bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 font-bold shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105 hover:no-underline"
>
  <Link href="/#pricing" className="flex gap-2 items-center no-underline">
    <span>Try Simplix</span>
    <ArrowRight className="animate-pulse" />
  </Link>
</Button>


      </div>
    </section>
  );
}
