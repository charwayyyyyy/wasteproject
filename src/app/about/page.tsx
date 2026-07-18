import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Design Process & Philosophy</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">The Core Problem</h2>
          <p className="text-muted-foreground mb-4">
            The problem is not simply that people do not care about waste disposal. The core problem is that the waste-management system does not give households and small businesses a reliable, convenient, visible, or rewarding way to dispose of waste responsibly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Point of View (POV)</h2>
          <div className="bg-muted p-6 rounded-lg border-l-4 border-primary">
            <p className="text-lg italic font-medium">
              &quot;A household or small business in an underserved community needs a reliable, convenient, and visible way to dispose of waste because they may want to act responsibly, but irregular collection and unclear disposal options make improper dumping the easiest available choice.&quot;
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">How Might We (HMW)</h2>
          <div className="bg-muted p-6 rounded-lg border-l-4 border-primary">
            <p className="text-lg italic font-medium">
              &quot;How might we make responsible waste disposal easier, more reliable, and more rewarding for households and small businesses while helping collectors and community authorities coordinate services more effectively?&quot;
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Why EcoLoop?</h2>
          <p className="text-muted-foreground mb-4">
            EcoLoop was built as an honest, practical response to this challenge. Instead of an over-engineered smart city platform, we focused on building a community coordination tool that connects the people who generate waste with the people who collect it, overseen by the people who manage the community.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">What We Improved After Testing</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Simplified the Request Form:</strong> Early testing showed users abandoned the form if asked for too many details. We reduced it to waste type, quantity, and location.</li>
            <li><strong>Added Collector Map Fallbacks:</strong> Recognizing that map loading can be slow, we ensured all collector views work perfectly as text lists.</li>
            <li><strong>Clarified Status Language:</strong> Changed technical statuses to human-readable explanations like &quot;A collector has accepted your request.&quot;</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
