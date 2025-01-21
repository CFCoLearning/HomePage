export default function Demo() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Online store"
            description="Sell anything. Upload your content and leave the hosting, checkout, and delivery to us."
            className="bg-primary-blue"
          />
          <FeatureCard
            title="Website"
            description="Build a beautiful website in less than 10 minutes with professionally designed templates."
            className="bg-primary-orange"
          />
          <FeatureCard
            title="Email marketing"
            description="Beautiful email marketing that works perfectly with your online store and website."
            className="bg-primary-purple"
          />
        </div>
      </section>
    </main>
  );
}

function Navbar() {
  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">Logo</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Website
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Email
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Online store
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Switch to Platform
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Pricing
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Login
            </a>
            <a
              href="#"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Sign up free
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* 装饰性元素 */}
      <div className="absolute left-10 top-10 w-20 h-20 rounded-full bg-primary-orange opacity-50" />
      <div className="absolute right-20 top-20 w-16 h-16 transform rotate-45 bg-primary-blue opacity-50" />
      <div className="absolute right-40 bottom-20 w-24 h-24 rounded-full bg-primary-purple opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-8">
          The all-in-one for teams of one
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Join 150,000+ solo business owners who use our platform to run their
          website, online store, and email marketing
        </p>
        <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors">
          Start your free trial
        </button>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ title, description, className }: FeatureCardProps) {
  return (
    <div
      className={`rounded-2xl p-8 transition-transform hover:-translate-y-1 ${className}`}
    >
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        {title} <span className="ml-1">›</span>
      </h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
