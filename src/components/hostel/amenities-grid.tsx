'use client'

import { motion } from 'framer-motion'
import { 
  Wifi, 
  Utensils, 
  Droplet, 
  Wind, 
  Tv, 
  Car, 
  Zap,
  Coffee,
  Dumbbell,
  Sparkles,
  Home,
  type LucideIcon
} from 'lucide-react'

interface Amenity {
  name: string
  description?: string
  available: boolean
}

interface AmenitiesGridProps {
  amenities: Amenity[]
}

const getAmenityIcon = (name: string): LucideIcon => {
  const lowerName = name.toLowerCase()
  
  if (lowerName.includes('wifi') || lowerName.includes('internet')) return Wifi
  if (lowerName.includes('food') || lowerName.includes('meal') || lowerName.includes('kitchen')) return Utensils
  if (lowerName.includes('water') || lowerName.includes('geyser')) return Droplet
  if (lowerName.includes('ac') || lowerName.includes('air condition')) return Wind
  if (lowerName.includes('tv') || lowerName.includes('television')) return Tv
  if (lowerName.includes('parking') || lowerName.includes('vehicle')) return Car
  if (lowerName.includes('power') || lowerName.includes('backup') || lowerName.includes('electricity')) return Zap
  if (lowerName.includes('laundry') || lowerName.includes('washing')) return Sparkles
  if (lowerName.includes('gym') || lowerName.includes('fitness')) return Dumbbell
  if (lowerName.includes('common') || lowerName.includes('lounge')) return Coffee
  
  return Home
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  const availableAmenities = amenities.filter(a => a.available)

  if (availableAmenities.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="p-6 sm:p-8">
        <h3 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
          Amenities & <span className="text-brand-primary">Features</span>
        </h3>

        {/* Pill-based flex wrap layout */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {availableAmenities.map((amenity, idx) => {
            const Icon = getAmenityIcon(amenity.name)
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-gradient-to-r from-background to-muted/30 px-3 py-2 transition-all hover:border-brand-primary/50 hover:shadow-sm sm:px-4 sm:py-2.5"
                title={amenity.description}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary transition-all group-hover:bg-brand-primary group-hover:text-brand-white dark:bg-brand-primary-light/10 dark:text-brand-primary-light dark:group-hover:bg-brand-primary-light dark:group-hover:text-brand-dark sm:h-7 sm:w-7">
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <span className="whitespace-nowrap text-xs font-medium text-foreground sm:text-sm">
                  {amenity.name}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
