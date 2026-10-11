interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  unit: string;
  image?: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets?: Market[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function extractProducts(result: unknown): Product[] {
  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (result && typeof result === "object") {
    const data = result as {
      products?: unknown;
      data?: unknown;
    };

    if (Array.isArray(data.products)) {
      return data.products as Product[];
    }

    if (Array.isArray(data.data)) {
      return data.data as Product[];
    }

    if (
      data.data &&
      typeof data.data === "object" &&
      Array.isArray(
        (data.data as { products?: unknown }).products
      )
    ) {
      return (
        data.data as { products: Product[] }
      ).products;
    }
  }

  return [];
}

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি।");
  }

  const result: unknown = await res.json();
  const products = extractProducts(result);

  const product = products.find(
    (item) =>
      String(item.slug) === slug ||
      String(item.id) === slug
  );

  if (!product) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl bg-[#f1f6f2] px-4 py-12">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h1 className="text-xl font-bold text-gray-800">
            পণ্যটি পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            পণ্যের slug অথবা API response যাচাই করুন।
          </p>

          <a
            href="/"
            className="mt-5 inline-block font-semibold text-green-700 hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8">
      <article className="mx-auto max-w-4xl">
        <a
          href="/"
          className="mb-5 inline-block text-sm text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </a>

        <section className="rounded-2xl border border-[#e0e8e1] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row">
            {product.image && (
              <img
                src={product.image}
                alt={product.nameBn}
                className="h-44 w-full rounded-xl object-contain sm:w-52"
              />
            )}

            <div className="flex-1">
              <p className="text-sm text-gray-500">
                {product.categoryIcon ?? "🛒"}{" "}
                {product.categoryNameBn || product.category}
              </p>

              <h1 className="mt-2 text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                একক: {product.unit}
              </p>

              <p className="mt-5 text-sm text-gray-500">
                আজকের বাজারদর
              </p>

              <p className="text-3xl font-bold text-green-700">
                ৳{product.today}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                গতকাল: ৳{product.yesterday}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                গত সপ্তাহ: ৳{product.lastWeek}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                গত মাস: ৳{product.lastMonth}
              </p>

              <p
                className={`mt-3 text-sm font-semibold ${
                  product.change?.dir === "down"
                    ? "text-green-700"
                    : product.change?.dir === "up"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {product.change?.dir === "down"
                  ? "▼ দাম কমেছে"
                  : product.change?.dir === "up"
                    ? "▲ দাম বেড়েছে"
                    : "— দাম অপরিবর্তিত"}{" "}
                ({product.change?.pct ?? 0}%)
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e0e8e1] bg-white p-5 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            বাজারভিত্তিক দাম
          </h2>

          {!product.markets?.length ? (
            <p className="mt-4 text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক দামের তথ্য API-তে পাওয়া যায়নি।
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {product.markets.map((market, index) => (
                <div
                  key={`${market.market}-${market.division}-${index}`}
                  className="rounded-lg border border-gray-100 p-4"
                >
                  <h3 className="font-semibold text-gray-800">
                    {market.market}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {market.division}
                  </p>

                  <p className="mt-2 text-sm font-medium text-green-700">
                    ৳{market.min} – ৳{market.max}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </main>
  );
}



