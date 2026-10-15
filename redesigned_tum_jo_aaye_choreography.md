# Tum Jo Aaye — Redesigned Kinetic-Graphics Choreography

**Source of truth:** the supplied `lyrics(1).json`. Keep each lyric block's `start`, `end`, and `text` exactly as supplied. The sequence below has 28 timestamped choreography beats; consecutive beats can feel like one continuous visual world, but text timing must remain data-driven.

## Creative direction

Make the lyrics feel like living objects in a compact, illustrated dream-theatre—not subtitles placed over scenery. Devanagari words should stretch, fold, rotate, collide, join, bloom, float, and transform in ways that express their meaning. The two recurring characters are simple, expressive silhouettes with readable body poses; usually keep them around **20–25% of the frame height**. Important words and metaphorical objects should often be much larger than the characters and occupy **35–70% of the frame** when they take focus.

The tone is romantic, whimsical, and emotionally legible. It can breathe during the alaap, but even calm stretches should keep evolving through slow shape transformations, shifting reflections, drifting ribbons, and changing composition. Avoid long static wallpaper shots, generic starfield filler, tiny characters throughout, and particle effects that do not relate to the lyric. No lip-sync is needed.

### Visual grammar
- **Finding / meeting:** two separate shapes or paths snap into alignment.
- **Music / melody:** letters become strings, curved ribbons, resonant rings, or waves that visibly travel through the world.
- **Hiding / intimacy:** a word folds into a leaf, curtain, cocoon, or shelter around the couple.
- **Dreaming:** words inflate into bubbles or portals containing tiny moving vignettes.
- **Life changing / “baat ban gayi”:** scattered shapes click into a coherent composition; a strong color or shape wave spreads through the scene.
- **Love becoming identity:** repeated letterforms orbit, interlock, and settle into one shared symbol or shadow. Keep this abstract and poetic, not tied to a literal religious icon.
- **Gold / silver:** typography changes material and lighting between warm gold and cool silver; sun and moon forms can emerge from the letter shapes.
- **Joy / newness:** bouncing, elastic movement and fast transformations, with an expanding view of a newly changed world.
- **Fate / togetherness:** two independent threads meet, braid, and continue as one path.

### Typography rules
- Use the exact Hindi text from the JSON. Do not paraphrase it, add translations, add titles, or add a birthday message.
- Animate meaningful word groups, not individual Devanagari glyph fragments. Never split a grapheme/Matra while animating; keep the word as one text object.
- Treat text as a foreground object, environmental structure, or moving path—not as a fixed bottom subtitle. Preserve enough contrast and spacing to read it.
- Word-level choreography inside each block is **relative to that block** because the supplied file timestamps whole lyric blocks, not individual words. The block's exact start/end are authoritative; distribute internal motion proportionally and let the music's amplitude/onsets add gentle emphasis without shifting the supplied boundaries.
- The JSON's `आलाप...` entry is a non-verbal vocal cue. Use its timestamp for the instrumental visuals; don't display the word “आलाप...” as on-screen text unless that was intentionally meant to be visible.
- Use `audio.currentTime` as the master clock for scene state, text entry/exit, and animation progress. Do not build this around chained `setTimeout` calls, so pausing, seeking, and replay remain synchronized.

## Timestamped choreography — all 28 supplied blocks

### 01 — 00.5–03.0 | Finding and destiny
**Lyric:** `पाया मैंने, पाया तुम्हें, रब ने मिलाया तुम्हें`

Open on a deep ink-blue world with two small distant lights separated by a broad empty gap. `पाया` arrives large, drops into the scene like a soft magnetic weight, and sends a circular ripple across the hill. The ripple reveals Character 1 reaching toward a glowing point. On `रब ने मिलाया तुम्हें`, two thin golden paths draw themselves from opposite sides and meet at the glowing point; a falling star traces their joining motion. Keep the beat graceful but make the word arrival clear and satisfying. End with the connected point pulsing once.

### 02 — 03.0–05.5 | A person becomes a melody
**Lyric:** `होंठों पे सजाया तुम्हें, नग़मे सा गाया तुम्हें`

