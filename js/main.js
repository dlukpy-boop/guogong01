import { initViewport } from './viewport.js';
import { initNavigation } from './navigation.js';
import { initPhotoModal } from './expansion.js';

const stage = document.getElementById('stage');
initViewport(stage);
initNavigation(stage);

initPhotoModal();
