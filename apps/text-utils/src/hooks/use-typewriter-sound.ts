"use client";
import { useCallback, useEffect, useRef } from 'react'

// Short mechanical click sound (Base64)
const CLICK_SOUND = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=' // Placeholder, will replace with better one below

// A slightly better "click" sound (short noise burst)
// This is a very short buffer, might need a real sample. 
// For now, let's use a simple oscillator approach if we can't get a good base64, 
// but the requirement was "sound". 
// Let's try to generate a beep with Web Audio API instead of a file, it's more reliable than a potentially broken base64 string without external access.
// Actually, the user asked for "sound", a mechanical click is best.
// I will use a Web Audio API oscillator to generate a short "click/thud" which sounds like a typewriter.

export function useTypewriterSound(enabled: boolean = true) {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  const playSound = useCallback((type: 'type' | 'delete' = 'type') => {
    if (!enabled || !audioContextRef.current) return

    const ctx = audioContextRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    const now = ctx.currentTime

    if (type === 'delete') {
      // Delete sound: Lower pitch, slightly longer, "thud/slide" feel
      osc.type = 'sine' // Sine wave for a duller sound
      osc.frequency.setValueAtTime(100, now)
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.15)

      gainNode.gain.setValueAtTime(0.15, now)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15)

      osc.start(now)
      osc.stop(now + 0.15)
    } else {
      // Type sound: Sharper, "click" feel
      osc.type = 'square' // Square wave for mechanical click
      osc.frequency.setValueAtTime(200, now) // Slightly higher start
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.06) // Faster decay

      gainNode.gain.setValueAtTime(0.08, now)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.06)

      osc.start(now)
      osc.stop(now + 0.06)
    }
  }, [enabled])

  return playSound
}
