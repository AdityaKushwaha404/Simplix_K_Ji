import { ArrowRight, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Optional: remove if not using `cn` helper
import { ReactNode } from 'react';

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceld: string;
};

const plans: PriceType[] = [
  {
    name: 'Basic',
    price: 9,
    description: 'Perfect for occasional use',
    items: ['5 PDF summaries per month', 'Standard processing speed', 'Email support'],
    id: 'basic',
    paymentLink: '/checkout/basic',
    priceld: 'price_basic',
  },
  {
    name: 'Pro',
    price: 19,
    description: 'For professionals and teams',
    items: [
      'Unlimited PDF summaries',
      'Priority processing',
      '24/7 priority support',
      'Markdown Export',
    ],
    id: 'pro',
    paymentLink: '/checkout/pro',
    priceld: 'price_pro',
  },
];

function PricingCard({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
      <div
        className={cn(
          'relative flex flex-col h-full gap-5 z-10 p-8 border border-gray-300 rounded-2xl bg-white shadow-sm',
          id === 'pro' && 'border-rose-500 shadow-md'
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <p className="text-2xl font-semibold">{name}</p>
        </div>
        <p className="text-base text-gray-600">{description}</p>
        <div className="flex gap-2 items-end">
          <p className="text-5xl font-extrabold tracking-tight">${price}</p>
          <div className="flex flex-col mb-1">
            <p className="text-xs font-semibold uppercase">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <ul className="space-y-2 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} className="text-rose-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link
          href={paymentLink}
          className={cn(
            'w-full mt-4 rounded-full flex items-center justify-center gap-2 border-2 py-2 text-white transition-colors',
            id === 'pro'
              ? 'bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 border-rose-900'
              : 'bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 border-rose-100'
          )}
        >
          Buy Now <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl text-rose-500">Pricing</h2>
        </div>
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
