"use strict";
const RENDER={home:renderHome,quiz:renderQuiz,cards:renderCards,exam:renderExam,run:renderRun,result:renderResult,setting:renderSetting};
(async function initApp(){
  try{
    await initDB();
    const stored = await dbGet('state');
    if(stored && Array.isArray(stored.questions)){
      S = stored;
      if(!S.tracks) S.tracks = clone(DEFAULT_TRACKS);
      sanitizeState(S);
      UNDO = (await dbGet('undo')) || [];
      S.questions.forEach(q => { if(!DIFFS.includes(q.d)) q.d = 'ง่าย'; });
    }else{
      S = fresh();
      await dbSet('state', S);
    }
  }catch(e){
    console.warn('IndexedDB fallback', e);
  }

  day();
  theme();
  updateSidebarProfile();

  let activeSnap = null;
  try {
    const raw = localStorage.getItem('pp_active_exam');
    if(raw) activeSnap = JSON.parse(raw);
  } catch(e){}

  if(activeSnap && Array.isArray(activeSnap.ids) && activeSnap.ids.length){
    S.session = activeSnap;
    resumeExam();
  }else{
    go('home');
    setTimeout(remindBackup, 1200);
  }
  icons();
})();
