'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface AboutSectionProps {
  description: string
}

export function AboutSection({ description }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Show first 200 characters as preview
  const previewLength = 200
  const shouldTruncate = description.length > previewLength
  const displayText = isExpanded || !shouldTruncate 
    ? description 
    : description.slice(0, previewLength) + '...'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-6 overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
          About This <span className="text-brand-primary">Hostel</span>
        </h2>
        
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {displayText}
        </p>

        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary/80 dark:text-brand-primary-light dark:hover:text-brand-primary-light/80"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </motion.div>
  )
}
