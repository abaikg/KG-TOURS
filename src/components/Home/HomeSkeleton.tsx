// components/Home/HomeSkeleton.tsx
export function HomeSkeleton() {
  return (
    <section className="container-x py-12 space-y-12">

      {/* Hero */}
      <div className="space-y-4">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text w-4/5" />
      </div>

      {/* Tours */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="nature-card p-4 space-y-4">
            <div className="skeleton h-40 rounded-xl" />
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text w-5/6" />
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="nature-card p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="skeleton skeleton-avatar" />
              <div className="skeleton skeleton-text w-1/3" />
            </div>
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text w-4/5" />
          </div>
        ))}
      </div>

    </section>
  );
}
