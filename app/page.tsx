import BentoHero from '@/components/BentoHero';
import ProductShowcase from '@/components/productShowcase';
import Contact from '@/components/contacts'

export default function Home() {
  return (
    <main>
      <BentoHero />
      
      {/* This will appear naturally after the 'Pinned' scroll 
          duration of BentoHero ends.
      */}
      <ProductShowcase />
      <Contact />
      
    </main>
  );
}