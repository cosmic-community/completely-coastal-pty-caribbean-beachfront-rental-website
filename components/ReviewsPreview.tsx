import { getReviews } from '@/lib/cosmic'

function StarRating({ rating }: { rating: string }) {
  const numStars = parseInt(rating || '5')
  
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < numStars ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  )
}

export default async function ReviewsPreview() {
  const reviews = await getReviews()

  if (!reviews || reviews.length === 0) {
    return null
  }

  return (
    <section id="contact" className="section-padding bg-primary-900 text-white">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Guest Reviews
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Hear from our guests about their authentic Caribbean experience
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {reviews.slice(0, 2).map((review) => {
            const guestName = review.metadata?.guest_name || 'Anonymous Guest'
            const reviewText = review.metadata?.review_text || ''
            const rating = review.metadata?.rating?.key || '5'
            const date = review.metadata?.date || ''

            return (
              <div key={review.id} className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={rating} />
                  {date && (
                    <span className="text-primary-200 text-sm">
                      {new Date(date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </span>
                  )}
                </div>
                
                <blockquote className="text-lg text-primary-100 mb-4 italic">
                  "{reviewText}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {guestName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{guestName}</div>
                    <div className="text-primary-200 text-sm">Verified Airbnb Guest</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready for Your Caribbean Escape?
            </h3>
            <p className="text-primary-100 mb-6">
              Join our happy guests and experience authentic village life by the sea. 
              Book directly through Airbnb for secure payments and guest protection.
            </p>
            <a
              href="https://airbnb.com/h/completelycoastalgobea"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Book Your Stay Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}