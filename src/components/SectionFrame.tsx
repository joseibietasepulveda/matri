import type { ReactNode } from 'react';

type SectionFrameProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SectionFrame({ eyebrow, title, description, children, className = '' }: SectionFrameProps) {
  return (
    <section className={`px-4 py-20 sm:px-6 lg:px-8 ${className}`.trim()}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#8b7353]">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl text-stone-800 sm:text-4xl">{title}</h2>
          {description ? <p className="mt-6 text-lg leading-8 text-stone-700">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
