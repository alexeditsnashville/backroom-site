import { useMemo, useState } from "react";
import Card from "./components/Card";
import FilmStrip from "./components/FilmStrip";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HorizontalScroller from "./components/HorizontalScroller";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import QuoteSection from "./components/QuoteSection";
import SectionHeading from "./components/SectionHeading";
import SerialKillers from "./components/SerialKillers";
import Testimonial from "./components/Testimonial";
import { categories, featuredMovies, filmStrip, quote, serialKillers, testimonials } from "./data";

const App = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug ?? "");

  const filteredMovies = useMemo(() => {
    if (!activeCategory) {
      return featuredMovies;
    }

    return featuredMovies.filter((movie) => movie.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <section className="px-6 pb-12">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <SectionHeading
              eyebrow="Case files"
              title="The haunting archive"
              description="Explore a rotating collection of unsettling classics, curated for curious minds and dark rooms."
            />
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setActiveCategory(category.slug)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category.slug
                      ? "border-red-500 bg-red-500/20 text-white"
                      : "border-white/10 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <HorizontalScroller>
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.title} {...movie} />
              ))}
            </HorizontalScroller>
          </div>
        </section>
        <section className="px-6 pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <SectionHeading
              eyebrow="Reflections"
              title="Field notes from the backroom"
              description="Personal accounts from those who keep the vaults open after midnight."
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {testimonials.map((entry) => (
                <Testimonial key={entry.name} {...entry} />
              ))}
            </div>
          </div>
        </section>
        <section className="px-6 pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <SectionHeading
              eyebrow="Deep dives"
              title="Unsolved mythologies"
              description="Investigate the stories that refuse to stay buried."
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {serialKillers.map((killer) => (
                <SerialKillers key={killer.name} {...killer} />
              ))}
            </div>
          </div>
        </section>
        <section className="px-6 pb-12">
          <div className="mx-auto w-full max-w-6xl">
            <SectionHeading
              eyebrow="The archive"
              title="Sealed evidence"
              description="Artifacts recovered from the lower levels of the Backroom vault."
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                {filmStrip.map((entry) => (
                  <FilmStrip key={entry.title} {...entry} />
                ))}
              </div>
              <div className="grid gap-6">
                {featuredMovies.slice(0, 2).map((movie) => (
                  <MovieCard key={movie.title} {...movie} />
                ))}
                <Card title="Curator's log" meta="Archive 09">
                  <p className="text-sm text-white/70">
                    We keep the lights low, the reels turning, and the stories catalogued. The Backroom is
                    less a place and more a pulse — a warning that the past is always listening.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 pb-16">
          <div className="mx-auto w-full max-w-6xl">
            <QuoteSection quote={quote} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;