The joined point opens like a flower. The lyric sweeps in on a curved baseline; the word group around `नग़मे` ripples like a plucked string. Letters stretch into three oversized musical ribbons that loop around the glowing form and briefly sketch the outline of Character 2. Ribbons should travel across the frame and visibly affect the text, rather than merely drift in the background. Finish with one ribbon curling into a halo that carries into the next beat.

### 03 — 05.8–08.5 | A secret is sheltered
**Lyric:** `पाया मैंने, पाया तुम्हें, सब से छुपाया तुम्हें`

The halo folds down into an oversized leaf/curtain shape. On `छुपाया`, the word bends into a protective canopy that closes around the couple; the outer world dims but remains visibly active beyond it. Let one small gap open in the canopy for a playful glimpse of the two silhouettes inside, then close gently. The meaning is protection and intimacy, not fear or imprisonment.

### 04 — 08.5–11.5 | A dream takes shape
**Lyric:** `सपना बनाया तुम्हें, नींदों में बुलाया तुम्हें`

The canopy softens and inflates into a giant translucent dream bubble. `सपना` curves along its rim; inside, Character 2 appears as a miniature moving figure in a tiny floating garden. Character 1 reclines on a curved typography-formed cushion while `नींदों` sinks slowly like a hammock. The bubble bobs and grows, then drifts toward the center, ready to burst into the meeting scene.

### 05 — 11.5–16.5 | Arrival changes everything
**Lyric:** `तुम जो आये ज़िन्दगी में बात बन गयी`

On `तुम`, the dream bubble springs open and Character 2 steps through the word as if it were a doorway. The characters approach; on `ज़िन्दगी`, a large accordion-like ribbon unfurls behind them, revealing color layer by layer. On `बात बन गयी`, scattered letter-shaped pieces, flowers, and hill contours snap into alignment around the couple. A broad color wave sweeps across most of the frame, with small elastic rebounds as each element locks into place. This is the first large payoff: a visible before/after transformation, not just a glow.

### 06 — 16.8–22.0 | Love becomes identity
**Lyric:** `इश्क़ मजहब, इश्क़ मेरी ज़ात बन गयी`

The word `इश्क़` appears twice at different scales; each instance launches a graceful orbit of curved letterforms around the couple. The orbits gradually interlock into one large, intricate but abstract rosette. On `मेरी ज़ात`, their two separate shadows slide together and become one clean shared silhouette shape. Give the orbit enough momentum to feel alive, then settle the completed shape around the pair at the end. Avoid a static religious symbol; the visual is devotion and identity expressed through joining forms.

### 07 — 22.5–25.8 | Finding, revisited with certainty
**Lyric:** `पाया मैंने, पाया तुम्हें, रब ने मिलाया तुम्हें`

Return to the falling-star motif, now brighter and more confident. `पाया` lands like a soft bouncing ball between the pair; the characters each reach for it from opposite sides. On `मिलाया`, their curved paths snap together and become a golden trail beneath their feet. Use quicker, more rhythmic motion than beat 01 to signal the repeated lyric has changed because the couple are now together.

### 08 — 26.0–28.5 | Melody becomes a shared path
**Lyric:** `होंठों पे सजाया तुम्हें, नग़मे सा गाया तुम्हें`

The golden trail lifts into a thick, flowing sound ribbon. As the lyric moves, the ribbon bends around the word shapes like a musical staff; three large waves pass through it on successive musical accents. The couple ride the wave for a brief beat, their silhouettes bouncing subtly with its crest. The ribbon folds down into a soft canopy to set up the next line.

### 09 — 28.8–31.0 | Their private world
**Lyric:** `पाया मैंने, पाया तुम्हें, सब से छुपाया तुम्हें`

The sound ribbon folds like origami into a large flower bud around the couple. On `छुपाया`, outer petals close and the background briefly becomes a simplified two-tone world. Inside, warm light reveals the couple exchanging a small glance; then one petal opens again as if the flower itself is curious. Keep the movement legible and quick; the same metaphor is revisited in a new form rather than replayed exactly.

### 10 — 31.0–34.5 | Dreaming together
**Lyric:** `सपना बनाया तुम्हें, नींदों में बुलाया तुम्हें`

