# 🌌 "Tum Jo Aaye" — Story-Driven 2D Motion Graphics Music Video

A cinematic, story-driven 2D animated music video for the Hindi song **"Tum Jo Aaye (Zindagi Mein)"**.
The experience tells a continuous visual narrative of transformation through two recurring minimalist silhouettes, synchronized deterministically with the original audio.

---

## 🎭 The Visual Narrative

The film follows two consistent 2D silhouettes across 10 scenes, visually expressing how life changes from loneliness and dullness into warmth, light, and vibrant color:

1. **Scene 1: Discovery (0:00 – 14.2s)**
   A solitary silhouette stands in a quiet, muted, desaturated landscape. At 2.5s (*"Paaya maine..."*), a golden light sparks on the horizon, travels through the hills, and reveals the second silhouette. As they approach, blooming flowers and glowing footsteps trail in their wake, establishing their shared path.
2. **Scene 2: Life Changes (14.2s – 29.0s)**
   The couple meets and joins hands. A broken, cracked stone road fuses into a continuous radiant golden path. Warm pink, lavender, and gold ripples wash over the hills, and a distant cottage lights up. In the second refrain, their joined silhouettes cast long, beautiful shadows with radiant light spreading outward across the world.
3. **Scene 3: A Private World (29.0s – 42.5s)**
   Walking hand-in-hand through an intimate secret garden. Foreground wildflowers, grass, and willow fronds drift past the camera with multiplane parallax depth. Glowing star particles lift from the garden and assemble into a celestial constellation dome above them.
4. **Scene 4: Transformation (42.5s – 58.0s)**
   The couple crosses a river on an arched stone bridge that illuminates stone-by-stone beneath their footsteps. The river transforms from dull grey into sparkling turquoise and gold. On the circular terrace, they transition into an elegant rotating circular dance while petals and scenery waltz in harmonic parallax.
5. **Scene 5: Dreams & Precious Days (58.0s – 79.0s)**
   Four iridescent dream bubbles float around the couple, each displaying a miniature animated memory (walking under swaying autumn trees with falling leaves, watching a golden sunset, gazing at crescent stars, and sitting by a reflective river). The sky shifts from a golden daytime sun to a silver moonlit night, returning to sunrise as the bubbles converge.
6. **Scene 6: Instrumental Interlude (79.0s – 93.0s)**
   *Zero lyrics during the instrumental vocal alaap.* The camera expands into a vast cosmic scale where the couple stands on a floating starlit knoll surrounded by sweeping ribbons of golden light, rotating orbital rings, and orbiting star clusters.
7. **Scene 7: From Dullness to Joy (93.0s – 109.0s)**
   *Narrative Return:* The camera returns to the exact hill landscape from Scene 1, but now both walk together. The wilted, drooping flowers stand tall and bloom into rich pink and gold, the dry riverbed fills with flowing turquoise water, and distant grey buildings glow with warm amber windows.
8. **Scene 8: Happiness & Destiny (109.0s – 123.0s)**
   A glowing floral portal/doorway stands atop the knoll. The couple walks towards and through it. Two separate glowing light trails (one pink, one gold) weave from opposite sides of the distant hills and converge into one unified destiny path at their feet.
9. **Scene 9: Shared Future (123.0s – 144.0s)**
   The dream bubbles merge into a grand rising sunrise on the horizon where the sun and silver moon rest in harmony. The couple walks along the winding golden path directly toward the radiant dawn as the composition gently simplifies.
10. **Scene 10: Resolution (144.0s – 153.5s)**
    The visual narrative completes its full circle by settling into the opening landscape framing, now completely transformed: blooming flowers, glowing fireflies, warm golden aura, and the couple standing together beneath their constellation. Stardust settles peacefully as the song finishes.

---

## 🛠️ Technology & Architecture

- **Stack**: Pure vanilla JavaScript + Vite + HTML5 Canvas + modern CSS.
- **Single Source of Truth**: `audio.currentTime` drives all scene selection, animation progression, and lyric matching. Seeking, pausing, and replaying deterministically restore the exact visual frame.
- **Original Audio**: `public/assets/song.mp3` is the sole, complete soundtrack.
- **Original Hindi Lyrics**: Displayed from `public/assets/lyrics.json` without translations, subtitles, or added captions. Instrumental breaks display no lyrics.
- **Minimal UI**: A single "Start" button on the opening screen (fulfilling browser autoplay interaction requirements), plus an unobtrusive glassmorphic HUD (Play/Pause, time, scrubber, mute, replay) that auto-hides during viewing.

---

## 🚀 Running Locally & Preview

```bash
# 1. Start the local Vite server
npm run dev
```
Open **`http://localhost:3000`** in any browser.

```bash
# 2. Build for production (GitHub Pages ready)
npm run build
```
Generates the fully optimized static bundle in `dist/`.

---

## 📂 File Structure

```text
motion_video/
├── public/
│   └── assets/
│       ├── lyrics.json       # Original Hindi lyrics with exact timestamps
│       ├── song.mp3          # Original soundtrack ("Tum Jo Aaye")
│       └── songLyrics.txt    # Timestamped lyric reference
├── src/
│   ├── character.js          # Parametric 2D vector silhouette character system
│   ├── audio.js              # HTML5 Audio controller & seek manager
│   ├── config.js             # Core audio & color palette settings
│   ├── main.js               # Application loop & HUD controls
│   ├── particles.js          # Particle engine (stars, petals, fireflies, sparks)
│   ├── scenes.js             # 10 story-driven visual scene implementations
│   ├── styles.css            # Responsive styles & typography
│   └── timeline.js           # Audio-driven timeline engine & scene boundaries
├── index.html                # Entry point
├── package.json              # Scripts & dependencies
└── vite.config.js            # Relative base path for GitHub Pages
```
