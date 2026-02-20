import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-background py-8">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-brand-primary p-12 aspect-[5/2]">
          {/* Background pattern overlay */}
          <div className="inset-0">
            <Image
              src="/banners/BANNER1.png"
              alt="Explore Hostels in Bhopal"
              fill
              className="object-cover opacity-100"
              priority
            />
          </div>
          
          {/* Content overlay */}
          
        </div>
      </div>
    </section>
  );
}
