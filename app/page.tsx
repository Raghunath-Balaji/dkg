import BentoHero from '@/components/BentoHero';

export default function Home() {
  return (
    <main>
      <BentoHero />
      <section className="p-20 bg-white text-black min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Scroll Down Content</h1>
        <p className="max-w-2xl text-xl leading-relaxed">
          The hero section above is pinned until the bento box fully expands.
          Once the focal image hits 100vh, the page continues to scroll normally.
        </p>
      </section>
    </main>
  );
}