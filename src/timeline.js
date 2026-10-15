/**
 * Audio-Synchronized Timeline Engine — 28 Choreography Beats
 * 
 * Drives visual scene transitions, kinetic typography timing, and
 * choreography beats synchronized to "Tum Jo Aaye (Zindagi Mein)"
 * as defined in redesigned_tum_jo_aaye_choreography.md.
 */

export const CHOREOGRAPHY_BEATS = [
  { id: 1, name: "Finding and destiny", startTime: 0.5, endTime: 3.0, lyric: "पाया मैंने, पाया तुम्हें, रब ने मिलाया तुम्हें" },
  { id: 2, name: "A person becomes a melody", startTime: 3.0, endTime: 5.5, lyric: "होंठों पे सजाया तुम्हें, नग़मे सा गाया तुम्हें" },
  { id: 3, name: "A secret is sheltered", startTime: 5.8, endTime: 8.5, lyric: "पाया मैंने, पाया तुम्हें, सब से छुपाया तुम्हें" },
  { id: 4, name: "A dream takes shape", startTime: 8.5, endTime: 11.5, lyric: "सपना बनाया तुम्हें, नींदों में बुलाया तुम्हें" },
  { id: 5, name: "Arrival changes everything", startTime: 11.5, endTime: 16.5, lyric: "तुम जो आये ज़िन्दगी में बात बन गयी" },
  { id: 6, name: "Love becomes identity", startTime: 16.8, endTime: 22.0, lyric: "इश्क़ मजहब, इश्क़ मेरी ज़ात बन गयी" },
  { id: 7, name: "Finding, revisited with certainty", startTime: 22.5, endTime: 25.8, lyric: "पाया मैंने, पाया तुम्हें, रब ने मिलाया तुम्हें" },
  { id: 8, name: "Melody becomes a shared path", startTime: 26.0, endTime: 28.5, lyric: "होंठों पे सजाया तुम्हें, नग़मे सा गाया तुम्हें" },
  { id: 9, name: "Their private world", startTime: 28.8, endTime: 31.0, lyric: "पाया मैंने, पाया तुम्हें, सब से छुपाया तुम्हें" },
  { id: 10, name: "Dreaming together", startTime: 31.0, endTime: 34.5, lyric: "सपना बनाया तुम्हें, नींदों में बुलाया तुम्हें" },
  { id: 11, name: "Everything clicks into place", startTime: 35.0, endTime: 39.0, lyric: "तुम जो आये ज़िन्दगी में बात बन गयी" },
  { id: 12, name: "A shared identity", startTime: 40.5, endTime: 44.0, lyric: "इश्क़ मजहब, इश्क़ मेरी ज़ात बन गयी" },
  { id: 13, name: "Many dreams, one love", startTime: 45.5, endTime: 54.5, lyric: "सपने तेरी चाहतों के देखता हूँ अब कई" },
  { id: 14, name: "Gold day becomes silver night", startTime: 54.5, endTime: 60.0, lyric: "दिन है सोना और चाँदी रात बन गयी" },
  { id: 15, name: "The refrain becomes a kinetic orbit", startTime: 60.5, endTime: 65.0, lyric: "तुम जो आये ज़िन्दगी में बात बन गयी" },
  { id: 16, name: "Alaap: weightless visual breathing", startTime: 65.5, endTime: 77.0, isAlaap: true, lyric: "आलाप..." },
  { id: 17, name: "Dull turns sweet", startTime: 77.0, endTime: 87.0, lyric: "तेरे बिना फीकी सी थी मेरी ज़िंदगानी ये, तेरे संग मीठी हो गयी" },
  { id: 18, name: "Joy is something they can catch", startTime: 89, endTime: 99.0, lyric: "आता-जाता खुशियों के मैं गले लग जाता हूँ, दुनिया भी लगती है नयी" },
  { id: 19, name: "The heart's doorway lights up", startTime: 100.0, endTime: 108.0, lyric: "रौनकें हैं दिल के दर पे, धड़कनें हैं सुरमयी" },
  { id: 20, name: "Two destinies braid together", startTime: 108.2, endTime: 114.0, lyric: "मेरी क़िस्मत भी तुम्हारे साथ बन गयी" },
  { id: 21, name: "The world locks into place again", startTime: 114.5, endTime: 120.5, lyric: "तुम जो आये ज़िन्दगी में बात बन गयी" },
  { id: 22, name: "Dream portals return, now connected", startTime: 120.5, endTime: 128.5, lyric: "सपने तेरी चाहतों के देखता हूँ अब कई" },
  { id: 23, name: "Gold and silver return, transformed", startTime: 128.5, endTime: 134.0, lyric: "दिन है सोना और चाँदी रात बन गयी" },
  { id: 24, name: "Refrain: a moving world around them", startTime: 134.0, endTime: 139.5, lyric: "तुम जो आये ज़िन्दगी में बात बन गयी" },
  { id: 25, name: "Finding, final reprise", startTime: 140.0, endTime: 142.5, lyric: "पाया मैंने, पाया तुम्हें, रब ने मिलाया तुम्हें" },
  { id: 26, name: "The world sings", startTime: 142.8, endTime: 146.0, lyric: "होंठों पे सजाया तुम्हें, नग़मे सा गाया तुम्हें" },
  { id: 27, name: "The secret is safe", startTime: 146.0, endTime: 148.5, lyric: "पाया मैंने, पाया तुम्हें, सब से छुपाया तुम्हें" },
  { id: 28, name: "Dream made whole; close the circle", startTime: 148.2, endTime: 152.5, lyric: "सपना बनाया तुम्हें, नींदों में बुलाया तुम्हें" }
];

