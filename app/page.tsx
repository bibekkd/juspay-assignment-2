import React from 'react';
import { Layout } from '@/components/Layout';
import { ArrowRight, CheckCircle2, Zap, Shield, Globe } from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';

function App() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New features available now
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Build faster with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Intelligent Components
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-10">
            Nexus provides the building blocks for your next big project.
            Beautifully designed, expertly crafted, and ready to scale with your business needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
              Start Building Free
              <ArrowRight size={18} />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-gray-700 font-semibold border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Optimized for speed and performance. Your applications will load in milliseconds."
            />
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="Bank-grade security built-in from the ground up. Compliance made easy."
            />
            <FeatureCard
              icon={Globe}
              title="Global Scale"
              description="Deploy anywhere in the world with our distributed edge network infrastructure."
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default App;