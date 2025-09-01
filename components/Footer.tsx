import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-width section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CC</span>
              </div>
              <div>
                <div className="text-xl font-bold">Completely Coastal PTY</div>
                <div className="text-gray-400">Caribbean Beachfront Rentals</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience authentic Caribbean village life in our beachfront properties located in Costa Abajo de Colón, Panama. 
              Just 2.5 hours from Panama City, discover where comfort meets authentic rural charm.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="text-gray-300">
                📍 Costa Abajo de Colón, Panama
              </div>
              <div className="text-gray-300">
                🕒 2.5 hours from Panama City
              </div>
              <div className="text-gray-300">
                ⭐ Airbnb Superhost Status
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-300 hover:text-secondary-400 transition-colors">
                Home
              </Link>
              <Link href="/#about" className="text-gray-300 hover:text-secondary-400 transition-colors">
                About Us
              </Link>
              <Link href="/#property" className="text-gray-300 hover:text-secondary-400 transition-colors">
                Our Property
              </Link>
              <Link href="/gallery" className="text-gray-300 hover:text-secondary-400 transition-colors">
                Gallery
              </Link>
              <Link href="/dining" className="text-gray-300 hover:text-secondary-400 transition-colors">
                Local Dining
              </Link>
            </nav>
          </div>

          {/* Booking & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Book Your Stay</h4>
            <div className="space-y-4">
              <Link
                href="https://airbnb.com/h/completelycoastalgobea"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
              >
                Book on Airbnb
              </Link>
              <div className="text-sm text-gray-400">
                All bookings managed through Airbnb for secure payments and guest protection.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} Completely Coastal PTY. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-400">
                Powered by{' '}
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-400 hover:text-secondary-300 transition-colors"
                >
                  Cosmic
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}