The flower bud lifts off and becomes a transparent dream lantern. Two tiny silhouettes dance inside it as the large word `सपना` curves around the lantern like a ring. The bubble makes a gentle figure-eight path through the scene, leaving a fading trail of tiny stars. On the last part of the line, it descends between the couple and pops open into a shower of petals that continues into the refrain.

### 11 — 35.0–39.0 | Everything clicks into place
**Lyric:** `तुम जो आये ज़िन्दगी में बात बन गयी`

The couple step out of the flower canopy as the petals gather into a large, loose spiral. The word `तुम` enters as two oversized rounded forms; when the characters meet, the forms click together like interlocking pieces. `बात बन गयी` travels across the screen in a fast, elastic sweep, and the spiral resolves into a cherry-blossom tree whose branches visibly assemble from the moving letter strokes. Petals burst outward, then follow a curved path instead of becoming random confetti.

### 12 — 40.5–44.0 | A shared identity
**Lyric:** `इश्क़ मजहब, इश्क़ मेरी ज़ात बन गयी`

Use the blossoms from the previous scene as orbiting elements. Each `इश्क़` produces a large curved orbit—one of gold sparks, one of pink petals. The two orbits intersect and interlock around the couple; on `ज़ात`, the orbit lines compress into a single shared emblem beneath their feet. Finish by releasing the petals upward as a bridge into the dream sequence.

### 13 — 45.5–54.5 | Many dreams, one love
**Lyric:** `सपने तेरी चाहतों के देखता हूँ अब कई`

The couple lie side by side near the bottom of the frame, but keep their silhouettes large enough to read. On `सपने`, one huge word opens into multiple rounded portals that populate the sky in an intentional sequence. Each portal contains a tiny, distinct moving memory: two figures under rain that turns to glitter; a little house whose window lights up; a boat gliding across a curved line of water; a pair walking as oversized autumn leaves spiral around them. The portals should pop, expand, tilt, and drift into a loose constellation—not sit as four static cards. On `कई`, several portals multiply briefly, then flow toward a shared horizon.

### 14 — 54.5–60.0 | Gold day becomes silver night
**Lyric:** `दिन है सोना और चाँदी रात बन गयी`

A broad vertical sweep divides the world into warm gold and cool silver. A giant golden sun grows out of the `सोना` word shape; the silver crescent moon curves out of `चाँदी`. The couple move in parallel on both sides, then walk toward the divider as the gold and silver typography slides across and interweaves. On `रात बन गयी`, the split melts into a single twilight palette with sun and moon both visible. The merge should be easy to read and visually satisfying.

### 15 — 60.5–65.0 | The refrain becomes a kinetic orbit
**Lyric:** `तुम जो आये ज़िन्दगी में बात बन गयी`

Bring the couple back to the center. The word `तुम` arcs around them like a rotating ring; `ज़िन्दगी` unfurls into a ribbon road below their feet. As `बात बन गयी` arrives, small objects from prior scenes—one petal, a dream-window outline, a star, a ribbon—snap onto the road and become a coherent miniature landscape. Use faster rotations and a clear resolution on the final word.

### 16 — 65.5–77.0 | Alaap: weightless visual breathing
**Cue:** Non-verbal vocal alaap; no lyric text should be displayed.

Let the objects from the previous beat rise from the road and become a small constellation of flowing shapes. The couple float through an open, deep-blue space while two broad light ribbons make slow, continuous loops around them. Reflections and color gradients drift gently, but the composition must keep changing: ribbons cross, make a large loop, briefly form a heart-like negative space without becoming a literal icon, and open back out. Near the end, the loop widens into a liquid wave that sweeps down into the next landscape. This is the calmest passage, not a static starfield.

### 17 — 77.0–87.0 | Dull turns sweet
**Lyric:** `तेरे बिना फीकी सी थी मेरी ज़िंदगानी ये, तेरे संग मीठी हो गयी`

