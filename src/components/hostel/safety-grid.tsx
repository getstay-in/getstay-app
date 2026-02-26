'use client'

import { motion } from 'framer-motion'
import { Shield, CheckCircle2 } from 'lucide-react'

interface SafetyFeature {
  feature: string
  details?: string
  available: boolean
}

interface SafetyGridProps {
  safetyFeatures: SafetyFeature[]
}

export function SafetyGrid({ safetyFeatures }: SafetyGridProps) {
  const availableFeatures = safetyFeatures.filter(s => s.available)

  if (availableFeatures.length === 0) {
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
        <div className="mb-4 flex items-center gap-3 sm:mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:bg-green-400/10 dark:text-green-400 sm:h-12 sm:w-12">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold sm:text-2xl">
              Safety & <span className="text-green-600 dark:text-green-400">Security</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Your safety is our priority
            </p>
          </div>
        </div>

        {/* Pill-based flex wrap layout */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {availableFeatures.map((safety, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              whileHover={{ scale: 1.05 }}
              className="group inline-flex items-center gap-2 rounded-full border border-green-200/50 bg-gradient-to-r from-green-50/50 to-background px-3 py-2 transition-all hover:border-green-400/50 hover:shadow-sm dark:border-green-900/30 dark:from-green-950/20 sm:px-4 sm:py-2.5"
              title={safety.details}
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-600 dark:bg-green-400/20 dark:text-green-400 sm:h-6 sm:w-6">
                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <span className="whitespace-nowrap text-xs font-medium text-foreground sm:text-sm">
                {safety.feature}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
