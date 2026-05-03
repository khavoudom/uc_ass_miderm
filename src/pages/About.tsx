export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      <section className="text-center space-y-8">
        <h1 className="font-display text-5xl md:text-6xl font-bold">The Story of Lumina</h1>
        <p className="text-xl text-(--text-2) leading-relaxed max-w-3xl mx-auto">
          Founded in 2024 by <span className="font-bold text-(--text)">Oudom</span>, Lumina was born from a simple yet ambitious vision: to create a sanctuary where technology, fashion, and literature intersect with minimalist elegance.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold">Our History</h2>
          <p className="text-(--text-2) leading-relaxed">
            What started as a digital-first experiment by Oudom quickly evolved into a destination for those who value both form and function. Lumina began by curating rare tech artifacts and has since expanded into a full-scale lifestyle brand, prioritizing creators and quality over mass production.
          </p>
          <p className="text-(--text-2) leading-relaxed">
            Today, we are more than just a store; we are a community of innovators, readers, and trendsetters who believe that every object in our life should tell a story.
          </p>
        </div>
        <div className="bg-(--surface2) aspect-video rounded-(--r-lg) flex items-center justify-center border border-(--border)">
          <div className="text-center space-y-2">
            <div className="text-4xl font-display font-bold text-(--accent)">2024</div>
            <div className="text-sm font-bold uppercase tracking-widest text-(--text-3)">Year Founded</div>
          </div>
        </div>
      </section>

      <section className="space-y-12 py-12 border-t border-(--border)">
        <h2 className="font-display text-3xl font-bold text-center">Our Services</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="p-8 bg-(--surface) border border-(--border) rounded-(--r-lg) space-y-4 hover:shadow-(--shadow-md) transition-all">
            <div className="w-12 h-12 bg-(--accent-light) rounded-full flex items-center justify-center text-(--accent) font-bold">01</div>
            <h3 className="font-bold text-xl">Tech Curation</h3>
            <p className="text-sm text-(--text-2)">Expertly vetted electronics and gadgets that prioritize performance and design.</p>
          </div>
          <div className="p-8 bg-(--surface) border border-(--border) rounded-(--r-lg) space-y-4 hover:shadow-(--shadow-md) transition-all">
            <div className="w-12 h-12 bg-(--accent-light) rounded-full flex items-center justify-center text-(--accent) font-bold">02</div>
            <h3 className="font-bold text-xl">Apparel Design</h3>
            <p className="text-sm text-(--text-2)">Minimalist fashion essentials crafted for comfort and a timeless aesthetic.</p>
          </div>
          <div className="p-8 bg-(--surface) border border-(--border) rounded-(--r-lg) space-y-4 hover:shadow-(--shadow-md) transition-all">
            <div className="w-12 h-12 bg-(--accent-light) rounded-full flex items-center justify-center text-(--accent) font-bold">03</div>
            <h3 className="font-bold text-xl">Literary Archive</h3>
            <p className="text-sm text-(--text-2)">A hand-picked selection of books that inspire, educate, and provoke thought.</p>
          </div>
        </div>
      </section>

      <section className="text-center py-12">
        <h2 className="font-display text-3xl font-bold mb-6">Join Our Journey</h2>
        <p className="text-(--text-2) mb-8">Experience the vision of Oudom and the Lumina team.</p>
        <button className="bg-(--accent) text-white py-4 px-10 rounded-(--r-full) font-bold hover:bg-[#1D4ED8] transition-all">Explore the Collection</button>
      </section>
    </main>
  );
}