The wave drains the color from the frame, leaving a flat grey world and a character alone. The phrase around `फीकी` appears pale and slightly deflated, with letters spaced apart and sinking toward the ground. Character 2 walks in carrying a warm ribbon; where the ribbon passes, grey shapes regain color like watercolor spreading on paper. On `मीठी हो गयी`, the text swells into rounded, glossy shapes and melts into a richly colored landscape. Avoid literal candy-store imagery; make “sweet” a transformation in texture, motion, and color. Let the last color ripples carry through the 87.0–88.5 gap without text.

### 18 — 88.5–99.0 | Joy is something they can catch
**Lyric:** `आता-जाता खुशियों के मैं गले लग जाता हूँ, दुनिया भी लगती है नयी`

Large glowing shapes representing passing moments of happiness bounce into frame from different directions. The couple run and reach for them; each catch turns into a brief embrace or a linked hand gesture, sending a new wave through the world. On `दुनिया भी लगती है नयी`, the camera pulls back as the landscape reshapes in layers: hills fold into rolling green forms, a ribbon becomes a river, abstract trees unfold, and birds sweep across the sky. This is the most energetic physical sequence so far, with elastic landings and a broad reveal. Keep the motions coordinated with the lyric progression, not random bouncing.

### 19 — 100.0–108.0 | The heart's doorway lights up
**Lyric:** `रौनकें हैं दिल के दर पे, धड़कनें हैं सुरमयी`

The river bends upward and draws an oversized archway in the center of the frame. The arch is assembled from curved strokes of the lyric; flowers and lantern-like forms appear along its edges as the strokes pass. On `धड़कनें`, the arch pulses in a readable double-beat: bright, settle, bright, settle. Each pulse sends a curved ring across the ground and lifts a lantern upward. The couple walk toward it while the arch keeps building itself.

### 20 — 108.2–114.0 | Two destinies braid together
**Lyric:** `मेरी क़िस्मत भी तुम्हारे साथ बन गयी`

Two thick, glowing threads sweep in from opposite sides of the frame—one gold, one pink. They travel through the landscape in different curves, briefly tracing the letter shapes of `क़िस्मत`, then converge under the couple. The threads braid together on `तुम्हारे साथ` and rise through the archway as a single flowing path. On `बन गयी`, the path branches into a bright constellation above them. Keep the threads as prominent moving objects, not fine lines lost in the background.

### 21 — 114.5–120.5 | The world locks into place again
**Lyric:** `तुम जो आये ज़िन्दगी में बात बन गयी`

The constellation descends and becomes several large geometric pieces suspended around the couple. Each piece rotates and clicks into place as the words arrive. The characters move toward one another; when their hands meet, the pieces form a giant open circular frame around them. A controlled color wave travels through the frame and spreads over the landscape. This reprises the earlier “arrival” moment at a more confident, complete scale.

### 22 — 120.5–128.0 | Dream portals return, now connected
**Lyric:** `सपने तेरी चाहतों के देखता हूँ अब कई`

The circular frame releases a cluster of dream portals. Bring back the rain, house, boat, and autumn-leaf memories, but make the portals move on linked curved paths so they feel like one connected dream rather than separate cards. The couple gesture toward each portal; their movements cause each one to respond—rain arcs into a ribbon, the house window emits a ring, the boat leaves a glowing wake, and autumn leaves follow the couple's hand. On `कई`, the portals multiply into a wide archipelago of floating windows, then orbit as a single group.

### 23 — 128.0–134.0 | Gold and silver return, transformed
**Lyric:** `दिन है सोना और चाँदी रात बन गयी`

The orbiting portals flatten into a gold sun disc and a silver moon crescent. They circle around each other, sweeping gold and silver light across the couple and the landscape. The words travel on opposite curves—gold-toned for `सोना`, silver-toned for `चाँदी`—then cross and mix into a peach-lavender twilight on `रात बन गयी`. Rather than replaying the previous split-screen exactly, make the celestial forms dance around each other in one continuous composition.

### 24 — 134.0–139.5 | Refrain: a moving world around them
**Lyric:** `तुम जो आये ज़िन्दगी में बात बन गयी`

