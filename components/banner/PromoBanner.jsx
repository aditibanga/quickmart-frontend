export default function PromoBanner() {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-6">
      <div className="flex items-center justify-between rounded-2xl bg-blue-600 px-8 py-6 text-white">
        {/* Left text */}
        <div>
          <h3 className="text-xl font-semibold">
            GET ANYTHING DELIVERED TO YOUR DOOR
          </h3>
          <p className="mt-1 text-sm text-blue-100">
            Fresh food delivered in just minutes by our trusted delivery parteners!
          </p>
        </div>

        {/* Right visual (optional placeholder) */}
        <div className="hidden text-4xl md:block">
          
        </div>
      </div>
    </section>
  );
}
