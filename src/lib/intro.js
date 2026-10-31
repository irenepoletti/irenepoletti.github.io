// The hero intro waits on this so it plays as the preloader lifts, not behind it.
let release;
export const introReady = new Promise((resolve) => (release = resolve));
export const releaseIntro = () => release();