A large ring made from the earlier lyric shapes spins around the couple like a kinetic stage. The landscape scrolls under their feet while they stay clearly readable at medium scale. On `ज़िन्दगी`, the ring stretches into a path; on `बात बन गयी`, the path folds into a single clean loop surrounding them. The sun and moon settle into the upper corners, and the constellation begins to form in the background for the final verse.

### 25 — 140.0–142.5 | Finding, final reprise
**Lyric:** `पाया मैंने, पाया तुम्हें, रब ने मिलाया तुम्हें`

In a quick visual callback, the original falling star crosses the frame and divides into two streaks that converge above the couple. `पाया` lands with a soft bounce; `मिलाया` pulls the two streaks together into the completed constellation. Use recognisable shapes from the opening, but brighter and more assured. This is a brief punctuation beat, so avoid adding a new location.

### 26 — 142.8–145.0 | The world sings
**Lyric:** `होंठों पे सजाया तुम्हें, नग़मे सा गाया तुम्हें`

The constellation flows downward as two broad musical ribbons. They curve through the lyric, loop around the couple, and briefly wrap them in a moving frame. The final ribbon trail becomes the edge of a flower-shaped shelter. This should feel like one quick, musical flourish, not a miniature version of the earlier long melody scene.

### 27 — 145.0–148.5 | The secret is safe
**Lyric:** `पाया मैंने, पाया तुम्हें, सब से छुपाया तुम्हें`

The flower shelter closes around the pair like a petal cocoon. On `छुपाया`, the outside world simplifies to a dark, quiet silhouette while the inside glows warmly. Let one petal remain open as a small window to the constellation. At 148.2 seconds, begin the next lyric's dream-bubble transition while this line finishes; the supplied timestamps overlap by 0.3 seconds, so use a controlled crossfade/morph rather than moving or “fixing” either timestamp.

### 28 — 148.2–152.5 | Dream made whole; close the circle
**Lyric:** `सपना बनाया तुम्हें, नींदों में बुलाया तुम्हें`

The remaining petals lift and transform into the dream bubble from the opening sequence, now containing both silhouettes. The bubble drifts upward, grows large enough to hold a miniature version of the flower-filled world, then slowly becomes the completed constellation. The couple remain together in the opening hill composition—now warm, colorful, and alive. Begin easing the motion down after 151 seconds; the visual should resolve by 152.5 seconds. From 152.5–153.5 seconds, with no lyric text, fade the constellation and scene to warm darkness in time with the audio tail. No end card and no extra text.

## Timing / implementation contract

1. Keep the JSON's 28 `start`, `end`, and `text` values unchanged. Do not replace them with old-script timestamps.
2. Use exact block boundaries for text entry and exit. Any crossfade should happen within the supplied ranges; never silently shift a boundary to fit a guessed beat.
3. Keep visible typography readable and integrated into the action. Don't show two full lyric lines in a fixed subtitle stack. During the 148.2–148.5 overlap, morph/crossfade the outgoing and incoming word groups deliberately.
4. Gaps in the lyric schedule are visual transition windows, not dead air: continue the current motion or resolve it into the next scene without displaying lyric text.
5. Every 0.5–1.5 seconds, introduce a meaningful state change (shape transformation, path change, character action, camera/composition change, or lyric-word movement). Calm scenes can do this slowly; don't leave the frame visually frozen.
6. Characters should normally remain 20–25% of frame height; use tiny silhouettes only inside dream portals or during deliberate panoramic shots. Main kinetic typography and key metaphorical objects should be large and readable.
7. Use a single deterministic timeline based on `audio.currentTime`; derive animation progress from each cue's start/end. Pause, resume, seeking, replay, and browser refresh must not desynchronize the choreography.
8. Prefer clean SVG/vector shapes, masks, gradients, and transform animations. Use restrained glow and particles only to support the principal action. Avoid expensive blur filters or hundreds of independent particles that hurt performance.
9. No lip-sync, no English translations, no narration, no labels, no title card, and no end card. The only displayed text is the exact lyric content intended for display; the `आलाप...` cue is visual-only.
10. Make transitions continuous across repeated motifs: falling star → constellation; musical ribbon → river/path; leaf/flower shelter → dream bubble; portals → sun/moon; destiny threads → final constellation.
