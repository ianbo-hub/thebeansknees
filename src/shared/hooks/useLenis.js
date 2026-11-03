import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initialises Lenis smooth scroll and integrates it with GSAP ScrollTrigger.
 * Must be called once at the app root level.
 *
 * Pattern:
 *   lenis.on('scroll', ScrollTrigger.update) — keeps ST positions in sync
 *   gsap.ticker.add((t) => lenis.raf(t * 1000)) — drives Lenis from GSAP RAF
 *   gsap.ticker.lagSmoothing(0) — prevents GSAP from clamping the delta
 */
export function useLenis() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      lerp:        0.08,
      smoothWheel: true,
      syncTouch:   false, // native scroll on touch; only smooth on desktop
    })

    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
    }
  }, [])
}