export class TimelineManager {
  constructor(beats = CHOREOGRAPHY_BEATS) {
    this.beats = beats.map(b => ({ ...b }));
    this.scenes = this.beats; // compatibility alias
    this.lyrics = [];
    this.totalDuration = 153.5;
    this.calibratedRatio = 1.0;
  }

  async loadLyrics() {
    try {
      const response = await fetch('./assets/lyrics.json');
      if (response.ok) {
        this.lyrics = await response.json();
        if (this.calibratedRatio !== 1.0 && this.lyrics.length > 0) {
          this.lyrics = this.lyrics.map(l => ({
            ...l,
            start: +(l.start * this.calibratedRatio).toFixed(2),
            end: +(l.end * this.calibratedRatio).toFixed(2)
          }));
        }
      }
    } catch (err) {
      console.warn('Could not load lyrics.json:', err);
      this.lyrics = [];
    }
  }

  calibrateDuration(audioDuration) {
    if (!audioDuration || isNaN(audioDuration) || audioDuration <= 0) return;
    const oldMax = 153.5;
    const ratio = audioDuration / oldMax;
    this.calibratedRatio = ratio;

    this.totalDuration = audioDuration;
    this.beats = this.beats.map(b => ({
      ...b,
      startTime: +(b.startTime * ratio).toFixed(2),
      endTime: +(b.endTime * ratio).toFixed(2)
    }));
    this.scenes = this.beats;

    if (this.lyrics.length > 0) {
      this.lyrics = this.lyrics.map(l => ({
        ...l,
        start: +(l.start * ratio).toFixed(2),
        end: +(l.end * ratio).toFixed(2)
      }));
    }
  }

  getSceneState(currentTime) {
    const time = Math.max(0, currentTime);
    const beats = this.beats;
    const total = beats.length;

    let beatIndex = -1;
    let inOverlap = false;
    let overlapProgress = 0;

    // Check deliberate 148.2 - 148.5 overlap between beat 27 and beat 28
    const beat27Start = beats[26].startTime;
    const beat28Start = beats[27].startTime;
    const beat27End = beats[26].endTime;

    if (time >= beat28Start && time <= beat27End) {
      inOverlap = true;
      const overlapDur = Math.max(0.1, beat27End - beat28Start);
      overlapProgress = (time - beat28Start) / overlapDur;
      beatIndex = 27; // render beat 28 with crossfade from beat 27
    } else {
      for (let i = 0; i < total; i++) {
        if (time >= beats[i].startTime && time < beats[i].endTime) {
          beatIndex = i;
          break;
        }
      }
    }

    let isGap = false;
    let gapProgress = 0;
    let isOutro = false;

    if (beatIndex === -1) {
      if (time < beats[0].startTime) {
        // Intro (0.0 to 0.5s): prelude
        beatIndex = 0;
        isGap = true;
        gapProgress = beats[0].startTime > 0 ? time / beats[0].startTime : 1.0;
      } else if (time >= beats[total - 1].endTime) {
        // Outro (152.5s to 153.5s): fade to warm darkness
        beatIndex = total - 1;
        isGap = true;
        isOutro = true;
        gapProgress = Math.min(1.0, (time - beats[total - 1].endTime) / 1.0);
      } else {
        // Gap between consecutive beats
        for (let i = 0; i < total - 1; i++) {
          if (time >= beats[i].endTime && time < beats[i + 1].startTime) {
            beatIndex = i;
            isGap = true;
            const gapDur = beats[i + 1].startTime - beats[i].endTime;
            gapProgress = gapDur > 0 ? (time - beats[i].endTime) / gapDur : 1.0;
            break;
          }
        }
      }
    }

    const safeIndex = Math.max(0, Math.min(total - 1, beatIndex));
    const beat = beats[safeIndex];
    const duration = Math.max(0.1, beat.endTime - beat.startTime);
    const localTime = Math.max(0, Math.min(duration, time - beat.startTime));
    const progress = localTime / duration;

    // Visual transition alpha (soft entrance & exit)
    const fadeIn = Math.min(1.0, localTime / 0.4);
    const timeRemaining = beat.endTime - time;
    const fadeOut = Math.max(0.0, Math.min(1.0, timeRemaining / 0.4));
    const transitionAlpha = Math.min(fadeIn, fadeOut);

    return {
      index: safeIndex, // 0 to 27
      beat,
      localTime,
      duration,
      progress,
      transitionAlpha,
      time,
      isGap,
      gapProgress,
      inOverlap,
      overlapProgress,
      isAlaap: !!beat.isAlaap,
      isOutro,
      isLastScene: safeIndex === total - 1
    };
  }

  getCurrentLyric(currentTime) {
    if (!this.lyrics || this.lyrics.length === 0) return null;
    const lyric = this.lyrics.find(l => currentTime >= l.start && currentTime < l.end);
    // Rule 27: Do not display "आलाप..." as on-screen text
    if (lyric && lyric.text === "आलाप...") return null;
    return lyric || null;
  }
}
