import React from 'react';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export default function LandingPage({ onEnterDashboard }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="relative px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-xl text-slate-900">TWAIN Cert Platform</div>
              <div className="text-sm text-slate-500 hidden sm:block">Professional Scanner Certification</div>
            </div>
          </div>
          <button
            onClick={onEnterDashboard}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
          >
            Access Console
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Professional
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> TWAIN</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Certification Platform</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline scanner certification testing with AI-powered analysis, human-in-the-loop reviews, 
              and comprehensive device management across multiple testing laboratories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onEnterDashboard}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Launch Reviewer Console
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-all duration-200 text-lg font-medium">
                View Documentation
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon="📊"
              title="Real-time Analytics"
              description="Monitor certification runs with live KPIs, trend analysis, and performance metrics across all testing labs."
            />
            <FeatureCard
              icon="✅"
              title="HITL Review System"
              description="Intelligent human-in-the-loop reviews with CI-based filtering and 8% random sampling for quality assurance."
            />
            <FeatureCard
              icon="🤖"
              title="AI-Powered Analysis"
              description="Automated report generation with vision processing, confidence scoring, and pattern recognition."
            />
            <FeatureCard
              icon="🔒"
              title="Security Validation"
              description="Comprehensive security checks including TLS verification, cipher suite validation, and PII detection."
            />
            <FeatureCard
              icon="🖨️"
              title="Multi-Lab Management"
              description="Manage devices across Pensacola, Tokyo, Zurich labs with real-time status monitoring."
            />
            <FeatureCard
              icon="📱"
              title="Mobile Responsive"
              description="Access the full console experience on any device with optimized mobile and tablet interfaces."
            />
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard number="248" label="Runs This Week" trend="+6%" />
              <StatCard number="93%" label="Overall Pass Rate" trend="+2%" />
              <StatCard number="0.88" label="Average CI Score" trend="+0.03" />
              <StatCard number="28%" label="HITL Review Rate" trend="-1%" />
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg sm:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join certification labs worldwide using the TWAIN Cert Platform for efficient, 
              accurate, and standardized scanner testing.
            </p>
            <button
              onClick={onEnterDashboard}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-slate-50 transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Access Reviewer Console
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-bold text-lg text-slate-900">TWAIN Cert Platform</div>
              </div>
              <p className="text-slate-600 mb-4 max-w-md">
                Professional scanner certification platform with AI-powered analysis and comprehensive device management.
              </p>
              <div className="text-sm text-slate-500">
                © 2025 TWAIN Cert Platform. Built with React + TypeScript + Tailwind CSS.
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Device Management</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Test Catalog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ number, label, trend }: { number: string; label: string; trend: string }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{number}</div>
      <div className="text-sm text-slate-500 mb-2">{label}</div>
      <div className={`text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-slate-500'}`}>
        {trend}
      </div>
    </div>
  );
}